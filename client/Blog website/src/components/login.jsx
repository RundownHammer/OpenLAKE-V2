import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const Navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, { username, password }, {withCredentials : true});
            setMessage(response.data.message);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            window.location.assign('/read');
        } catch (error) {
            setMessage('Login failed');
        }
    };

    return (
        <section className='LoginSection' style={{fontFamily:'Sohne'}}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <TextField id="outlined-basic" label="Username" variant="outlined" type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{marginBottom : '10px',marginTop:'15px'}}/>
                </div>
                <div>
                    <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <Button variant="contained" type='submit' style={{backgroundColor : '#1a1a1a', marginTop:'20px'}}>Login</Button>
            </form>
            <p>{message}</p>
        </section>
    );
};

export default Login;
