import { Stack } from "@mui/material";
import Comments from "../../../components/home/post/Comments";

const Replies = () => {
  return (
    <Stack
     flexDirection={'column'}
     gap={2}
     width={"800px"}
     mx={"auto"}
     >
      <Comments />
      </Stack>
  )
}

export default Replies