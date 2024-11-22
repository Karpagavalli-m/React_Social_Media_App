import { Link, Route, Routes, useNavigate } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import { useEffect, useState } from "react";
import {format} from "date-fns";
import Missing from "./Missing";
import api from "./api/posts"
import EditPost from "./EditPost";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { DataProvider } from "./context/DataContext";

function App() {
  
  return (
    <div className="App">
      <DataProvider>
      <Header 
      title="Social Media Application" />
      <Nav />
      {/* <Missing /> */}
      <Routes>
        <Route path="/" element={
          <Home  /> }></Route>
        <Route path="/post">
        <Route index element={
        <NewPost />} />
        <Route path=":id" element={<PostPage />} />
        </Route>
        <Route path="/edit/:id" element={
          <EditPost/>} />
        <Route path='/about' element={<About />}></Route>
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </DataProvider>
    </div>
  );
}

export default App;
