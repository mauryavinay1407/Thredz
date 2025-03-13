import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleMyMenu } from "../../redux/slice";
import { MdDelete } from "react-icons/md";

const MyMenu = () => {

    const dispatch = useDispatch();
    const {anchorE2} = useSelector((state) => state.service);

    const handleClose = ()=>{
        dispatch(toggleMyMenu(null));
    }

    const handleDeletePost = ()=>{}

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
