const formidable = require("formidable");
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");
const { cloudinary } = require("../config/cloudinary");
const { Comment } = require("../models/comment.model");
const axios = require("axios");
const { InferenceClient } = require("@huggingface/inference");

const addPost = async (req, res) => {
    try {
        const userExists = await User.findById(req.user._id);
        if (!userExists) {
            return res.status(400).json({ msg: "No such user !" });
        }
        const form = formidable({});

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    msg: "Error in formidable in while adding post !",
                });
            }
            const post = new Post();
            if (fields.text) {
                post.text = fields.text;
            }
            if (files.media) {
                const uploadedImage = await cloudinary.uploader.upload(
                    files.media.filepath,
                    {
                        folder: "Thredz/Posts",
                    }
                );
                if (!uploadedImage) {
                    return res
                        .status(400)
                        .json({ msg: "Error while uploading Image !" });
                }
                post.media = uploadedImage.secure_url;
                post.public_id = uploadedImage.public_id;
            }
            post.admin = req.user._id;
            const newPost = await post.save();

            await User.findByIdAndUpdate(
                req.user._id,
                {
                    $push: { threads: newPost._id },
                },
                { new: true }
            );
            res.status(201).json({ msg: "Post created !", newPost });
        });
    } catch (err) {
        res.status(400).json({ msg: "Error in addPost !", err: err.message });
    }
};

const allPost = async (req, res) => {
    try {
        const { pageNum = 1 } = req.query;

        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .skip((pageNum - 1) * 3)
            .limit(3)
            .populate({ path: "admin", select: "-password" })
            .populate({ path: "likes", select: "-password" })
            .populate({
                path: "comments",
                populate: {
                    path: "admin",
                    model: "user",
                },
            });
        res.status(200).json({ msg: "Post Fetched !", posts });
    } catch (err) {
        res.status(400).json({ msg: "Error in allPost !", err: err.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "Id is required !" });
        }
        const postExists = await Post.findById(id);
        if (!postExists) {
            return res.status(400).json({ msg: "Post not found !" });
        }
        const userId = req.user._id.toString();
        const adminId = postExists.admin._id.toString();

        if (userId !== adminId) {
            return res
                .status(400)
                .json({ msg: "You are not authorized to delete this post !" });
        }

        if (postExists.media) {
            await cloudinary.uploader.destroy(
                postExists.public_id,
                (err, res) => {
                    console.log({ err, res });
                }
            );
        }

        await Comment.deleteMany({ _id: { $in: postExists.comments } });
        await User.updateMany(
            {
                $or: [{ threads: id }, { replies: id }, { reposts: id }],
            },
            {
                $pull: {
                    threads: id,
                    replies: id,
                    reposts: id,
                },
            },
            { new: true }
        );

        await Post.findByIdAndDelete(id);

        res.status(200).json({ msg: "Post deleted !" });
    } catch (err) {
        res.status(400).json({
            msg: "Error in deletePost !",
            err: err.message,
        });
    }
};

const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "Id is required !" });
        }
        const post = await Post.findById(id);
        if (!post) {
            return res.status(400).json({ msg: "Post Not found!" });
        }
        if (post.likes.includes(req.user._id)) {
            await Post.findByIdAndUpdate(
                id,
                {
                    $pull: { likes: req.user._id },
                },
                { new: true }
            );
            return res.status(201).json({ msg: "Post unliked !" });
        }
        await Post.findByIdAndUpdate(
            id,
            {
                $push: { likes: req.user._id },
            },
            { new: true }
        );
        return res.status(201).json({ msg: "Post liked !" });
    } catch (error) {
        res.status(400).json({ msg: "Error in likePost !", err: err.message });
    }
};

const repost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "Id is required !" });
        }
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ msg: "Post Not found!" });
        }

        if (req.user.reposts.includes(id)) {
            return res
                .status(409)
                .json({ msg: "This post is already reposted !" });
        }
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $push: { reposts: post._id },
            },
            {
                new: true,
            }
        );
        res.status(201).json({ msg: "Reposted !" });
    } catch (error) {
        res.status(400).json({ msg: "Error in repost !", err: err.message });
    }
};

const singlePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ msg: "Id is required !" });
        }
        const post = await Post.findById(id)
            .populate({
                path: "admin",
                select: "-password",
            })
            .populate({
                path: "likes",
                select: "-password",
            })
            .populate({
                path: "comments",
                populate: {
                    path: "admin",
                    model: "user",
                },
            });
        res.status(200).json({ msg: "Post Fetched !", post });
    } catch (err) {
        res.status(400).json({
            msg: "Error in singlePost !",
            err: err.message,
        });
    }
};


const generateCaption = async (req, res) => {
    try {
        const imageBuffer = req.file.buffer;
        const base64Image = imageBuffer.toString("base64");

        const response = await axios.post(
            "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
            { inputs: base64Image }, 
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const caption = response.data[0].generated_text;
        res.status(200).json({ caption });
    } catch (error) {
        console.error("Error generating caption:", error.response?.data || error.message);
        res.status(500).json({ message: "Failed to generate caption" });
    }
};

module.exports = {
    addPost,
    allPost,
    deletePost,
    likePost,
    repost,
    singlePost,
    generateCaption,
};
