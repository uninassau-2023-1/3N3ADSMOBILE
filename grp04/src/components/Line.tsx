import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function Line() {
  return <View style={styles.line} />
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: '80%',
    margin: '10%',
    backgroundColor: '#c2afaf',
  },
})
