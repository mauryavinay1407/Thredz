import React from "react";
import SearchInput from "../../components/search/SearchInput";
import ProfileBar from "../../components/search/ProfileBar";
import { Stack } from "@mui/material";

const Search = () => {
  return (
    <>
      <SearchInput />
      <Stack flexDirection={"column"} gap={1} mb={5} width={"60%"} mx={"auto"}>
        <ProfileBar />
        <ProfileBar />
        <ProfileBar />
        <ProfileBar />
      </Stack>
    </>
  );
};

export default Search;
