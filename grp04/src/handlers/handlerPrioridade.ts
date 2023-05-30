export default function HandlerPrioridade(tipoToken: string) {
  switch (tipoToken) {
    case 'Preferencial':
      return 'SP'
    case 'Geral':
      return 'SG'
    case 'Exame':
      return 'SE'
  }
}
