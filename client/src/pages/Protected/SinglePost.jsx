import { Stack, TextField } from "@mui/material";
import Post from "../../components/home/Post";
import Comments from "../../components/home/post/Comments";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAddCommentMutation, useSinglePostQuery } from "../../redux/service";

const SinglePost = () => {
    const [comment, setComment] = useState("");

    const params = useParams();

    const { data, refetch } = useSinglePostQuery(params?.id);

    const handleAddComment = async (e) => {
        if (data && e.key === "Enter") {
            const info = {
                id: data.post._id,
                text: comment,
            };
            await addComment(info);
        }
    };

    const [ addComment, addCommentData ] = useAddCommentMutation();
    
    useEffect(() => {
        if (addCommentData.isSuccess) {
            setComment("");
            refetch();
            console.log(addCommentData.data);
        }
        if (addCommentData.isError) {
            console.log(addCommentData.error.data);
        }
    }, [addCommentData.isSuccess, addCommentData.isError]);

    return (
        <>
            <Stack flexDirection={"column"} my={5} gap={2}>
                <Post e={data?.post} />
                <Stack
                    flexDirection={"column"}
                    gap={2}
                    width={"80%"}
                    mx={"auto"}
                >
                    {data
                        ? data.post?.comments?.length > 0
                            ? data.post.comments.map((e) => {
                                  return (
                                      <Comments
                                          key={e._id}
                                          e={e}
                                          postId={data?.post._id}
                                      />
                                  );
                              })
                            : null
                        : null}
                </Stack>
                <TextField
                    variant="outlined"
                    autoFocus
                    placeholder="Comment here..."
                    id="comment"
                    sx={{
                        width: "50%",
                        mx: "auto",
                        my: 5,
                        p: 1,
                    }}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyUp={handleAddComment}
                    value={comment ? comment : ""}
                />
            </Stack>
        </>
    );
};

export default SinglePost;
