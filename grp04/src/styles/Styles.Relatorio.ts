import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infosContainer: {
    justifyContent: 'space-around',
    width: '95%',
    height: '80%',
  },
  titleContainer: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    color: 'white',
  },
  statsContainer: {
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgb(216, 206, 206)',
    borderRadius: 15,
    height: '50%',
    margin: 10,
    marginTop: 20,
    gap: 9,
  },
  stats: {
    fontSize: 20,
    color: 'white',
  },
})
