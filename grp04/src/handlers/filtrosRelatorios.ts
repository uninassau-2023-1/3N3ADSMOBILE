export function GetMonth(records) {
  const parts = records.split('/')
  const date = new Date(parts[2], parts[1] - 1, parts[0])
  return date.getMonth()
}

export function GetYear(records) {
  const parts = records.split('/')
  const date = new Date(parts[2], parts[1] - 1, parts[0])
  return date.getFullYear()
}
