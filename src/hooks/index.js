import { useEffect, useState } from 'react'

const useKey = (key) => {
  // Keep track of key state
  const [pressed, setPressed] = useState(false)

  // Does an event match the key we're watching?
  const match = (event) => key.toLowerCase() == event.key.toLowerCase()

  // Event handlers
  const onDown = (event) => {
    if (match(event)) setPressed(true)
  }

  const onUp = (event) => {
    if (match(event)) setPressed(false)
  }

  // Bind and unbind events
  useEffect(() => {
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  }, [key])

  return pressed
}

export { useKey }
