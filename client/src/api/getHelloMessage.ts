import { config } from '@config'

export const getHelloMessage = async (): Promise<string> => {
  const response = await fetch(config.apiUrl)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data: { message: string } = await response.json()

  return data.message
}
