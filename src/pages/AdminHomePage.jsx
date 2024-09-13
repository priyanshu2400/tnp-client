import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard'; 
import Layout from '../layout/Layout';
import axios from 'axios';

const AdminHomePage = () => {
  const [jobs, setJobs] = useState([]);
  const backendServer = process.env.REACT_APP_BACKEND_SERVER;

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${backendServer}/getJobs`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [backendServer]);

  const removeJob = (index) => {
    const updatedJobs = jobs.filter((job, i) => i !== index);
    setJobs(updatedJobs);
  };

  return (
      <Container>
        <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to="/addjob"
          >
            Add Job
          </Button>
        </Box>
        <Typography variant="h5" gutterBottom>Job List</Typography>
        {/* <Grid container spacing={3}>
          {jobs.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <JobCard
                companyName={job.companyName}
                CTC={job.CTC}
                DOA={job.DOA}
                eligibleAbove={job.eligibleAbove}
                Applied={job.Applied}
                logo={job.logo}
                jobTitle={job.jobTitle}
                jobType={job.jobType}
                onRemove={() => removeJob(index)} 
              />
            </Grid>
          ))}
        </Grid> */}
      </Container>
  );
};

export default AdminHomePage;
