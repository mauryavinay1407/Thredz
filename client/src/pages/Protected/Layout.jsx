import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";

const Layout = () => {
  return (
    <Stack
      flexDirection={"column"}
      maxWidth={"800px"}
      minWidth={"100%"}
      mx={"auto"}
      overflow={"hidden"}
    >
      <Header />
      <Outlet></Outlet>
    </Stack>
  );
};

export default Layout;
