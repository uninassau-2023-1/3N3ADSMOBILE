const GetMedtoken = async () => {
  try {
    const response = await fetch('https://medtoken-api.onrender.com/')
    if (response.ok) {
      const data = await response.json()
      const tokens = data.tokens || []
      return [tokens]
    } else {
      console.error('Error GET:', response.status)
      return []
    }
  } catch (err) {
    console.log('ERROR TOKENFORMS:' + err)
  }
}

export default GetMedtoken
