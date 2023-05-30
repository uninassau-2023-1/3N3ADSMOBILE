import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    minWidth: '100%',
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  form: {
    padding: '10%',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: '10%',
    marginTop: '10%',
    height: 325,
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    width: 250,
    fontSize: 15,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 19,
    justifyContent: 'center',
    color: 'black',
  },
  tipoAtendimentoContainer: {
    marginVertical: 20,
  },
  optionContainer: {
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    color: '#fff',
    fontSize: 30,
  },
  label: {
    color: 'white',
    fontSize: 17,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  logo: {
    position: 'relative',
    bottom: 5,
    alignSelf: 'center',
    width: 40,
    height: 40,
  },
  btnStyle: {
    backgroundColor: '#fff',
    padding: 5,
    width: 80,
    height: 28,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
  textBtn: {
    color: '#4F4343',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedButton: {
    backgroundColor: 'rgb(122, 62, 62)',
  },
  selectedButtonText: {
    color: 'white',
  },
  inputError: {
    borderColor: 'rgb(131, 38, 38)',
    borderWidth: 2,
  },
})
