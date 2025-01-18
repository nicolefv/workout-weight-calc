import React from 'react';
import { Box, Typography } from '@mui/material';

function BarbellVisualizer({ plates, unit }) {
  const plateColors = {
    // lbs
    45: '#DC2626',
    35: '#2563EB',
    25: '#059669',
    10: '#D97706',
    5: '#7C3AED',
    2.5: '#DB2777',
    // kg
    '25': '#DC2626',
    '20': '#2563EB',
    '15': '#059669',
    '10': '#D97706',
    '5': '#7C3AED',
    '2.5': '#DB2777',
    '1.25': '#9D174D'
  };

  const getPlateWidth = (weight) => {
    const baseWidth = window.innerWidth < 600 ? 0.7 : 1; // Scale down on mobile
    return {
      45: 20 * baseWidth,
      35: 18 * baseWidth,
      25: 16 * baseWidth,
      10: 12 * baseWidth,
      5: 10 * baseWidth,
      2.5: 8 * baseWidth
    }[weight] || 8 * baseWidth;
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      my: { xs: 1, sm: 2 },
      position: 'relative',
      minHeight: { xs: 80, sm: 120 },
      overflow: 'auto'
    }}>
      {/* Bar weight label */}
      <Typography 
        variant="caption" 
        sx={{ 
          position: 'absolute', 
          top: -20, 
          color: 'text.secondary'
        }}
      >
        Bar: {unit === 'kg' ? '20 kg' : '45 lbs'}
      </Typography>

      {/* Bar end */}
      <Box sx={{ 
        width: 12, 
        height: 12, 
        bgcolor: '#666666',
        borderRadius: '50%'
      }} />
      
      {/* Plates */}
      {plates.map((weight, index) => (
        <Box
          key={index}
          sx={{
            width: getPlateWidth(weight),
            height: 80,
            bgcolor: plateColors[weight],
            mx: 0.5,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            boxShadow: 2,
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '30%',
              height: '30%',
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.2)'
            }
          }}
        >
          {weight}
        </Box>
      ))}
      
      {/* Bar */}
      <Box sx={{ 
        width: { xs: 100, sm: 140 }, 
        height: { xs: 8, sm: 12 }, 
        bgcolor: '#666666',
        borderRadius: 1
      }} />
      
      {/* Plates (mirrored) */}
      {plates.slice().reverse().map((weight, index) => (
        <Box
          key={index}
          sx={{
            width: getPlateWidth(weight),
            height: 80,
            bgcolor: plateColors[weight],
            mx: 0.5,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            boxShadow: 2,
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '30%',
              height: '30%',
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.2)'
            }
          }}
        >
          {weight}
        </Box>
      ))}
      
      {/* Bar end */}
      <Box sx={{ 
        width: 12, 
        height: 12, 
        bgcolor: '#666666',
        borderRadius: '50%'
      }} />

      {/* Total weight label */}
      <Typography 
        variant="caption" 
        sx={{ 
          position: 'absolute', 
          bottom: -20, 
          color: 'text.secondary'
        }}
      >
        {plates.length > 0 ? `${plates.length} plates per side` : 'No plates needed'}
      </Typography>
    </Box>
  );
}

export default BarbellVisualizer; 