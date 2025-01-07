import { useEffect, useState } from 'react'
import { getHelloMessage } from '@api'

export const App = () => {
  const [helloMessage, setHelloMessage] = useState<string>('')

  const getMessage = async () => {
    try {
      const message = await getHelloMessage()
      setHelloMessage(message)
    } catch (error) {
      console.error('Could not retrieve hello message', error)
    }
  }

  useEffect(() => {
    getMessage()
  }, [])

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <h1>{helloMessage}</h1>
      </div>
    </>
  )
}
