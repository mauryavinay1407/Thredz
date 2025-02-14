import Header from "./components/common/Header";
import Loading from "./components/common/Loading";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Protected/Home";
import Search from "./pages/Protected/Search";
import Error from "./pages/Error";
import Register from "./pages/Register";
import { Box } from "@mui/material";
import Layout from "./pages/Protected/Layout";

const App = () => {
  return (
    <>
      <Box minHeight={"100vh"}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<Home />} />
              <Route path="post/:id" element={<h1>Single post</h1>} />
              <Route path="search" element={<Search />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
};

export default App;
