import React from "react";
import { Route, Routes } from "react-router-dom";
import BlogEditor from '../Pages/BlogEditor'
import UserProfilePage from '../Pages/UserProfile'
import BlogsRead from '../Pages/BlogsRead';
import ReadBlog from '../Pages/ReadBlog';
import UpdateBlogEditor from '../Pages/UpdateBlogEditor';
import Home from "../Pages/Home";
import GetStarted from "../Pages/GetStarted";

export default function Router(props) {
  return (
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/getstarted' element={<GetStarted />} />

      <Route path='/profile' element={<UserProfilePage />} />
      <Route path='/profile/:id' element={<ReadBlog />} />
      
      <Route path='/read' element={<BlogsRead />} />
      <Route path='/read/:id' element={<ReadBlog />} />

      <Route path='/blogeditor' element={<BlogEditor />} />
      <Route path='/edit/:id' element={<UpdateBlogEditor />} />
    </Routes>
  )
}