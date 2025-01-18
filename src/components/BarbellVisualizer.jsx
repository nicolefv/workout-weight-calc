import React from 'react';
import { Box, Typography, Stack, Tooltip } from '@mui/material';

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

  // Group identical plates together
  const groupedPlates = plates.reduce((acc, weight) => {
    acc[weight] = (acc[weight] || 0) + 1;
    return acc;
  }, {});

  return (
    <Box sx={{ 
      width: '100%',
      my: { xs: 2, sm: 3 },
      position: 'relative',
    }}>
      {/* Bar weight label */}
      <Typography 
        align="center"
        variant="caption" 
        sx={{ mb: 1, display: 'block', color: 'text.secondary' }}
      >
        Bar: {unit === 'kg' ? '20 kg' : '45 lbs'}
      </Typography>

      {/* Plate Legend */}
      <Stack 
        direction="row" 
        spacing={1} 
        justifyContent="center" 
        flexWrap="wrap"
        sx={{ mb: 2 }}
      >
        {Object.entries(groupedPlates).map(([weight, count]) => (
          <Box
            key={weight}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              bgcolor: 'rgba(0,0,0,0.1)',
              borderLeft: `4px solid ${plateColors[weight]}`,
              px: 1,
              py: 0.5,
              borderRadius: 1,
              m: 0.5
            }}
          >
            <Typography variant="body2">
              {weight}{unit} × {count}
            </Typography>
          </Box>
        ))}
      </Stack>

      {/* Barbell Visualization */}
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: { xs: 60, sm: 80 },
      }}>
        {/* Bar */}
        <Box sx={{ 
          width: '80%',
          maxWidth: 400,
          height: { xs: 6, sm: 8 },
          bgcolor: '#666666',
          borderRadius: 1,
          position: 'relative',
          margin: 'auto',
        }}>
          {/* Bar ends */}
          <Box sx={{ 
            width: 10,
            height: 10,
            bgcolor: '#666666',
            borderRadius: '50%',
            position: 'absolute',
            left: -5,
            top: '50%',
            transform: 'translateY(-50%)'
          }} />
          <Box sx={{ 
            width: 10,
            height: 10,
            bgcolor: '#666666',
            borderRadius: '50%',
            position: 'absolute',
            right: -5,
            top: '50%',
            transform: 'translateY(-50%)'
          }} />

          {/* Plates visualization */}
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            sx={{
              position: 'absolute',
              left: '30%',
              height: '100%',
              transform: 'translateX(-50%)',
            }}
          >
            {plates.map((weight, index) => (
              <Tooltip key={index} title={`${weight}${unit}`}>
                <Box
                  sx={{
                    width: { xs: 4, sm: 6 },
                    height: { xs: 40, sm: 60 },
                    bgcolor: plateColors[weight],
                    borderRadius: 0.5,
                    transform: 'translateY(-50%)',
                    top: '50%',
                    position: 'relative',
                    boxShadow: 1,
                  }}
                />
              </Tooltip>
            ))}
          </Stack>

          {/* Mirrored plates */}
          <Stack
            direction="row-reverse"
            spacing={0.5}
            alignItems="center"
            sx={{
              position: 'absolute',
              right: '30%',
              height: '100%',
              transform: 'translateX(50%)',
            }}
          >
            {plates.map((weight, index) => (
              <Tooltip key={index} title={`${weight}${unit}`}>
                <Box
                  sx={{
                    width: { xs: 4, sm: 6 },
                    height: { xs: 40, sm: 60 },
                    bgcolor: plateColors[weight],
                    borderRadius: 0.5,
                    transform: 'translateY(-50%)',
                    top: '50%',
                    position: 'relative',
                    boxShadow: 1,
                  }}
                />
              </Tooltip>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Plate count */}
      <Typography 
        align="center"
        variant="caption" 
        sx={{ mt: 1, display: 'block', color: 'text.secondary' }}
      >
        {plates.length > 0 ? `${plates.length} plates per side` : 'No plates needed'}
      </Typography>
    </Box>
  );
}

export default BarbellVisualizer; 