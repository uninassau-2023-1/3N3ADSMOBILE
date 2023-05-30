import GetMedtoken from '../services/GetMedtoken'
import Data from '../handlers/handlerData'
import HandlerPrioridade from '../handlers/handlerPrioridade'

const TokenIDCreate = async (tipoFicha) => {
  try {
    const [data] = await GetMedtoken()
    const tokenToday = data.filter(
      (item: { date: string; prioridade: string }) =>
        item.date === Data(true) &&
        item.prioridade === HandlerPrioridade(tipoFicha),
    )

    const id = tokenToday.length + 1
    let newToken = ''

    if (tokenToday.length < 9) {
      newToken = `${Data(false)}${HandlerPrioridade(tipoFicha)}0${id}`
    } else {
      newToken = `${Data(false)}${HandlerPrioridade(tipoFicha)}${id}`
    }
    return newToken
  } catch (err) {
    console.error('ERROR TOKENIDCREATE:' + err)
    return err
  }
}
export default TokenIDCreate
