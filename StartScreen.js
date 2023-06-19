import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

const StartScreen = ({ onStartGame, onStartGameAI }) => {
  return (
    <View style={styles.container}>
      <Button title="Start Game" onPress={onStartGame} />
      <Button title="Start Game with AI" onPress={onStartGameAI}></Button>
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

export default StartScreen;