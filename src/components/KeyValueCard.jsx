// src/components/KeyValueCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const KeyValueCard = ({ data }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', mt: 3 }}>
      <CardContent>
        {data.map((item, index) => (
          <Grid container key={index} spacing={2} justifyContent="space-between">
            <Grid item>
              <Typography variant="body1" color="textSecondary">
                {item.key}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {item.value}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </CardContent>
    </Card>
  );
};

export default KeyValueCard;
