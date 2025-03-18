import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleMyMenu } from "../../redux/slice";
import { MdDelete } from "react-icons/md";
import { useDeletePostMutation } from "../../redux/service";
import { useEffect } from "react";

const MyMenu = () => {

    const dispatch = useDispatch();
    const {anchorE2, postId} = useSelector((state) => state.service);

    const [deletePost,deletePostData] = useDeletePostMutation();

    const handleClose = ()=>{
        dispatch(toggleMyMenu(null));
    }

    const handleDeletePost = async()=>{
        handleClose();
        await deletePost(postId);
    };

    useEffect(()=>{
        if(deletePostData.isSuccess){
            console.log(deletePostData.data);
        }
        if(deletePostData.isError){
            console.log(deletePost.error.data);
        }
    },[deletePostData.isSuccess,deletePostData.isError]);

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
