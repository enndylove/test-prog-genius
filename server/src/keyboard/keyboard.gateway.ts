import {
  WebSocketGateway,
  SubscribeMessage,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
  WebSocketServer,
} from "@nestjs/websockets"
import type { Server, Socket } from "socket.io"
import type { KeyboardService } from "./keyboard.service"
import { DEV_CLIENT_IP_URL, DEV_CLIENT_URL } from "src/constants/dev.constants"

@WebSocketGateway({
  cors: {
    origin: [DEV_CLIENT_URL, DEV_CLIENT_IP_URL],
    credentials: true,
  },
})
export class KeyboardGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server

  constructor(private readonly keyboardService: KeyboardService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`)
    // Send initial statistics to newly connected client
    this.sendStatistics(client)
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`)
  }

  @SubscribeMessage("keyPress")
  async handleKeyPress(client: Socket, data: { key: string; timestamp: number }) {
    try {
      // Save key press to database
      await this.keyboardService.saveKeyPress(data.key, data.timestamp)

      // Get updated statistics
      const stats = await this.keyboardService.getStatistics()

      // Broadcast updated statistics to all connected clients
      this.server.emit("statisticsUpdate", stats)

      return { success: true }
    } catch (error: any) {
      console.error("Error handling key press:", error)
      return { success: false, error: error.message }
    }
  }

  @SubscribeMessage("getStatistics")
  async handleGetStatistics(client: Socket) {
    await this.sendStatistics(client)
  }

  @SubscribeMessage("clearStatistics")
  async handleClearStatistics(client: Socket) {
    try {
      await this.keyboardService.clearAllStatistics()
      const stats = await this.keyboardService.getStatistics()
      this.server.emit("statisticsUpdate", stats)
      return { success: true }
    } catch (error: any) {
      console.error("Error clearing statistics:", error)
      return { success: false, error: error.message }
    }
  }

  private async sendStatistics(client: Socket) {
    try {
      const stats = await this.keyboardService.getStatistics()
      client.emit("statisticsUpdate", stats)
    } catch (error) {
      console.error("Error sending statistics:", error)
    }
  }
}
