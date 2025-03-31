import Header from "./components/common/Header";
import Loading from "./components/common/Loading";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Protected/Home";
import Search from "./pages/Protected/Search";
import Error from "./pages/Error";
import Register from "./pages/Register";
import { Box } from "@mui/material";
import Layout from "./pages/Protected/Layout";
import ProfileLayout from "./pages/Protected/profile/ProfileLayout";
import Threads from "./pages/Protected/profile/Threads";
import Replies from "./pages/Protected/profile/Replies";
import Reposts from "./pages/Protected/profile/Reposts";
import SinglePost from "./pages/Protected/SinglePost";
import { useSelector } from "react-redux";
import { useMyInfoQuery } from "./redux/service";

const App = () => {
    const { darkMode } = useSelector((state) => state.service);
    const { data, isError } = useMyInfoQuery();

    if (isError || !data) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/*" element={<Register />} />
                </Routes>
            </BrowserRouter>
        );
    }

    return (
        <>
            <Box minHeight={"100vh"} className={darkMode ? "dark-mode" : ""}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route path="" element={<Home />} />
                            <Route path="post/:id" element={<SinglePost />} />
                            <Route path="search" element={<Search />} />
                            <Route path="profile" element={<ProfileLayout />}>
                                <Route path="threads/:id" element={<Threads />}/>
                                <Route path="replies/:id" element={<Replies />}/>
                                <Route path="reposts/:id" element={<Reposts />}/>
                            </Route>
                        </Route>
                        <Route path="*" element={<Error />} />
                    </Routes>
                </BrowserRouter>
            </Box>
        </>
    );
};

export default App;
