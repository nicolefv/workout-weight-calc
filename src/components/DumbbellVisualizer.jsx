import React from 'react';
import { Box, Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

function DumbbellVisualizer({ weight, unit }) {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1,
      my: 2
    }}>
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <FitnessCenterIcon sx={{ 
          fontSize: { xs: 32, sm: 40 },
          transform: 'rotate(-45deg)',
          color: 'primary.main'
        }} />
        <Typography variant="h6" color="primary">
          {weight} {unit}
        </Typography>
        <FitnessCenterIcon sx={{ 
          fontSize: { xs: 32, sm: 40 },
          transform: 'rotate(45deg)',
          color: 'primary.main'
        }} />
      </Box>
      <Typography variant="caption" color="text.secondary">
        Use two {weight} {unit} dumbbells
      </Typography>
    </Box>
  );
}

export default DumbbellVisualizer; 