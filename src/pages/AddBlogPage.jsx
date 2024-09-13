import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import Layout from '../layout/Layout';
import { useSelector } from 'react-redux';

const AddBlogPage = () => {
  const [name, setName] = useState('');
  const email = useSelector((state) => state.user.user);
  const [company, setCompany] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const backendServer = process.env.REACT_APP_BACKEND_SERVER;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${backendServer}/addBlog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, company, text }),
      });
      if (response.ok) {
        navigate('/blogs');
      } else {
        console.error('Failed to add blog');
      }
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <Layout>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form onSubmit={handleSubmit} style={{ width: '50%' }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Interview Experience"
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Blog
          </Button>
        </form>
      </Box>
    </Layout>
  );
};

export default AddBlogPage;
