import {
    Avatar,
    Menu,
    MenuItem,
    Stack,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { useSelector } from "react-redux";
import {
    useDeleteCommentMutation,
    useSinglePostQuery,
} from "../../../redux/service";
import moment from "moment";

const Comments = ({ e, postId }) => {
    const _700 = useMediaQuery("(min-width: 700px)");

    const [anchorEl, setAnchorEl] = useState(null);
    const [isAdmin, setIsAdmin] = useState();

    const { darkMode, myInfo } = useSelector((state) => state.service);

    const [deleteComment, deleteCommentData] = useDeleteCommentMutation();

    const { refetch } = useSinglePostQuery(postId);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDeleteComment = async () => {
        const info = {
            postId,
            id: e?._id,
        };
        await deleteComment(info);
        handleClose();
        refetch();
    };

    const checkIsAdmin = () => {
        if (e && myInfo) {
            if (e.admin._id === myInfo._id) {
                setIsAdmin(true);
                return;
            }
        }
        setIsAdmin(false);
    };

    const getCommentTime = (createdAt) => {
        const duration = moment.duration(moment().diff(moment(createdAt)));

        if (duration.asMinutes() < 1) return "Just now";
        if (duration.asMinutes() < 60)
            return `${Math.floor(duration.asMinutes())}min`;
        if (duration.asHours() < 24)
            return `${Math.floor(duration.asHours())}h`;
        if (duration.asDays() < 7)
            return `${Math.floor(duration.asDays())}days`;
        if (duration.asWeeks() < 4) return `${Math.floor(duration.asWeeks())}w`;
        if (duration.asMonths() < 12)
            return `${Math.floor(duration.asMonths())}mo`;
        return `${Math.floor(duration.asYears())}y`;
    };

    useEffect(() => {
        checkIsAdmin();
    }, []);

    useEffect(() => {
        if (deleteCommentData.isSuccess) {
            console.log(deleteCommentData.data);
        }
        if (deleteCommentData.isError) {
            console.log(deleteCommentData.error.data);
        }
    }, [deleteCommentData.isSuccess, deleteCommentData.isError]);

    return (
        <>
            <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                px={2}
                pb={4}
                borderBottom={"1px solid gray"}
                mx={"auto"}
                width={"90%"}
            >
                <Stack flexDirection={"row"} gap={_700 ? 2 : 1}>
                    <Avatar
                        src={e ? e.admin.profilePic : ""}
                        alt={e ? e.admin.userName : ""}
                    />
                    <Stack flexDirection={"column"}>
                        <Typography
                            variant="h6"
                            fontWeight={"bold"}
                            fontSize={"0.9rem"}
                        >
                            {e ? e.admin.userName : ""}
                        </Typography>
                        <Typography variant="subtitle2" fontSize={"0.9rem"}>
                            {e ? e.text : ""}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    flexDirection={"row"}
                    gap={1}
                    alignItems={"center"}
                    color={darkMode ? "white" : "GrayText"}
                    fontSize={"0.9rem"}
                >
                    <p>{e ? `${getCommentTime(e.createdAt)}` : ""}</p>
                    {isAdmin ? (
                        <IoIosMore
                            size={_700 ? 28 : 20}
                            className="image-icon"
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                        />
                    ) : (
                        <IoIosMore
                            size={_700 ? 28 : 20}
                            className="image-icon"
                        />
                    )}
                </Stack>
            </Stack>
            <Menu
                anchorEl={anchorEl}
                open={anchorEl !== null}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
            </Menu>
        </>
    );
};

export default Comments;
