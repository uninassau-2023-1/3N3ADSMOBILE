import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerHome: {
    width: '100%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  recordsContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    marginBottom: 8,
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    gap: 5,
  },
  titleRecords: {
    margin: '5%',
  },
  records: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  lineConteiner: {
    width: '100%',
    height: '8%',
  },
  relatorioContainer: {
    alignSelf: 'center',
    position: 'relative',
    bottom: 20,
  },
  welcome: {
    height: 80,
    alignItems: 'center',
  },
})
