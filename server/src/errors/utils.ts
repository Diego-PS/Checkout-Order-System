export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const getMessageFromErrorType = (errorType: string) => {
  const lowercaseMessage = errorType
    .split('_')
    .map((word) => word.toLowerCase())
    .join(' ')
  return capitalizeFirstLetter(lowercaseMessage)
}
