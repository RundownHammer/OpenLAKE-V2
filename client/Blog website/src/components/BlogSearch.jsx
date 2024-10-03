import React, { useState } from 'react';
import axios from 'axios';
import BlogDetailSmall from './blogdetail';  // Assuming this displays a blog's details
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import top100Tags from '../components/tagslist.js';

const BlogSearch = () => {
    const [tags, setTags] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Handle the tag input change
    const handleTagsChange = (e) => {
        setTags(e.target.value);
    };

    // Fetch blogs that match the entered tags
    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/bloglist/searchByTags`, {
                params: { tags },  // Pass the tags as query parameters
                withCredentials: true
            });
            setSearchResults(response.data);  // Update search results
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='page-container'>
            {/* Tag Input */}
            <div className='search-container'>
            <Autocomplete
                multiple
                fullWidth
                options={top100Tags}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                onChange={(event, newValue) => {
                    setTags(newValue.map((option) => option.title).join(','));  // Update tags
                }
                }
                renderInput={(params) => (
                <TextField id="tags-outlined"
                    variant='standard'
                    {...params}
                    label="Tags"
                    placeholder="Search for blogs by tags"
                />
                )}
            />
            <Button onClick={handleSearch} variant="text"><SearchIcon   fontSize='large'/></Button>
            </div>

            {/* Display search results */}
            {loading && <p>Loading...</p>}
            {searchResults.length > 0 ? (
                <BlogDetailSmall item={searchResults} />  // Display search results using the same component
            ) : !loading ? (
                <p style={{fontFamily:'sohne', color:'rgb(107, 107, 107)',marginLeft:'16px'}}>No blogs found for the entered tags.</p>
            ) : null}
        </div>
    );
};

export default BlogSearch;
