import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import axios from 'axios';
import SuccessComponent from '../components/SuccessComponent';

const AddJobPage = () => {
  const [newJob, setNewJob] = useState({
    companyName: '',
    CTC: '',
    DOA: '',
    eligibleAbove: '',
    logo: '',
    jobTitle: '',
    jobType: ''
  });
  const backendServer = process.env.REACT_APP_BACKEND_SERVER || 'http://localhost:5000';
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({
      ...newJob,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${backendServer}/addJob`, newJob);
      setShowSuccess(true);

      // Delay navigation by 3 seconds to show the success message
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/jobs');
      }, 3000); // Adjust the delay time as needed
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>Add New Job</Typography>
        <Card>
          <CardContent>
            <TextField
              name="companyName"
              label="Company Name"
              value={newJob.companyName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="CTC"
              label="CTC"
              value={newJob.CTC}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="DOA"
              label="DOA"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newJob.DOA}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="eligibleAbove"
              label="Eligible Above"
              value={newJob.eligibleAbove}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="logo"
              label="Logo URL"
              value={newJob.logo}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="jobTitle"
              label="Job Title"
              value={newJob.jobTitle}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="jobType"
              label="Job Type"
              value={newJob.jobType}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Add Job
            </Button>
          </CardContent>
        </Card>
      </Container>

      {showSuccess && <SuccessComponent text="Job added successfully!" />}
    </Layout>
  );
};

export default AddJobPage;
