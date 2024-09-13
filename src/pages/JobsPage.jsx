import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Container,
  Box,
  Typography,
  Skeleton,
} from "@mui/material";
import JobCard from "../components/JobCard"; // Adjust the path based on your project structure
import Layout from "../layout/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import AdminJobCard from "../components/AdminJobCard";
import ChatbotCard from "../components/ChatbotCard"; // Import the ChatbotCard component
import { useNavigate } from "react-router-dom";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [showApplied, setShowApplied] = useState(false);
  const backendServer = process.env.REACT_APP_BACKEND_SERVER;
  const userEmail = useSelector((state) => state.user.user);
  const role = useSelector((state) => state.user.role);

  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${backendServer}/getJobs`);
      setJobs(response.data);
      setIsLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching job data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [backendServer]);

  const handleShowAll = () => {
    setShowApplied(false);
  };

  const handleShowApplied = () => {
    setShowApplied(true);
  };

  const filteredJobs = showApplied
    ? jobs.filter((job) => job.userApplied.includes(userEmail))
    : jobs;

    const handleNavigation = () => {
      navigate('/jobDetails');
    }

  return (
    <Layout>
      <Container>
        {role === "Student" ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 2,
              }}
            >
              <Button
                variant={showApplied ? "outlined" : "contained"}
                onClick={handleShowAll}
                sx={{ marginRight: 1 }}
              >
                All Jobs
              </Button>
              <Button
                variant={showApplied ? "contained" : "outlined"}
                onClick={handleShowApplied}
              >
                Applied Jobs
              </Button>
            </Box>
            <Typography variant="h4" gutterBottom>
              {showApplied ? "Applied Jobs" : "All Jobs"}
            </Typography>
            <Grid container spacing={3}>
              {isLoading
                ? [1, 2, 3, 4, 5, 6].map((skeletonIndex) => (
                    <Grid item xs={12} sm={6} md={4} key={skeletonIndex}>
                      <Skeleton
                        variant="rectangular"
                        width="90%"
                        height={235}
                        sx={{ bgcolor: "lightgray", borderRadius: 1 }}
                      />
                    </Grid>
                  ))
                : filteredJobs.map((job, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <JobCard {...job} fetchJobs={fetchJobs} />
                    </Grid>
                  ))}
            </Grid>
          </>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              All Jobs
            </Typography>
            <Grid container spacing={3}>
              {isLoading ? (
                [1, 2, 3, 4, 5, 6].map((skeletonIndex) => (
                  <Grid item xs={12} sm={6} md={4} key={skeletonIndex}>
                    <Skeleton
                      variant="rectangular"
                      width="90%"
                      height={235}
                      sx={{ margin: 2, bgcolor: "lightgrey", borderRadius: 1 }}
                    />
                  </Grid>
                ))
              ) : (
                <>
                 <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button onClick={handleNavigation} variant="contained" color="primary">
                Job Details
              </Button>
            </Box>
          </Grid>
                  {jobs.map((job, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <AdminJobCard {...job} fetchJobs={fetchJobs} />
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </>
        )}
      </Container>
      <ChatbotCard /> {/* Add the ChatbotCard component */}
    </Layout>
  );
};

export default JobsPage;
