import React, { useEffect, useState } from 'react'
import Token from '../components/Token'
import StylesHome from '../styles/Styles.Home'
import { Text, View } from 'react-native'
import GetMedtoken from '../services/GetMedtoken'
import Logo from '../components/Logo'
import Line from '../components/Line'
import { SafeAreaView } from 'react-native-safe-area-context'
import Data from '../handlers/handlerData'
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import Button from '../components/Button'

const styles = StylesHome

type RootStackParamList = {
  Home: { token: string; name: string }
}

export default function Home() {
  const navigation = useNavigation()
  const [tokensRecords, setTokensRecords] = useState([])
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>()
  const { name = null, token = null } = route.params || {}
  useEffect(() => {
    const fetchTokensRecords = async () => {
      try {
        const [records] = await GetMedtoken()
        const formatTokensRecords = records
          .filter(
            (record) => record.date === Data(true) && record.status === false,
          )
          .map((record) => {
            let color = 'black'
            switch (record.prioridade) {
              case 'SP':
                color = '#F97068'
                break
              case 'SE':
                color = '#5B6C9A'
                break
              case 'SG':
                color = '#444545'
                break
            }
            return [record.token, color, record.id, record.status]
          })
          .reverse()
          .slice(0, 3)

        setTokensRecords(formatTokensRecords)
      } catch (error) {
        console.error('Error fetching tokens records:', error)
      }
    }
    fetchTokensRecords()
    const interval = setInterval(fetchTokensRecords, 5000)
    return () => clearInterval(interval)
  }, [])
  const handlerReturn = () => {
    navigation.navigate('Form')
  }
  const handlerRelatorio = () => {
    navigation.navigate('Relatorio')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerHome}>
        <Logo />
        <View style={styles.recordsContainer}>
          {name === null ? (
            <Text style={styles.title}>Olá, Convidado!</Text>
          ) : (
            <View style={styles.welcome}>
              <Text style={styles.title}>Olá, {name}</Text>
              <Text style={styles.title}>Seu Token:</Text>
            </View>
          )}
        </View>
        {token === null ? (
          <Button title="Obter Token" onPress={handlerReturn} />
        ) : (
          <Token idToken={token?.toString()} color="black" />
        )}
      </View>
      <View style={styles.lineConteiner}>
        <Line />
      </View>
      <View style={styles.recordsContainer}>
        <Text style={[styles.title, styles.titleRecords]}>
          Histórico de Solicitações
        </Text>
        <View style={styles.records}>
          {tokensRecords.map((token, index) => (
            <Token key={index} idToken={token[0]} color={token[1]} />
          ))}

          <View style={styles.relatorioContainer}>
            <Button title={'Relatorio'} onPress={handlerRelatorio} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
