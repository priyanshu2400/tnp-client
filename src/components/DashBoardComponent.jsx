import React from "react";
import { Avatar, Box, Typography, Paper, Chip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const DashboardComponent = ({ user }) => {
  const userImage = "https://i.sstatic.net/frlIf.png"; // Use user's avatar or fallback to placeholder

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, width: '100%' }}>
      <Box sx={{ position: "relative", mb: 2 }}>
        <Box
          component="img"
          sx={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: 2,
          }}
          src="https://static.vecteezy.com/system/resources/previews/013/545/880/non_2x/modern-colorful-wavy-line-background-design-wave-curve-abstract-background-for-business-landing-page-flyers-website-banner-and-presentation-free-vector.jpg" // Replace with your actual banner image source
          alt="Banner"
        />
        <Avatar
          sx={{
            width: 80,
            height: 80,
            position: "absolute",
            bottom: -40,
            left: 16,
            border: "3px solid white",
          }}
          src={userImage}
        >
          {!user.avatarUrl && <PersonIcon sx={{ fontSize: 40 }} />}{" "}
          {/* Display icon if no image */}
        </Avatar>
      </Box>
      <Box sx={{ padding: 2, mt: 4 }}>
        <Typography variant="h6" fontWeight="bold">
          {user.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ opacity: 0.8 }}>
          {user.email}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ marginTop: "10px" }}
        >
          <Typography component="span" variant="body2">
            <Typography component="span" variant="body2">
              Registration Number:
            </Typography>{" "}
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              {user.registrationNumber}
            </Typography>
          </Typography>{" "}
        </Typography>
      </Box>
    </Paper>
  );
};

export default DashboardComponent;
