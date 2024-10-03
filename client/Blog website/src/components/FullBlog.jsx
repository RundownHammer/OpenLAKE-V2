import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import '../css/readingpage.css';

export default function FullBlog(props) {

  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const deleteBlog = async () => {
    let option = prompt("Type CONFIRM to delete the blog", "");
    if (option == 'CONFIRM') {
      try {
        const result = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/blogcrud/delete/:${props.id}`, {
          withCredentials: true // Send cookies for authentication if needed
        });
        console.log(result.data);
        alert("Blog Deleted")
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  }

  const editBlog = async () => {
    navigate(`/edit/:${props.id}`);
  }

  return (
    <div id="reading-page-container">
      <div>
        <img className="banner-image" src={props.image_url} alt="Blog Image" />
      </div>
      <div>
        <h1>{props.title}</h1>
        <div className="user-info">
        {props.profile_photo?
          <Avatar alt="Remy Sharp" src={props.profile_photo} sx={{ width: 34, height: 34 }}/> :
          <Avatar alt="Remy Sharp" sx={{ width: 24, height: 24 }}/>}
        <p>{props.username}</p>
        <h6 className="posted" style={{paddingTop:'22px'}}>posted on {props.created_at}</h6>
        </div>
        <h3>{props.subtitle}</h3>
        <div dangerouslySetInnerHTML={{ __html: props.content }} />
      </div>
      {loggedInUser && loggedInUser.id == props.author_id && 
      <div>
        <Button color='success' onClick={editBlog} startIcon={<EditIcon />} style={{marginRight:'20px'}} variant="contained">Edit Blog</Button>
        <Button color='error' onClick={deleteBlog} startIcon={<DeleteOutlineOutlinedIcon />} style={{marginRight:'20px'}} variant="contained">Delete Blog</Button>
      </div>}
    </div>
  )
}