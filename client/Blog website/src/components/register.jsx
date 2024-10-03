import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');  // This will store the image URL or base64

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
                const resizedImage = await resizeImage(file, 64, 64); // Resize to 64x64 pixels
                const reader = new FileReader();
                reader.readAsDataURL(resizedImage);
                reader.onloadend = () => {
                    setProfilePhoto(reader.result); // Set the base64 resized image
                };
            } catch (error) {
                console.error('Error resizing image:', error);
                setMessage('Failed to resize image.');
            }
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, { username, password, email, created_at, profilePhoto });
            setMessage(response.data);
        } catch (error) {
            setMessage('Registration failed');
        }
    };

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date();
    const created_at = weekday[d.getDay()] + " , " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(); // Note: Months are 0-indexed in JS

    return (
        <section style={{fontFamily:'Sohne'}}>
            <h2>Register</h2>
            
            <form onSubmit={handleRegister}>
                <div>
                    <TextField id="outlined-basic" label="Username" variant="outlined" type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{marginBottom : '10px',marginTop:'15px'}}/>
                </div>
                <div>
                    <TextField id="outlined-basic" label="Email" variant="outlined" type="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{marginBottom : '10px'}}/>
                </div>
                <div>
                    <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{marginBottom : '10px'}}/>
                </div>
                <div>
                    {/* Styled Image Upload Input (replicating Dropzone style) */}
                    <div
                        style={{
                            border: '2px dashed gray',
                            paddingBottom: '10px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            marginBottom: '20px',
                            position: 'relative',
                            maxWidth:'246px'
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
                        <button
                            onClick={(e) => { e.preventDefault(); document.getElementById('imageInput').click(); }} // Prevent form submission
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginTop: '10px'
                            }}
                        >
                            Select Profile Image
                        </button>
                    </div>

                    {/* Display uploaded image */}
                    {profilePhoto && (
                        <div>
                            <h4>Uploaded Image:</h4>
                            <img src={profilePhoto} alt="Uploaded" style={{ maxWidth: '100%' }} />
                        </div>
                    )}
                </div>
                <Button variant="contained" type='submit' style={{backgroundColor : '#1a1a1a', marginTop:'20px'}}>Register</Button>
            </form>
            <p>{message}</p>
        </section>
    );
};

export default Register;
