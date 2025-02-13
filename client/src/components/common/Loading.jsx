import React from "react";
import { Stack, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Stack
      flexDirection={"row"}
      minHeight={"50vh"}
      width={"100%"}
      height={"100%"}
      alignItems={'center'}
      justifyContent={'center'}
      my={5}
    >
      <CircularProgress />
    </Stack>
  );
};

export default Loading;
