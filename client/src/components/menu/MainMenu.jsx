import { Menu, MenuItem, useMediaQuery } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleDarkMode, toggleMainMenu } from "../../redux/slice";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const MainMenu = () => {

    const _700 = useMediaQuery("(min-width : 700px)");

    const dispatch = useDispatch();
    const {anchorE1, darkMode} = useSelector((state)=> state.service);

    const handleClose = () => {
        dispatch(toggleMainMenu(null));
    }
    
    const handleToggleTheme = () => {
        handleClose();  
        dispatch(toggleDarkMode());
    }
    
    const handleLogout = () => {}
    
    return (
        <>
            <Menu
                anchorEl={anchorE1}
                open={anchorE1 !== null}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem onClick={handleToggleTheme} sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}>{darkMode ? <CiLight size={18} style={{ verticalAlign: "middle" }}/> : <MdDarkMode size={18} style={{ verticalAlign: "middle" }}/>} <span>{darkMode ? "Light" : "Dark" }</span></MenuItem>
                <Link to={`/profile/threads/2`} className="link">
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
