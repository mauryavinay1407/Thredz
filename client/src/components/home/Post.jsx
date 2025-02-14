import { Stack, Typography } from "@mui/material";
import React from "react";
import { IoIosMore } from "react-icons/io";
import Postone from "./post/Postone";
import PostTwo from "./post/PostTwo";

const Post = () => {
  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      borderBottom={"3px solid gray"}
      p={2}
      width={"70%"}
      mx={"auto"}
      sx={{
        ":hover": {
          cursor: "pointer",
          boxShadow: "10px 10px 10px gray",
        },
        transition: "all ease-in-out 0.3s",
      }}
    >
      <Stack flexDirection={"row"} gap={2}>
        <Postone />
        <PostTwo />
      </Stack>
      <Stack
        flexDirection={"row"}
        justifyContent={"center"}
        gap={1}
        fontSize={"1rem"}
      >
        <Typography
          variant="caption"
          color="GrayText"
          fontSize={"1rem"}
          position={"relative"}
          top={2}
        >
          24h
        </Typography>
        <IoIosMore size={28} />
      </Stack>
    </Stack>
  );
};

export default Post;
