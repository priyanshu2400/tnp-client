import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Avatar, Box, Container, Paper, Grid, Typography, TextField, Button, Skeleton } from "@mui/material";
import Layout from "../layout/Layout";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const role = useSelector((state) => state.user.role);
  const userEmail = useSelector((state) => state.user.user);
  const backendServer = process.env.REACT_APP_BACKEND_SERVER || "http://localhost:3001";
  const [missingFields, setMissingFields] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.post(`${backendServer}/getUser`, { email: userEmail });
        setUser(response.data.user);

        const requiredFields = ['name', 'registrationNumber', 'semester', 'cgpa', 'resume', 'tenthMarks', 'twelfthMarks', 'branch'];
        const missing = requiredFields.filter(field => !response.data.user[field]);
        setMissingFields(missing);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [backendServer, userEmail]);

  const handleSave = async () => {
    try {
      await axios.post(`${backendServer}/updateUser`,  { email: user.email, ...user });
      // Fetch updated user data
      const response = await axios.post(`${backendServer}/getUser`, { email: userEmail });
      setUser(response.data.user);
      const requiredFields = ['name', 'registrationNumber', 'semester', 'cgpa', 'resume', 'tenthMarks', 'twelfthMarks', 'branch'];
      const missing = requiredFields.filter(field => !response.data.user[field]);
      setMissingFields(missing);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      {isLoading ? (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
          <Skeleton variant="circular" width={80} height={80} sx={{ marginRight: 2 }} />
          <Box>
            <Skeleton variant="text" width={120} height={30} />
            <Skeleton variant="text" width={200} height={20} />
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" width="100%" height={20} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" width="100%" height={20} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" width="100%" height={20} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" width="100%" height={20} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" width="100%" height={20} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" width="100%" height={20} />
          </Grid>
        </Grid>
      </Paper>
      ) : (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
            <Avatar sx={{ width: 80, height: 80, marginRight: 2 }} src={user.avatarUrl || "https://i.sstatic.net/frlIf.png"} />
            <Box>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2" color="textSecondary">{user.email}</Typography>
            </Box>
          </Box>
          <Grid container spacing={2}>
            {user.registrationNumber && (
              <Grid item xs={12} md={6}>
                <Typography variant="body2"><strong>Registration Number:</strong> {user.registrationNumber}</Typography>
              </Grid>
            )}
            {user.semester && (
              <Grid item xs={12} md={6}>
                <Typography variant="body2"><strong>Semester:</strong> {user.semester}</Typography>
              </Grid>
            )}
            {user.cgpa && (
              <Grid item xs={12} md={6}>
                <Typography variant="body2"><strong>CGPA:</strong> {user.cgpa}</Typography>
              </Grid>
            )}
            {user.resume && (
              <Grid item xs={12} md={6}>
                <Typography variant="body2"><strong>Resume:</strong> {user.resume}</Typography>
              </Grid>
            )}
            {user.tenthMarks && (
              <Grid item xs={12} md={6}>
                <Typography variant="body2"><strong>10th Marks:</strong> {user.tenthMarks}</Typography>
              </Grid>
            )}
            {user.twelfthMarks && (
              <Grid item xs={12} md={6}>
                <Typography variant="body2"><strong>12th Marks:</strong> {user.twelfthMarks}</Typography>
              </Grid>
            )}
            {user.branch && (
              <Grid item xs={12} md={6}>
                <Typography variant="body2"><strong>Branch:</strong> {user.branch}</Typography>
              </Grid>
            )}
          </Grid>

          {missingFields.length > 0 && (
            <>
              <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 3 }}>Hey {user.name}, please complete your profile!</Typography>
              {missingFields.map((field, index) => (
                <TextField
                  key={index}
                  fullWidth
                  label={field}
                  name={field}
                  value={user[field] || ""}
                  onChange={handleChange}
                  sx={{ marginBottom: 2 }}
                />
              ))}
              <Button variant="contained" color="primary" onClick={handleSave} >Save</Button>
            </>
          )}
        </Paper>
      )}
    </Layout>
  );
};

export default ProfilePage;
