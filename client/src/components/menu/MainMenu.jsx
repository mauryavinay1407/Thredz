import { Menu, MenuItem } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleDarkMode, toggleMainMenu } from "../../redux/slice";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useLogoutMeMutation } from "../../redux/service";
import { useEffect } from "react";
import { toast } from "sonner";

const MainMenu = () => {
    
    const dispatch = useDispatch();
    const {anchorE1, darkMode, myInfo} = useSelector((state)=> state.service||{});

    const [logoutMe, logoutMeData] = useLogoutMeMutation();
    
    const handleClose = () => {
        dispatch(toggleMainMenu(null));
    }
    
    const handleToggleTheme = () => {
        handleClose();  
        dispatch(toggleDarkMode());
    }
    
    const handleLogout = async() => {
        handleClose();
        await logoutMe();
    }

    useEffect(()=>{
        if(logoutMeData.isSuccess){
            toast.warning(logoutMeData.data.msg);
        }
    },[logoutMeData.isSuccess])
    
    return (
        <>
            <Menu
                anchorEl={anchorE1}
                open={anchorE1 !== null ? true : false}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem onClick={handleToggleTheme} sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}>{darkMode ? <CiLight size={18} style={{ verticalAlign: "middle" }}/> : <MdDarkMode size={18} style={{ verticalAlign: "middle" }}/>} <span>{darkMode ? "Light" : "Dark" }</span></MenuItem>
                <Link to={`/profile/threads/${myInfo?._id}`} className="link">
                    <MenuItem sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}><FaUser size={18} style={{ verticalAlign: "middle" }}/>My Profile</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout} sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}><IoIosLogOut size={18} style={{ verticalAlign: "middle" }}/> Logout</MenuItem>
            </Menu>
        </>
    );
};

export default MainMenu;
