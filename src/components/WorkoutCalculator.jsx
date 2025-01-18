import React, { useState } from 'react';
import {
  Box,
  TextField,
  Slider,
  Typography,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
} from '@mui/material';
import BarbellVisualizer from './BarbellVisualizer';

function WorkoutCalculator() {
  const [targetWeight, setTargetWeight] = useState(225);
  const [warmupSets, setWarmupSets] = useState(3);
  const [isKg, setIsKg] = useState(false);
  
  // Conversion functions
  const lbsToKg = (lbs) => Math.round(lbs * 0.453592);
  const kgToLbs = (kg) => Math.round(kg * 2.20462);
  
  const handleWeightChange = (value) => {
    setTargetWeight(value);
  };

  const handleUnitToggle = () => {
    setIsKg(prev => {
      const newIsKg = !prev;
      // Convert the current weight when switching units
      setTargetWeight(newIsKg ? lbsToKg(targetWeight) : kgToLbs(targetWeight));
      return newIsKg;
    });
  };

  const calculateWarmupSets = (target, sets) => {
    const barWeight = isKg ? 20 : 45; // 20kg or 45lbs bar
    const percentages = [];
    
    // Generate percentages based on number of warmup sets
    for (let i = 1; i <= sets; i++) {
      percentages.push(Math.round((40 + (i * (60 / sets))) / 5) * 5);
    }
    
    return percentages.map(percentage => {
      const weight = Math.round((target * (percentage / 100)) / 5) * 5;
      return {
        percentage,
        weight,
        plates: calculatePlates(weight)
      };
    });
  };
  
  const calculatePlates = (targetWeight) => {
    const barWeight = isKg ? 20 : 45;
    const availablePlates = isKg 
      ? [25, 20, 15, 10, 5, 2.5, 1.25] // kg plates
      : [45, 35, 25, 10, 5, 2.5];      // lbs plates
    const plates = [];
    let remainingWeight = (targetWeight - barWeight) / 2;
    
    availablePlates.forEach(plate => {
      while (remainingWeight >= plate) {
        plates.push(plate);
        remainingWeight -= plate;
      }
    });
    
    return plates;
  };

  const warmupSetData = calculateWarmupSets(targetWeight, warmupSets);
  const unit = isKg ? 'kg' : 'lbs';

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Workout Weight Calculator
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={`Target Weight (${unit})`}
              type="number"
              value={targetWeight}
              onChange={(e) => handleWeightChange(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControlLabel
              control={
                <Switch
                  checked={isKg}
                  onChange={handleUnitToggle}
                />
              }
              label={`Units: ${unit}`}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography gutterBottom>
              Number of Warmup Sets: {warmupSets}
            </Typography>
            <Slider
              value={warmupSets}
              onChange={(e, newValue) => setWarmupSets(newValue)}
              min={1}
              max={5}
              marks
              step={1}
            />
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Warmup Sets
      </Typography>
      
      {warmupSetData.map((set, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography>
                Set {index + 1}: {set.weight}{unit} ({set.percentage}%)
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <BarbellVisualizer plates={set.plates} unit={unit} />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        Working Set
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography>
              {targetWeight}{unit} (100%)
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <BarbellVisualizer plates={calculatePlates(targetWeight)} unit={unit} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default WorkoutCalculator; 