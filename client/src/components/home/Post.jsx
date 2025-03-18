import { Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import Postone from "./post/Postone";
import PostTwo from "./post/PostTwo";
import { useDispatch, useSelector } from "react-redux";
import { toggleMyMenu, addPostId, addMyInfo } from "../../redux/slice";
import moment from "moment";

const Post = ({ e }) => {
  const _300 = useMediaQuery("(min-width: 300px)");
  const _400 = useMediaQuery("(min-width: 400px)");
  const _700 = useMediaQuery("(min-width: 700px)");

  const dispatch = useDispatch();
  const { darkMode, myInfo } = useSelector((state) => state.service);

  const [isAdmin, setIsAdmin] = useState();

  const handleMyMenu = (event) => {
    dispatch(addPostId(e._id));
    dispatch(toggleMyMenu(event.currentTarget));
  };

  const checkIsAdmin = () => {
    if (e?.admin._id === addMyInfo._id) {
      setIsAdmin(true);
      return;
    }
    setIsAdmin(false);
  };

  const getPostTime = (createdAt) => {
    const duration = moment.duration(moment().diff(moment(createdAt)));

    if (duration.asMinutes() < 1) return "Just now";
    if (duration.asMinutes() < 60) return `${Math.floor(duration.asMinutes())}min`;
    if (duration.asHours() < 24) return `${Math.floor(duration.asHours())}h`;
    if (duration.asDays() < 7) return `${Math.floor(duration.asDays())}days`;
    if (duration.asWeeks() < 4) return `${Math.floor(duration.asWeeks())}w`;
    if (duration.asMonths() < 12) return `${Math.floor(duration.asMonths())}mo`;
    return `${Math.floor(duration.asYears())}y`;
  };

  useEffect(() => {
    if (e && myInfo) {
      checkIsAdmin();
    }
  }, [e, myInfo]);

  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      borderBottom={darkMode ? "1px solid #3c423e": "1.8px solid #e0e0e0"}
      borderRight={darkMode ? "1px solid #3c423e": "1.8px solid #e0e0e0"}
      p={_700 ? 2 : _400 ? 1 : "5px"}
      mx={"auto"}
      width={_700 ? "70%" : _300 ? "90%" : "100%"}
      sx={{
        ":hover": {
          cursor: "pointer",
          boxShadow: "10px 6px 10px rgba(0, 0, 0, 0.3)",
        },
        transition: "all ease-in-out 0.3s",
        backgroundColor: darkMode ? "#000000" : "#fff",
        borderRadius: "8px",
        marginBottom: "16px",
      }}
    >
      <Stack flexDirection={"row"} gap={_700 ? 2 : 1}>
        <Postone e={e} />
        <PostTwo e={e} />
      </Stack>
      <Stack flexDirection={"row"} justifyContent={"center"} gap={1} fontSize={"1rem"}>
        <Typography
          variant="caption"
          color={darkMode ? "white" : "GrayText"}
          fontSize={"0.8rem"}
          position={"relative"}
          top={2}
        >
          {e ? getPostTime(e.createdAt) : ""}
        </Typography>
        {isAdmin ? (
          <IoIosMore size={_700 ? 28 : 20} onClick={handleMyMenu} />
        ) : null}
      </Stack>
    </Stack>
  );
};

export default Post;