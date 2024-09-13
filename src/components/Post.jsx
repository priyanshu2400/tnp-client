import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const Post = ({ author, company, content, createdAt, email, likes }) => {
  return (
    <Card
    sx={{
      marginBottom: 2,
      width: "95%",
      backgroundColor: "WHITE",
      color: "#111", // Dark black text color
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Adding box shadow for 3D effect
      borderRadius: "8px", // Rounded corners for a softer look
    }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ fontWeight: "bold", marginRight: 1 }}
            >
              {author}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              placed at <span style={{ fontWeight: "bold" }}>{company}</span>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="body2" color="textSecondary">
              {new Date(createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {email}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="body1"
          sx={{
            marginTop: 1,
            border: "1px dotted darkgrey", // Example border style, adjust as needed
            borderRadius: 1,
            padding: 1,
            marginTop: 3,
          }}
          color="textSecondary"
        >
          {content}
        </Typography>
        <Box sx={{ marginTop: 1 }}>
          <Typography variant="body2" color="textSecondary">
            Likes: {likes}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Post;
