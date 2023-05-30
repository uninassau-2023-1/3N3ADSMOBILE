/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return (
    <Image
      source={require('../../assets/images/logo-ofc.png')}
      style={styles.logo}
    />
  )
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    margin: 20,
  },
})
