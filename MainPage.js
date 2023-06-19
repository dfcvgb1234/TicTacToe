import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import Board from './BoardRenderer';

const MainPage = () => {
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState('');

  useEffect(() => {
    checkWinner();
  }, [board]);

  const handlePress = (row, col) => {
    if (board[row][col] === '') {
      const newBoard = [...board];
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        board[Math.floor(a / 3)][a % 3] &&
        board[Math.floor(a / 3)][a % 3] === board[Math.floor(b / 3)][b % 3] &&
        board[Math.floor(a / 3)][a % 3] === board[Math.floor(c / 3)][c % 3]
      ) {
        setWinner(board[Math.floor(a / 3)][a % 3]);
        break;
      }
    }
  };

  const resetGame = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setCurrentPlayer('X');
    setWinner('');
  };

  const displayWinnerMessage = () => {
    if (winner) {
      Alert.alert('Game Over', `Player ${winner} wins!`, [{ text: 'OK', onPress: resetGame }]);
    }
  };

  return (
    <View style={styles.container}>
      <Board board={board} onPress={handlePress} />
      <Button title="Reset Game" onPress={resetGame} />
      {displayWinnerMessage()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainPage;