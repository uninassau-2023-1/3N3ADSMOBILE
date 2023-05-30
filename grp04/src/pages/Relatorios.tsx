import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Data from '../handlers/handlerData'
import GetMedtoken from '../services/GetMedtoken'
import { GetMonth, GetYear } from '../handlers/filtrosRelatorios'
import StylesRelatorio from '../styles/Styles.Relatorio'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import Logo from '../components/Logo'

const styles = StylesRelatorio

export default function Relatorio() {
  const navigation = useNavigation()
  const [tokensRecords, setTokensRecords] = useState([])
  const [tokensToday, setTokensToday] = useState([])
  const [tokensMouth, setTokensMouth] = useState([])
  const [tokensYear, setTokensYear] = useState([])

  useEffect(() => {
    const fetchTokensRecords = async () => {
      try {
        const currentDate = new Date()
        const [records] = await GetMedtoken()
        setTokensRecords(records.filter((record) => record.date))
        setTokensToday(records.filter((record) => record.date === Data(true)))
        setTokensMouth(
          records.map(
            (record) =>
              GetYear(record.date) === currentDate.getMonth() &&
              record.preferencia,
          ),
        )
        const years = records
          .filter((record) => GetMonth(record.date) === currentDate.getMonth())
          .map((record) => {
            return [record.date, record.prioridade]
          })

        setTokensYear(years)
      } catch (error) {
        console.error('Error fetching tokens records:', error)
      }
    }
    fetchTokensRecords()
  }, [])
  const handlerVoltar = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.infosContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Relatórios</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>
            Registros hoje ({new Date().getDate()}): {tokensToday.length}
          </Text>
          <Text style={styles.stats}>
            Registros esse mês ({new Date().getMonth()}): {tokensMouth.length}
          </Text>
          <Text style={styles.stats}>
            Registros neste ano ({new Date().getFullYear()}):{' '}
            {tokensYear.length}
          </Text>
          <Text style={styles.stats}>
            Registros gerais: {tokensRecords.length}
          </Text>
        </View>
        <Button title={'Voltar'} onPress={handlerVoltar} />
      </View>
    </View>
  )
}
