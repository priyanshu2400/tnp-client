import Layout from "../layout/Layout";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import Announcement from "../components/Announcement";
import axios from "axios";
import { useSelector } from "react-redux";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const backendServer = process.env.REACT_APP_BACKEND_SERVER || 'http://localhost:3001';
  const role = useSelector((state) => state.user.role);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${backendServer}/announcements`);
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };
    fetchAnnouncements();
  }, [backendServer]);

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendServer}/announcements`, newAnnouncement);
      setAnnouncements([response.data, ...announcements]);
      setNewAnnouncement({ title: "", description: "" });
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  const removeAnnouncement = async (id) => {
    try {
      await axios.delete(`${backendServer}/announcements/${id}`);
      setAnnouncements(announcements.filter((announcement) => announcement._id !== id));
    } catch (error) {
      console.error('Error removing announcement:', error);
    }
  };

  return (
    <Layout>
      <Container>
        <Grid container spacing={4}>
          {role === 'Admin' && ( // Conditionally render based on user role
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h4" gutterBottom>
                  Add Announcement
                </Typography>
                <form onSubmit={handleAnnouncementSubmit}>
                  <TextField
                    label="Title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Description"
                    multiline
                    value={newAnnouncement.description}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, description: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Add Announcement
                  </Button>
                </form>
              </Paper>
            </Grid>
          )}
          <Grid item xs={12} md={role === 'Admin' ? 6 : 12}>
            <Paper elevation={3} sx={{ padding: 2, background: "#f0f0f0" }}>
              <Typography variant="h4" gutterBottom>
                Announcements
              </Typography>
              <Box
                sx={{
                  maxHeight: 400,
                  overflowY: "auto",
                  "&::-webkit-scrollbar": { display: "none" },
                  "-ms-overflow-style": "none",
                  "scrollbar-width": "none",
                }}
              >
                {announcements.map((announcement) => (
                  <Box key={announcement._id} sx={{ marginBottom: 2 }}>
                    <Announcement {...announcement} />
                    {role === 'Admin' && (
                      <IconButton onClick={() => removeAnnouncement(announcement._id)} color="secondary">
                        Remove
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default AnnouncementsPage;