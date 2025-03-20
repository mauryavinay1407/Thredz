import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleMyMenu } from "../../redux/slice";
import { MdDelete } from "react-icons/md";
import { useDeletePostMutation } from "../../redux/service";
import { useEffect } from "react";
import { toast } from "sonner";

const MyMenu = () => {

    const dispatch = useDispatch();
    const {anchorE2, postId} = useSelector((state) => state.service);

    const [deletePost] = useDeletePostMutation();

    const handleClose = ()=>{
        dispatch(toggleMyMenu(null));
    }

    const handleDeletePost = async()=>{
        handleClose();
        toast.promise(
            deletePost(postId),
            {
                loading: "Deleting post...",
                success: "Post deleted successfully!",
                error: (err) => err?.data?.message || "Failed to delete post",
            }
        );
    };

    return (
        <>
            <Menu
                anchorEl={anchorE2}
                open={anchorE2 !== null}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem onClick={handleDeletePost}><MdDelete size={28}/> Delete</MenuItem>
            </Menu>
        </>
    );
};

export default MyMenu;
