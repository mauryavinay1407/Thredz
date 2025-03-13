import { Avatar, Menu, MenuItem, Stack, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { IoIosMore } from "react-icons/io";
import { useSelector } from "react-redux";

const Comments = () => {
    const _700 = useMediaQuery("(min-width: 700px)");

    const [anchorEl,setAnchorEl] = useState(null);

    const { darkMode } = useSelector((state) => state.service);

    const handleClose = ()=>{
        setAnchorEl(null);
    }
    const handleDeleteComment = ()=>{}

    return (
        <>
            <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                px={2}
                pb={4}
                borderBottom={"1px solid gray"}
                mx={"auto"}
                width={"90%"}
            >
                <Stack flexDirection={"row"} gap={_700 ? 2 : 1}>
                    <Avatar src="" alt="" />
                    <Stack flexDirection={"column"}>
                        <Typography
                            variant="h6"
                            fontWeight={"bold"}
                            fontSize={"0.9rem"}
                        >
                            John_Doe_220
                        </Typography>
                        <Typography variant="subtitle2" fontSize={"0.9rem"}>
                            looking good
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    flexDirection={"row"}
                    gap={1}
                    alignItems={"center"}
                    color={darkMode ? "white" : "GrayText"}
                    fontSize={"0.9rem"}
                >
                    <p>24min</p>
                    <IoIosMore size={_700 ? 28 : 20} onClick={(e)=>setAnchorEl(e.currentTarget)} className="image-icon"/>
                </Stack>
            </Stack>
            <Menu
                anchorEl={anchorEl}
                open={anchorEl !== null}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
            </Menu>
        </>
    );
};

export default Comments;
