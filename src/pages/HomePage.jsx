import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Skeleton,
  Container,
  Button,
} from "@mui/material";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import axios from "axios";
import Layout from "../layout/Layout";
import { useSelector } from "react-redux";
import DashboardComponent from "../components/DashBoardComponent";
import AdminHomePage from "./AdminHomePage";
import Gauge from "../components/Gauge";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const role = useSelector((state) => state.user.role);
  const userEmail = useSelector((state) => state.user.user);
  const backendServer =
    process.env.REACT_APP_BACKEND_SERVER || "http://localhost:3001";

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.post(`${backendServer}/getUser`, {
          email: userEmail,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [backendServer, userEmail]);

   // Calculate profile completion percentage based on available fields
   const calculateProfileCompletion = () => {
    if (!user) return 0;

    const { email, name, registrationNumber, semester, cgpa, resume, tenthMarks, twelfthMarks, branch } = user;
    const requiredFields = ['email', 'name', 'registrationNumber', 'semester', 'cgpa', 'resume', 'tenthMarks', 'twelfthMarks', 'branch'];
    const filledFields = requiredFields.filter(field => !!user[field]);
    return (filledFields.length / requiredFields.length) * 100;
  };

  // Function to display a message about completing profile details
  const renderProfileCompletionMessage = () => {
    const { email, name, registrationNumber, semester, cgpa, resume, tenthMarks, twelfthMarks, branch } = user;
    const requiredFields = ['email', 'name', 'registrationNumber', 'semester', 'cgpa', 'resume', 'tenthMarks', 'twelfthMarks', 'branch'];
    const missingFields = requiredFields.filter(field => !user[field]);
  
    if (missingFields.length === 0) {
      return (
        <Typography variant="body2" color="textSecondary">
          <strong>Your profile is complete!</strong> <br />
          You can view and manage your profile details on the profile page.
        </Typography>
      );
    } else {
      return (
        <Box style={{marginBottom: "10px"}}>
          <Typography variant="body2" color="textSecondary">
            Your profile is <strong>{calculateProfileCompletion().toFixed(2)}%</strong> complete.
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            To complete your profile, please add: <br />
            {missingFields.map((field, index) => (
              <span key={index}><strong>{field}</strong>{index < missingFields.length - 1 ? ', ' : ''}</span>
            ))}
          </Typography>
          <Link to='/profile'>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Go to Profile
          </Button>
          </Link>
         
        </Box>
      );
    }
  };

  return (
    <Layout>
      <Container maxWidth="lg">
        {isLoading ? (
          <Box sx={{ p: 3 }}>
            <Skeleton variant="text" width="40%" height={50} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ textAlign: "center", padding: 3 }}>
                  <Skeleton
                    variant="circular"
                    width={100}
                    height={100}
                    sx={{ margin: "auto" }}
                  />
                  <CardContent>
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={30}
                      sx={{ margin: "auto" }}
                    />
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={20}
                      sx={{ margin: "auto" }}
                    />
                    <Skeleton
                      variant="text"
                      width="50%"
                      height={20}
                      sx={{ margin: "auto" }}
                    />
                    <Skeleton
                      variant="text"
                      width="70%"
                      height={20}
                      sx={{ margin: "auto" }}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={3}>
                  {[1, 2, 3, 4].map((item) => (
                    <Grid item xs={12} key={item}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={118}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <>
            <DashboardComponent user={user} />
            <Box sx={{ flexGrow: 1 }}>
              {role === "Admin" ? (
                <Grid container spacing={3}>
                  {/* <AdminHomePage /> */}
                </Grid>
              ) : (
                <Card sx={{ textAlign: 'center', marginTop: 4 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Profile Completion
                  </Typography>
                  <Gauge value={calculateProfileCompletion()} />
                  <Box sx={{ mt: 3 }}>
                    {renderProfileCompletionMessage()}
                  </Box>
                </CardContent>
              </Card>
              )}
            </Box>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default HomePage;
