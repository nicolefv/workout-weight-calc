import React, { useState } from 'react';
import { Container, Typography, Paper, TextField, Box, Grid, Slider, Switch, FormControlLabel } from '@mui/material';
import BarbellVisualizer from './components/BarbellVisualizer';

function App() {
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

  const calculateWarmupSets = () => {
    const sets = [];
    const barWeight = isKg ? 20 : 45; // 20kg or 45lbs bar
    
    for (let i = 1; i <= warmupSets; i++) {
      const percentage = 40 + ((50 / (warmupSets + 1)) * i);
      // Round to nearest 2.5kg or 5lbs
      const roundTo = isKg ? 2.5 : 5;
      const weight = Math.round((targetWeight * (percentage / 100)) / roundTo) * roundTo;
      sets.push({
        setNumber: i,
        percentage: Math.round(percentage),
        weight: weight,
        plates: calculatePlates(weight)
      });
    }
    return sets;
  };

  const calculatePlates = (weight) => {
    const barWeight = isKg ? 20 : 45;
    const availablePlates = isKg 
      ? [25, 20, 15, 10, 5, 2.5, 1.25] // kg plates
      : [45, 35, 25, 10, 5, 2.5];      // lbs plates
    const plates = [];
    let remainingWeight = (weight - barWeight) / 2;

    availablePlates.forEach(plate => {
      while (remainingWeight >= plate) {
        plates.push(plate);
        remainingWeight -= plate;
      }
    });

    return plates;
  };

  return (
    <Container maxWidth="md" sx={{ pb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 2 }}>
        Workout Planner
      </Typography>

      <Paper sx={{ p: { xs: 2, md: 4 }, mb: 3 }}>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label={`Target Weight (${isKg ? 'kg' : 'lbs'})`}
              type="number"
              value={targetWeight}
              onChange={(e) => handleWeightChange(Number(e.target.value))}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControlLabel
              control={
                <Switch
                  checked={isKg}
                  onChange={handleUnitToggle}
                />
              }
              label={`Units: ${isKg ? 'kg' : 'lbs'}`}
              sx={{ mt: { xs: 0, sm: 1 } }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography gutterBottom>
              Warmup Sets: {warmupSets}
            </Typography>
            <Slider
              value={warmupSets}
              onChange={(e, value) => setWarmupSets(value)}
              min={1}
              max={5}
              marks
              step={1}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Warmup Sets */}
      <Typography variant="h5" gutterBottom>
        Warmup Sets
      </Typography>
      {calculateWarmupSets().map((set) => (
        <Paper key={set.setNumber} sx={{ p: { xs: 2, md: 3 }, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">
                Set {set.setNumber}
              </Typography>
              <Typography color="text.secondary">
                {set.weight} {isKg ? 'kg' : 'lbs'} ({set.percentage}%)
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <BarbellVisualizer plates={set.plates} unit={isKg ? 'kg' : 'lbs'} />
            </Grid>
          </Grid>
        </Paper>
      ))}

      {/* Working Set */}
      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        Working Set
      </Typography>
      <Paper sx={{ p: { xs: 2, md: 3 } }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">
              Working Weight
            </Typography>
            <Typography color="text.secondary">
              {targetWeight} {isKg ? 'kg' : 'lbs'} (100%)
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <BarbellVisualizer plates={calculatePlates(targetWeight)} unit={isKg ? 'kg' : 'lbs'} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;