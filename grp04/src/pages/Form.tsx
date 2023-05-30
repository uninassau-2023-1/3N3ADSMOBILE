/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
// Dependencias
import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  Image,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  Animated,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Componentes
import Button from '../components/Button'
import StylesForm from '../styles/Styles.Form'
import TokenData from '../models/Model.Token'

// Handlers
import Data from '../handlers/handlerData'

import TokenIDCreate from '../handlers/tokenIDCreate'
import handlerPrioridade from '../handlers/handlerPrioridade'
import SetMedtoken from '../services/SetMedtoken'

const styles = StylesForm

export default function Form() {
  const [loading, setIsLoading] = useState(false)
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [token, setToken] = useState('')
  const [tipoToken, setTipoToken] = useState('')
  const [selectedButton, setSelectedButton] = useState('')
  const [isNameEmpty, setIsNameEmpty] = useState(false)
  const [shakeAnimation] = useState(new Animated.Value(0))
  useEffect(() => {
    if (isNameEmpty) {
      startShakeAnimation()
    }
  }, [isNameEmpty])

  const startShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()
  }
  const handlerButton = async () => {
    try {
      setIsLoading(true)
      startShakeAnimation()

      if (!name) {
        setIsLoading(false)
        setIsNameEmpty(true)
        return
      }

      if (!tipoToken) {
        console.error('Tipo de atendimento não foi selecionado')
        setIsLoading(false)
        return
      }
      const token = await TokenIDCreate(tipoToken)
      setToken(token)
      navigation.navigate('Home', { token, name })

      const prioridade = handlerPrioridade(tipoToken)
      const date = Data(true)

      const dados: TokenData = {
        token,
        name,
        date,
        prioridade,
      }

      await SetMedtoken(dados)
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    } catch (err) {
      console.error('ERROR FORMS:' + err)
    }
  }

  const handleNameChange = (text: React.SetStateAction<string>) => {
    setName(text)
    setIsNameEmpty(false)
  }

  const handleOption = (value) => {
    setTipoToken(value)
    setSelectedButton(value)
  }

  const handlerButtonHome = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#293645" />
      <Text style={styles.title}> Solicitação de Token </Text>
      <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={0}>
        <View style={styles.form}>
          <Animated.View>
            <Text style={styles.label}>Primeiro Nome:</Text>
            <Animated.View
              style={[
                styles.input,
                isNameEmpty && styles.inputError,
                { transform: [{ translateX: shakeAnimation }] },
              ]}
            >
              <TextInput
                placeholderTextColor="#7E998D"
                autoComplete="name"
                autoCapitalize="words"
                placeholder="Digite seu nome aqui"
                onChangeText={handleNameChange}
                onBlur={() => {
                  setIsNameEmpty(name.trim().length === 0)
                }}
              />
            </Animated.View>
            <Animated.View>
              <View style={styles.tipoAtendimentoContainer}>
                <Text style={styles.label}>Opção de Atendimento:</Text>
                <View style={styles.optionContainer}>
                  <TouchableOpacity
                    style={[
                      styles.btnStyle,
                      selectedButton === 'Exame' && styles.selectedButton,
                    ]}
                    onPress={() => handleOption('Exame')}
                  >
                    <Text
                      style={[
                        styles.textBtn,
                        selectedButton === 'Exame' && styles.selectedButtonText,
                      ]}
                    >
                      Exame
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.btnStyle,
                      selectedButton === 'Geral' && styles.selectedButton,
                    ]}
                    onPress={() => handleOption('Geral')}
                  >
                    <Text
                      style={[
                        styles.textBtn,
                        selectedButton === 'Geral' && styles.selectedButtonText,
                      ]}
                    >
                      Geral
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.btnStyle,
                      selectedButton === 'Preferencial' &&
                        styles.selectedButton,
                    ]}
                    onPress={() => handleOption('Preferencial')}
                  >
                    <Text
                      style={[
                        styles.textBtn,
                        selectedButton === 'Preferencial' &&
                          styles.selectedButtonText,
                      ]}
                    >
                      Preferencial
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
            <Button
              title={'Solicitar Token'}
              isLoading={loading}
              onPress={handlerButton}
            />
          </Animated.View>
        </View>
        <Image
          source={require('../../assets/images/logo-ofc.png')}
          style={styles.logo}
        />
        <Button
          isLoading={loading}
          title={'Convidado'}
          onPress={handlerButtonHome}
        />
      </KeyboardAvoidingView>
    </View>
  )
}
