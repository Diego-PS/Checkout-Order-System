import { useEffect, useState } from 'react'
import { getHelloMessage } from '@api'

export const HomePage = () => {
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
        <h1 className="font-imperial text-3xl">{helloMessage}</h1>
      </div>
    </>
  )
}
