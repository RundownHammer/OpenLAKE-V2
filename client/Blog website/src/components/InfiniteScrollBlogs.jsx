import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogDetailSmall from './blogdetail';
import Button from '@mui/material/Button';

const BlogList = () => {
    
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);  // Start with page 1
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const limit = 5;  // Load 5 blogs at a time
            const offset = (page - 1) * limit;  // Offset = (page - 1) * limit

            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/bloglist/blogs`, {
                params: { limit, offset },
                withCredentials: true  // Send cookies for authentication if needed
            });

            const newBlogs = response.data;
            setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);  // Append new blogs to the list
            
            if (newBlogs.length < limit) {
                setHasMore(false);  // No more blogs to load if fewer blogs are returned
            }
            setPage((prevPage) => prevPage + 1);  // Increment page number for the next request
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);  // Fetch blogs when the component mounts

    return (
        <div>        
            <BlogDetailSmall item={blogs} />
            {loading && <p>Loading...</p>}
            {hasMore && !loading && (
                <Button id='fetch-more-blogs' onClick={fetchBlogs} variant="text">Load More</Button>  // Load more on button click
            )}
        </div>
    );
};

export default BlogList;
