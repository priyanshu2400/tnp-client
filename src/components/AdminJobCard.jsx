import React from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Grid,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import BusinessIcon from "@mui/icons-material/Business";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  border: "1px solid #e0e0e0",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  textDecoration: "none",
  color: "inherit",
}));

const StatusButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5, 1),
  textTransform: "none",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "&:hover": {
    backgroundColor: theme.palette.error.light,
    color: "#1976d2", // Light blue color on hover
  },
}));

const AdminJobCard = ({
  companyName,
  CTC,
  DOA,
  eligibleAbove,
  logo,
  jobTitle,
  jobType,
  userApplied,
  fetchJobs,
}) => {
  const backendServer = process.env.REACT_APP_BACKEND_SERVER;
  const data = { companyName };

  const handleRemoveApplication = async (e) => {
    // e.stopPropagation(); // Prevent navigation on button click
    try {
      const response = await fetch(`${backendServer}/removeJob`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Application removed successfully!");
        fetchJobs();
      } else {
        throw new Error("Failed to remove the application");
      }
    } catch (error) {
      console.error("Error removing application:", error);
      alert("Failed to remove the application.");
    }
  };

  return (
    <Container
    >
      <StyledCard>
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              item
              xs={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {logo ? (
                <img
                  src={logo}
                  alt={`${companyName} logo`}
                  style={{ width: 50, height: 50, borderRadius: "50%" }}
                />
              ) : (
                <BusinessIcon style={{ fontSize: 50, color: "#e0e0e0" }} />
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">{companyName}</Typography>
            </Grid>
            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              <StatusButton onClick={handleRemoveApplication} fullWidth>
                Remove
              </StatusButton>
            </Grid>
          </Grid>
          <Typography variant="h5" component="div" sx={{ mt: 1 }}>
            {jobTitle}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <WorkIcon fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {jobType}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <MonetizationOnIcon fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {CTC}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <DateRangeIcon fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {new Date(DOA).toLocaleDateString() || "--"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Eligible Above: {eligibleAbove}
            </Typography>
          </Box>
        </CardContent>
      </StyledCard>
    </Container>
  );
};

export default AdminJobCard;
