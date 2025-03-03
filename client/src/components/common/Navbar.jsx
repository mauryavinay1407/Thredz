import { Stack, useMediaQuery } from "@mui/material";
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Navbar = () => {
    const _300 = useMediaQuery("(min-width: 300px)");

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
                    color="black"
                />
                <Link to={"/"} className="link">
                    <GoHome size={_300 ? 32 : 24} />
                </Link>
                <Link to={"/search"} className="link" color="black">
                    <IoIosSearch size={_300 ? 32 : 24} />
                </Link>
                {/* <Link to={"/edit"} className="link"> */}
                    <TbEdit size={_300 ? 32 : 24} className="image-icon" color="black"/>
                {/* </Link> */}
                <CiHeart size={_300 ? 32 : 24} color="black"/>
                <Link to={"/profile/threads/1"} className="link">
                    <RxAvatar size={_300 ? 32 : 24} color="black"/>
                </Link>
            </Stack>
        </>
    );
};

export default Navbar;
