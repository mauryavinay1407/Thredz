import Header from "./components/common/Header";
import Loading from "./components/common/Loading";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Protected/Home";
import Search from "./pages/Protected/Search";
import Error from "./pages/Error";

const App = ()=>{
  return(
    <>
      <BrowserRouter>
       <Header/>
        <Routes>
          <Route path="/"  element={<Home/> }  />
          <Route path="/search" element={<Search/>} />
          <Route path="*" element={<Error/> }  />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;