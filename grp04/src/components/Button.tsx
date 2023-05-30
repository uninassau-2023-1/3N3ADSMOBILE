/* eslint-disable camelcase */
import React from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { useFonts, Oswald_400Regular } from '@expo-google-fonts/oswald'

interface ButtonProps {
  onPress: () => void
  isLoading?: boolean
  title: String
}

export default function LoadingScreen({
  onPress,
  isLoading = false,
  title,
}: ButtonProps) {
  const [fontLoaded] = useFonts({
    Oswald_400Regular,
  })
  if (!fontLoaded) {
    return null
  } else {
    return (
      <TouchableOpacity
        disabled={isLoading}
        onPress={onPress}
        style={styles.btnStyle}
      >
        {isLoading ? (
          <ActivityIndicator color="#4F4343" />
        ) : (
          <Text style={styles.textBtn}>{title}</Text>
        )}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: '10%',
    width: 150,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    alignSelf: 'center',
  },
  textBtn: {
    color: '#4F4343',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Oswald_400Regular',
  },
})
