import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import Board from './BoardRenderer';
import StartScreen from './StartScreen';

const MainPage = () => {
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [isAI, setIsAI] = useState(false);

  let curPlayer = "X"

  useEffect(() => {
    checkWinner();
  }, [board]);

  const handlePress = (row, col) => {
    if (board[row][col] === '') {
      const newBoard = [...board];
      newBoard[row][col] = getCurrentPlayer();
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      curPlayer = curPlayer == 'X' ? 'O' : 'X'

      console.log("Is AI: " + isAI);
      console.log("currentPlayer: " + curPlayer);
      if (isAI && curPlayer === 'O') {
        
        let aiPos = getRandomBoardPosition();

        for (i = 0; i < 9; i++) {
            if (board[aiPos["row"]][aiPos["col"]] !== '') {
                aiPos = getRandomBoardPosition();
            }
        }
        
        console.log(aiPos["row"]);
        console.log(aiPos["col"]);
        const newBoard = [...board];
        newBoard[aiPos["row"]][aiPos["col"]] = 'O';
        setBoard(newBoard);
      }

    }
  };

  function getCurrentPlayer() {
    if  (isAI) {
        return curPlayer;
    }
    else {
        return currentPlayer;
    }
  }

  function getRandomBoardPosition() {
    let aiRow = getRndInteger(0,3);
    let aiCol = getRndInteger(0,3);

    if (aiRow > 3) {
        aiRow -= 1;
    }
    if (aiCol > 3) {
        aiCol -= 1;
    }
    
    return {"row": aiRow, "col": aiCol};
  }

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

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

  const startGame = () => {
    setIsAI(false);
    setGameStarted(true);
  };

  const startGameAI = () => {
    setIsAI(true);
    setGameStarted(true);
  };

  const displayWinnerMessage = () => {
    if (winner) {
      Alert.alert('Game Over', `Player ${winner} wins!`, [{ text: 'OK', onPress: resetGame }]);
    }
  };

  const exitGame = () => {
    setGameStarted(false);
    resetGame();
  };

  return (
    <View style={styles.container}>
      {gameStarted ? (
        <>
          <Button title="Back" onPress={exitGame} />
          <Board board={board} onPress={handlePress} />
          <Button title="Reset Game" onPress={resetGame} />
          {displayWinnerMessage()}
        </>
      ) : (
        <StartScreen onStartGame={startGame} onStartGameAI={startGameAI}/>
      )}
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