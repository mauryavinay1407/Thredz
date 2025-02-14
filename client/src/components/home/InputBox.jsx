import { Avatar, Button, Stack, Typography } from "@mui/material";
import React from "react";

const InputBox = () => {
  return (
    <>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"70%"}
        height={28}
        p={3}
        borderBottom={"2px solid gray"}
        my={5}
        mx={"auto"}
      >
        <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
          <Avatar src="" alt="avt" />
          <Typography color={"GrayText"}> Start a thread...</Typography>
        </Stack>
        <Button
          size="medium"
          sx={{
            bgcolor: "gray",
            color: "aliceblue",
            borderRadius: "12px",
            ":hover": {
              bgcolor: "black",
              cursor: "pointer",
            },
          }}
        >
          POST
        </Button>
      </Stack>
    </>
  );
};

export default InputBox;
