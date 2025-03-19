import { InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchUsersQuery } from "../../redux/service";
import { addToSearchedUsers } from "../../redux/slice";

const SearchInput = () => {

  const { darkMode } = useSelector((state) => state.service);

  const [query,setQuery] = useState("");
  const [searchUser,searchUserData] = useLazySearchUsersQuery();

  const dispatch = useDispatch();

  const handleSearch = async(e)=>{
    if (query.trim() && e.key === "Enter") {
      const response = await searchUser(query);  
      if (response.error) {
        console.error(response.error);  
      }
    }
  };

  useEffect(()=>{
    if(searchUserData.isSuccess){
      dispatch(addToSearchedUsers(searchUserData.data.users));
      console.log(searchUserData.data);
    }
    if(searchUserData.isError){
      console.log(searchUserData.error.data);
    }
  },[searchUserData]);

  return (
    <>
      <TextField
        sx={{
          width: "90%",
          maxWidth: "750px",
          boxShadow: "5px 5px 5px gray",
          borderRadius: "15px",
          px: 2,
          py: 1,
          my: 5,
          mx: "auto",
          "& .MuiOutlinedInput-root": {
            color : darkMode ? 'whitesmoke' : 'black',
            "& fieldset": {
              border: "none",
            },
          },
        }}
        placeholder="search user..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{color : darkMode ? 'whitesmoke' : 'black'}}>
              <FaSearch />
            </InputAdornment>
          ),
        }}
        onChange={(e)=>setQuery(e.target.value)}
        onKeyUp={handleSearch}
      />
    </>
  );
};

export default SearchInput;
