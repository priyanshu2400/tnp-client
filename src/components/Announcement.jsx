import React from "react";
import { Card, CardContent, Grid, Typography, Box } from "@mui/material";

const Announcement = ({ title, description }) => (
  <Card
    style={{
      marginBottom: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      border: "1px solid #ddd",
    }}
  >
    <CardContent>
      <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "8px" }}>
        {title}
      </Typography>
      <Typography variant="body1">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default Announcement;
