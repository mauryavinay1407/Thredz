import { Stack, useMediaQuery } from "@mui/material";
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import { addPostModal } from "../../redux/slice";

const Navbar = () => {
    const _300 = useMediaQuery("(min-width: 300px)");

    const dispatch = useDispatch();
    const {darkMode} = useSelector((state)=> state.service);

    const handleAddPost = ()=>{
        dispatch(addPostModal(true));
    }

    return (
        <>
            <Stack
                flexDirection={"row"}
                maxWidth={"100%"}
                justifyContent={"space-around"}
            >
                <FaArrowLeft
                    size={_300 ? 32 : 24}
                    className="image-icon"
                    color={darkMode ? "white" :"black"}
                />
                <Link to={"/"} className="link">
                    <GoHome size={_300 ? 32 : 24}  color={darkMode ? "white" :"black"}/>
                </Link>
                <Link to={"/search"} className="link" >
                    <IoIosSearch size={_300 ? 32 : 24} color={darkMode ? "white" :"black"}/>
                </Link>
                <TbEdit
                    size={_300 ? 32 : 24}
                    className="image-icon"
                    color={darkMode ? "white" :"black"}
                    onClick={handleAddPost}
                />
                <CiHeart size={_300 ? 32 : 24} color={darkMode ? "white" :"black"} />
                <Link to={"/profile/threads/1"} className="link">
                    <RxAvatar size={_300 ? 32 : 24} color={darkMode ? "white" :"black"}/>
                </Link>
            </Stack>
        </>
    );
};

export default Navbar;
