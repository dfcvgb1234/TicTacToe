import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const Board = ({ board, onPress }) => {
  return (
    <View style={styles.container}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <TouchableOpacity
              key={cellIndex}
              style={styles.cell}
              onPress={() => onPress(rowIndex, cellIndex)}
            >
              <Text style={styles.cellText}>{cell}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    borderColor: 'black',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 40,
  },
});

export default Board;