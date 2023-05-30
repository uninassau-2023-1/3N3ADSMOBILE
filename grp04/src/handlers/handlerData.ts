export default function Data(signal: boolean) {
  const dataAtual = new Date()
  const day = ('0' + dataAtual.getDate()).slice(-2)
  const month = ('0' + (dataAtual.getMonth() + 1)).slice(-2)
  const year = dataAtual.getFullYear()

  if (signal) {
    return `${day}/${month}/${year}`
  } else {
    return `${day}${month}${year}`
  }
}
