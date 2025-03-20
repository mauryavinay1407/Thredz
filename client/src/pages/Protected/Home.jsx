import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputBox from "../../components/home/InputBox";
import Post from "../../components/home/Post";
import { useAllPostQuery } from "../../redux/service";
import { useSelector } from "react-redux";
import Loading from "../../components/common/Loading";

const Home = () => {
    const _700 = useMediaQuery("(min-width: 700px)");
    const [page, setPage] = useState(1);
    const [showMore, setShowMore] = useState(true);
    const { data, isLoading } = useAllPostQuery(page);
    const { allPosts } = useSelector((state) => state.service);

    const handleClick = () => {
        setPage((pre) => pre + 1);
    };

    useEffect(() => {
        if (data) {
            if (data.posts.length < 3) {
                setShowMore(false);
            }
        }
    }, [data]);

    return (
        <>
            {_700 && <InputBox />}
            <Stack flexDirection={"column"} gap={3} mb={10} mt={4}>
                {allPosts ? (
                    allPosts.length > 0 ? (
                        allPosts.map((e) => {
                            return <Post key={e._id} e={e} />;
                        })
                    ) : (
                        <Typography
                            variant="caption"
                            textAlign={"center"}
                            color="textSecondary"
                        >
                            No posts yet!
                        </Typography>
                    )
                ) : isLoading ? (
                    <Loading />
                ) : null}
            </Stack>
            {showMore ? (
                <Button
                    size="large"
                    sx={{
                        my: 5,
                        p: 3,
                        textDecoration: "underline",
                        cursor: "pointer",
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "primary.dark",
                        },
                    }}
                    onClick={handleClick}
                >
                    Load More
                </Button>
            ) : (
                allPosts?.length > 0 && (
                    <Typography
                        variant="h6"
                        textAlign={"center"}
                        mb={5}
                        color="textSecondary"
                    >
                        You're all caught up!
                    </Typography>
                )
            )}
        </>
    );
};

export default Home;
