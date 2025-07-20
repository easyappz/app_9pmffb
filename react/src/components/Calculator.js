import React, { useState } from 'react';
import styled from 'styled-components';

// Основной контейнер калькулятора в стиле iOS
const CalculatorContainer = styled.div`
  width: 320px;
  margin: 40px auto;
  background: #000;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  padding-bottom: 20px;
  user-select: none;
`;

// Экран калькулятора для отображения чисел
const Display = styled.div`
  background: #000;
  color: white;
  font-size: 80px;
  text-align: right;
  padding: 20px;
  height: 120px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  overflow: hidden;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  font-weight: 300;
`;

// Сетка для кнопок
const ButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: #333;
`;

// Стили для кнопок с учетом различных типов (цифры, операции, функции)
const Button = styled.button`
  border: none;
  padding: 25px 10px;
  font-size: 24px;
  cursor: pointer;
  background: ${props => props.bg || '#666'};
  color: ${props => props.color || 'white'};
  transition: background 0.2s ease-in-out;
  font-family: 'Arial', sans-serif;
  font-weight: 400;
  border-radius: 0;
  outline: none;
  position: relative;

  &:hover {
    background: ${props => props.hoverBg || '#888'};
  }

  &:active {
    background: ${props => props.activeBg || '#555'};
    transform: scale(0.98);
  }

  // Добавляем эффект тени для кнопок
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(0, 0, 0, 0.3);
  }
`;

// Компонент калькулятора
const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  // Обработка ввода цифр
  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else if (waitingForSecondValue) {
      setDisplay(value);
      setWaitingForSecondValue(false);
    } else {
      // Ограничение на ввод только одной точки
      if (value === '.' && display.includes('.')) return;
      setDisplay(display + value);
    }
  };

  // Обработка выбора операции
  const handleOperationClick = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondValue(true);
  };

  // Вычисление результата
  const calculateResult = () => {
    if (!previousValue || !operation) return;

    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = previousValue + current;
        break;
      case '-':
        result = previousValue - current;
        break;
      case '×':
        result = previousValue * current;
        break;
      case '÷':
        if (current === 0) {
          setDisplay('Ошибка');
          return;
        }
        result = previousValue / current;
        break;
      default:
        return;
    }

    // Форматирование результата для избежания длинных десятичных чисел
    if (result.toString().length > 9) {
      setDisplay(result.toFixed(9 - result.toString().indexOf('.')));
    } else {
      setDisplay(result.toString());
    }
    setPreviousValue(null);
    setOperation(null);
  };

  // Сброс кальme();
  // Сброс всех значений
  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  // Вычисление процента
  const handlePercent = () => {
    const value = parseFloat(display);
    setDisplay((value / 100).toString());
  };

  // Смена знака числа
  const handleToggleSign = () => {
    if (display !== '0') {
      setDisplay((parseFloat(display) * -1).toString());
    }
  };

  return (
    <CalculatorContainer>
      <Display>{display}</Display>
      <ButtonsGrid>
        {/* Функциональные кнопки (AC, ±, %) в сером цвете */}
        <Button 
          bg="#A5A5A5" 
          color="black" 
          hoverBg="#B5B5B5" 
          activeBg="#959595" 
          onClick={handleClear}
        >
          AC
        </Button>
        <Button 
          bg="#A5A5A5" 
          color="black" 
          hoverBg="#B5B5B5" 
          activeBg="#959595" 
          onClick={handleToggleSign}
        >
          ±
        </Button>
        <Button 
          bg="#A5A5A5" 
          color="black" 
          hoverBg="#B5B5B5" 
          activeBg="#959595" 
          onClick={handlePercent}
        >
          %
        </Button>
        {/* Операционные кнопки в оранжевом цвете */}
        <Button 
          bg="#FF9500" 
          hoverBg="#FFAA33" 
          activeBg="#CC7700" 
          onClick={() => handleOperationClick('÷')}
        >
          ÷
        </Button>

        {/* Цифровые кнопки в темном сером цвете */}
        <Button 
          bg="#333" 
          hoverBg="#444" 
          activeBg="#222" 
          onClick={() => handleNumberClick('7')}
        >
          7
        </Button>
        <Button 
          bg="#333" 
          hoverBg="#444" 
          activeBg="#222" 
          onClick={() => handleNumberClick('8')}
        >
          8
        </Button>
        <Button 
          bg="#333" 
          hoverBg="#444" 
          activeBg="#222" 
          onClick={() => handleNumberClick('9')}
        >
          9
        </Button>
        <Button 
          bg="#FF9500" 
          hoverBg="#FFAA33" 
          activeBg="#CC7700" 
          onClick={() => handleOperationClick('×')}
        >
          ×
        </Button>

        <Button 
          bg="#333" 
          hoverBg="#444" 
          activeBg="#222" 
          onClick={() => handleNumberClick('4')}
        >
          4
        </Button>
        <Button 
          bg="#333" 
          hoverBg="#444" 
          activeBg="#222" 
          onClick={() => handleNumberClick('5')}
        >
          5
        </Button>
        <Button 
          bg="#333" 
          hoverBg="#444" 
          activeBg="#222" 
          onClick={() => handleNumberClick('6')}
        >
          6
        </Button>
        <Button 
          bg="#FF9500" 
          hoverBg="#FFAA33" 
          activeBg="#CC7700" 
          onClick={() => handleOperationClick('-')}
        >
          -
        </Button>

        <Button 
          bg="#333" 
          hoverBg="#444" 
          activeBg="#222" 
          onClick={() => handleNumberClick('1')}
        >
          1
        </Button>
        <Button 
          bg="#333" 
          hoverBg="#444" 
          activeBg="#222" 
          onClick={() => handleNumberClick('2')}
        >
          2
        </Button>
        <Button 
          bg="#333" 
          hoverBg="#444" 
          activeBg="#222" 
          onClick={() => handleNumberClick('3')}
        >
          3
        </Button>
        <Button 
          bg="#FF9500" 
          hoverBg="#FFAA33" 
          activeBg="#CC7700" 
          onClick={() => handleOperationClick('+')}
        >
          +
        </Button>

        {/* Специальная кнопка 0 с увеличенной шириной */}
        <Button 
          bg="#333" 
          hoverBg="#444" 
          activeBg="#222" 
          onClick={() => handleNumberClick('0')} 
          style={{ gridColumn: 'span 2', textAlign: 'left', paddingLeft: '20px' }}
        >
          0
        </Button>
        <Button 
          bg="#333" 
          hoverBg="#444" 
          activeBg="#222" 
          onClick={() => handleNumberClick('.')}
        >
          ,
        </Button>
        <Button 
          bg="#FF9500" 
          hoverBg="#FFAA33" 
          activeBg="#CC7700" 
          onClick={calculateResult}
        >
          =
        </Button>
      </ButtonsGrid>
    </CalculatorContainer>
  );
};

export default Calculator;
