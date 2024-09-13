import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  CircularProgress,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import Layout from "../layout/Layout";
import axios from "axios";

const ShimmerLoader = () => (
  <Box sx={{ my: 4 }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ width: '100%', height: '40px', backgroundColor: '#f0f0f0', borderRadius: '4px', animation: 'shimmer 1.5s infinite linear' }} />
      <Box sx={{ width: '100%', height: '56px', backgroundColor: '#f0f0f0', borderRadius: '4px', animation: 'shimmer 1.5s infinite linear' }} />

      <Box sx={{ mt: 4 }}>
        <Box sx={{ width: '60%', height: '40px', backgroundColor: '#f0f0f0', borderRadius: '4px', animation: 'shimmer 1.5s infinite linear' }} />
        <Box sx={{ width: '40%', height: '30px', backgroundColor: '#f0f0f0', borderRadius: '4px', mt: 2, animation: 'shimmer 1.5s infinite linear' }} />
        <Box sx={{ width: '50%', height: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px', mt: 1, animation: 'shimmer 1.5s infinite linear' }} />
        <Box sx={{ width: '70%', height: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px', mt: 1, animation: 'shimmer 1.5s infinite linear' }} />
        <Box sx={{ width: '60%', height: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px', mt: 1, animation: 'shimmer 1.5s infinite linear' }} />
        <Box sx={{ width: '50%', height: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px', mt: 1, animation: 'shimmer 1.5s infinite linear' }} />

        <Box sx={{ my: 4 }}>
          <Box sx={{ width: '40%', height: '30px', backgroundColor: '#f0f0f0', borderRadius: '4px', animation: 'shimmer 1.5s infinite linear' }} />
          <Box sx={{ width: '30%', height: '40px', backgroundColor: '#f0f0f0', borderRadius: '4px', mt: 2, animation: 'shimmer 1.5s infinite linear' }} />
        </Box>
      </Box>
    </Box>
  </Box>
);

const JobDetails = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobUsers, setSelectedJobUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const backendServer = process.env.REACT_APP_BACKEND_SERVER;

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${backendServer}/getJobs`);
      setJobs(response.data);
      if (response.data.length > 0) {
        setSelectedJob(response.data[0]); 
        fetchUsersForJob(response.data[0]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching job data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobChange = (event) => {
    const jobId = event.target.value;
    const job = jobs.find((job) => job._id === jobId);
    setSelectedJob(job);
    setSelectedJobUsers([]); // Reset selected job users when changing job
    fetchUsersForJob(job); // Fetch users when job changes
  };

  const fetchUsersForJob = async (job) => {
    if (!job || !job.userApplied) {
      setSelectedJobUsers([]);
      return;
    }

    try {
      const userEmails = job.userApplied;

      // Create an array of promises for fetching user details
      const userDetailsPromises = userEmails.map((userEmail) =>
        axios.post(`${backendServer}/getUser`, { email: userEmail })
      );

      // Wait for all promises to resolve
      const userDetailsResponses = await Promise.all(userDetailsPromises);

      // Extract user data from responses
      const userDetails = userDetailsResponses.map((response) => response.data.user);
      setSelectedJobUsers(userDetails);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleDownload = async () => {
    if (!selectedJob || !selectedJob.userApplied) return;

    try {
      // const userEmails = selectedJob.userApplied;

      // // Create an array of promises for fetching user details
      // const userDetailsPromises = userEmails.map((userEmail) =>
      //   axios.post(`${backendServer}/getUser`, { email: userEmail })
      // );

      // // Wait for all promises to resolve
      // const userDetailsResponses = await Promise.all(userDetailsPromises);

      // // Extract user data from responses
      // const userDetails = userDetailsResponses.map((response) => response.data.user);
      // setSelectedJobUsers(userDetails);

      const userDetails = selectedJobUsers;

      // Create CSV content
      const csvContent = [
        ["Name", "Email", "Registration Number", "Branch", "Semester", "10th Marks", "12th Marks"],
        ...userDetails.map((user) => [
          user.name,
          user.email,
          user.registrationNumber,
          user.branch || '',
          user.semester || '',
          user.tenthMarks || '',
          user.twelfthMarks || ''
        ]),
      ]
        .map((e) => e.join(","))
        .join("\n");

      // Create and download the CSV file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${selectedJob.companyName}_applicants.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <Layout>
      <Box sx={{ my: 4 }}>
        {isLoading ? (
          <ShimmerLoader />
        ) : (
          <>
            <FormControl fullWidth>
              <InputLabel id="select-job-label">Select Job</InputLabel>
              <Select
                labelId="select-job-label"
                value={selectedJob ? selectedJob._id : ""}
                onChange={handleJobChange}
                MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
              >
                {jobs.map((job) => (
                  <MenuItem key={job._id} value={job._id}>
                    {`${job.companyName} - ${job.jobTitle}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedJob && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                  {selectedJob.jobTitle}
                </Typography>
                <Typography variant="h6">{selectedJob.companyName}</Typography>
                <Typography variant="body1">CTC: {selectedJob.CTC}</Typography>
                <Typography variant="body1">
                  Date of Application: {new Date(selectedJob.DOA).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  Eligible Above: {selectedJob.eligibleAbove}
                </Typography>
                <Typography variant="body1">Job Type: {selectedJob.jobType}</Typography>

                <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom>
                    Users Applied
                  </Typography>
                  <Button
                    onClick={handleDownload}
                    variant="contained"
                    color="primary"
                  >
                    Download List
                  </Button>
                </Box>

                {selectedJobUsers.length > 0 && (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Registration Number</TableCell>
                          <TableCell>Branch</TableCell>
                          <TableCell>Semester</TableCell>
                          <TableCell>10th Marks</TableCell>
                          <TableCell>12th Marks</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedJobUsers.map((user) => (
                          <TableRow key={user._id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.registrationNumber}</TableCell>
                            <TableCell>{user.branch || '-'}</TableCell>
                            <TableCell>{user.semester || '-'}</TableCell>
                            <TableCell>{user.tenthMarks || '-'}</TableCell>
                            <TableCell>{user.twelfthMarks || '-'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}
          </>
        )}
      </Box>
    </Layout>
  );
};

export default JobDetails;