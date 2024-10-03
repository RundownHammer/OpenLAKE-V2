import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill'; // Import Quill
import 'react-quill/dist/quill.snow.css'; // Quill styles
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Autocomplete from '@mui/material/Autocomplete';
import top100Tags from '../components/tagslist.js';

import "../css/blogeditor.css";

const UpdateBlogEditor = () => {
  // Get the blog ID from the URL
  let { id } = useParams();

  // Set navigation
  const navigate = useNavigate();

  // State to store blog content
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState(''); // This will hold Quill's HTML content
  const [imageUrl, setImageUrl] = useState(''); // This will store the image URL or base64
  const [tags, setTags] = useState('');
  const [preview, setPreview] = useState(false);

  // Fetch the blog post from the backend
  const fetchBlog = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogcrud/read/${id}`, {
        params: { id: id },
        withCredentials: true,
      });

      // Update all state at once after fetching blog
      const blog = result.data;
      setTitle(blog.title);
      setSubtitle(blog.subtitle);
      setContent(blog.content);
      setImageUrl(blog.imageUrl);
      setTags(blog.tags.join(', ')); // Join tags into a string
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch the blog data when the component mounts or the `id` changes
  useEffect(() => {
    fetchBlog();
  }, [id]); // Ensure useEffect runs whenever `id` changes

  // Helper function to resize the image before uploading
  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          let width = img.width;
          let height = img.height;

          // Calculate the new dimensions based on the max width and height
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;

          // Draw the resized image onto the canvas
          ctx.drawImage(img, 0, 0, width, height);

          // Convert canvas back to base64 or Blob
          canvas.toBlob((blob) => {
            resolve(blob);
          }, 'image/jpeg', 0.8); // Adjust the quality (0.8) as needed
        };
      };

      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle image upload via file input
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const resizedImage = await resizeImage(file, 500, 150); // Resize to 800x200 pixels
        const reader = new FileReader();
        reader.readAsDataURL(resizedImage);
        reader.onloadend = () => {
          setImageUrl(reader.result); // Set the base64 resized image
        };
      } catch (error) {
        console.error('Error resizing image:', error);
        alert("Failed to resize image")
      }
    }
  };

  // Quill toolbar options
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
      [{ 'font': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'align', 'script',
    'link', 'image',
    'clean'
  ];

  // Submit the blog post
  const handlePublish = () => {
    const blogPost = {
      title,
      subtitle,
      content, // The HTML content from Quill
      imageUrl, // Image URL or base64 data
      tags: tags.split(',').map(tag => tag.trim()), // Convert tags to array
    };

    // Send the blog post to your backend
    axios.put(`http://localhost:5000/blogcrud/update/${id}`, blogPost, { withCredentials: true })
      .then((response) => {
        alert("Blog published successfully")
        // Clear form after submission
        setTitle('');
        setSubtitle('');
        setContent('');
        setImageUrl('');
        setTags('');
        navigate("/read");
      })
      .catch((error) => {
        console.error('Error updating blog:', error);
        alert("Failed to update blog.")
      });
  };

  return (
    <div className="blog-editor">
      {/* Blog Title Input */}
      <TextField
          id="outlined-textarea"
          label="Title"
          placeholder="Enter blog title..."
          value={title}
          onChange={(e) => setSubtitle(e.target.value)}
          className="title-input"
          fullWidth
          margin='normal'
      />

      {/* Blog Subtitle Input */}
      <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Tell us more about your blog..."
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="subtitle-input"
          multiline
          fullWidth
      />

      {/* Quill Text Editor */}
      <ReactQuill className='quill-editor'
        value={content}
        modules={modules}
        formats={formats}
        onChange={setContent}
        placeholder="Write something awesome..."
        style={{ height: '300px', marginTop: '8px' }}
      />

      {/* Image Upload Input */}
      <div id='dropzone'
        style={{
          border: '2px dashed gray',
          textAlign: 'center',
          cursor: 'pointer',
          position: 'relative',
        }}
        onClick={() => document.getElementById('imageInput').click()} // Trigger file input on div click
      >
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }} // Hide the file input
        />
        <p>Drag & drop an image here, or click to select one</p>
        <Button
          component="label"
          onClick={() => document.getElementById('imageInput').click()}
          role={undefined}
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload Image
        </Button>
      </div>

      {/* Display uploaded image */}
      {imageUrl && (
        <div>
          <h4>Uploaded Image:</h4>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}

      {/* Tags Input */}
      <Autocomplete
                multiple
                className="tags-input"
                fullWidth
                options={top100Tags}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                onChange={(event, newValue) => {
                    setTags(newValue.map((option) => option.title).join(','));  // Update tags
                }
                }
                renderInput={(params) => (
                <TextField
                    margin="normal"
                    {...params}
                    label="Tags"
                    placeholder="Favorites"
                />
                )}
      />

      {/* Blog Preview */}
      {preview && (
        <div className="preview" style={{ padding: '20px', border: '1px solid #ddd' }}>
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          {imageUrl && <img src={imageUrl} alt="Blog" style={{ maxWidth: '100%' }} />}
        </div>
      )}

      <div>
        {/* Preview Toggle */}
        <Button variant="outlined" onClick={() => setPreview(!preview)} style={{marginRight:'10px'}}>{preview ? 'Hide Preview' : 'Show Preview'}</Button>

        {/* Publish Button */}
        <Button onClick={handlePublish} endIcon={<SendIcon />} variant="contained">Update Blog</Button>
      </div>
    </div>
  );
};

export default UpdateBlogEditor;
