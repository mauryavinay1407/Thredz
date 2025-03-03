import { Button, Stack, useMediaQuery } from "@mui/material";
import React from "react";
import InputBox from "../../components/home/InputBox";
import Post from "../../components/home/Post";

const Home = () => {
  const _700 = useMediaQuery("(min-width: 700px)");

  return (
    <>
      {_700 && <InputBox/>}
      <Stack flexDirection={"column"} gap={2} mb={10}>
        <Post />
        <Post />
        <Post />
        <Post />
      </Stack>
      <Button
      size="large"
      sx={{my: 5,p : 3,textDecoration: "underline", cursor: 'pointer'}}
      >
      Load More
      </Button>
    </>
  );
};

export default Home;
