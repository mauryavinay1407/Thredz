import { Avatar, Button, Stack, Typography } from "@mui/material";
import {useDispatch} from "react-redux";
import { addPostModal } from "../../redux/slice";

const InputBox = () => {

  const dispatch = useDispatch();

  const handleAddPost = ()=>{
    dispatch(addPostModal(true));
}

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
        onClick = {handleAddPost}
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
