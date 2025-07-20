import React, { useState } from 'react';
import { Button, Grid, TextField, Paper, Typography } from '@mui/material';
import './Calculator.css';

/**
 * Calculator component that handles basic arithmetic operations.
 * Manages state for current input, previous input, operation, and result.
 */
const Calculator = () => {
  // State for calculator inputs and results
  const [currentInput, setCurrentInput] = useState('0');
  const [previousInput, setPreviousInput] = useState('');
  const [operation, setOperation] = useState(null);
  const [result, setResult] = useState(null);
  const [waitingForSecondInput, setWaitingForSecondInput] = useState(false);

  // Button layout for the calculator
  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  /**
   * Handles button clicks and updates calculator state accordingly.
   * @param {string} value - The value of the clicked button.
   */
  const handleButtonClick = (value) => {
    if (value === 'C') {
      // Reset calculator state on clear
      setCurrentInput('0');
      setPreviousInput('');
      setOperation(null);
      setResult(null);
      setWaitingForSecondInput(false);
    } else if (['+', '-', '*', '/'].includes(value)) {
      // Handle operation selection
      setPreviousInput(currentInput);
      setOperation(value);
      setWaitingForSecondInput(true);
      setCurrentInput('0');
    } else if (value === '=') {
      // Calculate result when equals is pressed
      if (previousInput && operation && currentInput) {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);
        let calculatedResult = 0;

        if (operation === '+') {
          calculatedResult = num1 + num2;
        } else if (operation === '-') {
          calculatedResult = num1 - num2;
        } else if (operation === '*') {
          calculatedResult = num1 * num2;
        } else if (operation === '/') {
          if (num2 === 0) {
            setResult('Ошибка');
            return;
          }
          calculatedResult = num1 / num2;
        }

        setResult(calculatedResult);
        setCurrentInput(calculatedResult.toString());
        setPreviousInput('');
        setOperation(null);
        setWaitingForSecondInput(false);
      }
    } else {
      // Handle number or decimal input
      if (currentInput === '0' && value !== '.') {
        setCurrentInput(value);
      } else if (value === '.' && currentInput.includes('.')) {
        return;
      } else {
        setCurrentInput(currentInput + value);
      }
    }
  };

  return (
    <Paper elevation={3} className="calculator-container">
      <Typography variant="h6" className="calculator-title">
        Калькулятор
      </Typography>
      <TextField
        variant="outlined"
        value={result !== null ? result : currentInput}
        fullWidth
        disabled
        className="calculator-display"
        InputProps={{
          style: { textAlign: 'right', fontSize: '1.5rem' }
        }}
      />
      <Grid container spacing={1} className="calculator-buttons">
        {buttons.map((btn) => (
          <Grid item xs={3} key={btn}>
            <Button
              variant={['+', '-', '*', '/'].includes(btn) ? 'outlined' : 'contained'}
              color={btn === 'C' ? 'error' : btn === '=' ? 'success' : 'primary'}
              fullWidth
              style={{ height: '60px', fontSize: '1.2rem' }}
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Calculator;
