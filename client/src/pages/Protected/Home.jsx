import { Stack } from "@mui/material";
import React from "react";
import InputBox from "../../components/home/InputBox";
import Post from "../../components/home/Post";

const Home = () => {
  return (
    <>
      <InputBox />
      <Stack flexDirection={"column"} gap={2} mb={10}>
        <Post />
        <Post />
        <Post />
        <Post />
      </Stack>
    </>
  );
};

export default Home;
