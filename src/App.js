import React, { useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import JobsPage from "./pages/JobsPage";
import HelpPage from "./pages/HelpPage";
import AddJobPage from "./pages/AddJobPage";
import PrivateRoute from "./components/PrivateRoute";
import JobDetails from "./components/JobDetails";
import BlogPage from "./pages/BlogPage";
import AddBlogPage from "./pages/AddBlogPage";
import ProfilePage from "./pages/ProfilePage";
import AnnouncementsPage from "./pages/AnnouncementsPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5", // Example primary color
    },
    secondary: {
      main: "#f50057", // Example secondary color
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/addjob" element={<AddJobPage />} />
          <Route path="/jobDetails" element={<JobDetails />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/addBlog" element={<AddBlogPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
