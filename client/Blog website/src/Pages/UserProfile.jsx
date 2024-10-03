import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogDetailSmall from "../components/blogdetail";
import '../css/profilepage.css';

function UserProfilePage() {

  const [blogs, setBlogs] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchBlogs = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogcrud/profile/blogs`, {
        withCredentials : true,
      })
      setBlogs(result.data) 
      console.log(result.data); 
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {if (localStorage.getItem('user') != '') {
    fetchBlogs();
  }}, []);

  return(
    <>
      {/*Block with logged in user's info*/}
 
      <div id="profile-page">
        {localStorage.getItem('user') == ''? 
          <h1>Login First</h1> : 
          <div className="profile-page-container">
            <div className='profile-info'>
              <h1>Profile page</h1>
              <h2>Hello {user.username}</h2>
              <h4>Account created on {user.created_at}</h4>
              <h4>Email : {user.email}</h4>
            </div>
            <div id="profile-page-divider">
            </div>
            <div>
              <h2 className="temp" style={{marginLeft:'8px'}}>Your Blogs</h2>
              <BlogDetailSmall item={blogs} />
            </div>
          </div>
        }
      </div> 
    </>
  )
}

export default UserProfilePage;