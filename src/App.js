import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Paper, TextField, Box, Grid, Slider, Switch, 
  FormControlLabel, Button, IconButton 
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import BarbellVisualizer from './components/BarbellVisualizer';

function App() {
  const [targetWeight, setTargetWeight] = useState(165);
  const [warmupSets, setWarmupSets] = useState(3);
  const [isKg, setIsKg] = useState(false);
  
  // Timer state
  const [restTime, setRestTime] = useState(60);
  const [timeRemaining, setTimeRemaining] = useState(restTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsTimerRunning(false);
      // Optional: Play a sound when timer is done
      try {
        new Audio('data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=').play();
      } catch (err) {
        console.log('Audio play failed:', err);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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

      {/* Rest Timer */}
      <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Rest Timer
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Rest Time (seconds)"
              type="number"
              value={restTime}
              onChange={(e) => {
                setRestTime(Number(e.target.value));
                setTimeRemaining(Number(e.target.value));
              }}
              inputProps={{ 
                inputMode: 'numeric',
                pattern: '[0-9]*',
                min: 0,
                max: 600 // 10 minutes max
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h4" sx={{ fontFamily: 'monospace', minWidth: 80 }}>
                {formatTime(timeRemaining)}
              </Typography>
              <IconButton 
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                color="primary"
                size="large"
              >
                {isTimerRunning ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton
                onClick={() => {
                  setTimeRemaining(restTime);
                  setIsTimerRunning(false);
                }}
                color="secondary"
                size="large"
              >
                <RestartAltIcon />
              </IconButton>
            </Box>
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