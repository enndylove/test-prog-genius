import { useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketInstance = io(url, {
      transports: ["websocket"],
    })

    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket server")
      setIsConnected(true)
    })

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from WebSocket server")
      setIsConnected(false)
    })

    socketInstance.on("connect_error", (error: Error) => {
      console.error("WebSocket connection error:", error)
      setIsConnected(false)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [url])

  return { socket, isConnected }
}
