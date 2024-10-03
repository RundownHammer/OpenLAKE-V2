import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog";

export default function ReadBlog() {
  let { id } = useParams();
  const [fetchedBlog, setFetchedBlog] = React.useState({});

  const fetchBlog = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogcrud/read/${id}`, {
        params: {id : id},
        withCredentials : true,
      });
      setFetchedBlog(result.data);
    } catch (error) {
      console.log(error);
  }
}

  React.useEffect(() => {
    fetchBlog();
    console.log(fetchedBlog);
    
  }, []);

    return (
      <div>
        <FullBlog image_url={fetchedBlog.image_url}  id={fetchedBlog.id} subtitle={fetchedBlog.subtitle} title={fetchedBlog.title} content={fetchedBlog.content} created_at={fetchedBlog.created_at} username={fetchedBlog.username} profile_photo={fetchedBlog.profile_photo} author_id={fetchedBlog.author_id}/>
      </div>
    )
}