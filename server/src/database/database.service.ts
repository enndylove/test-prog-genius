import { Injectable, type OnModuleInit } from "@nestjs/common"
import type { Repository } from "typeorm"
import type { KeyPress } from "../keyboard/entities/key-press.entity"

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly keyPressRepository: Repository<KeyPress>

  constructor(keyPressRepository: Repository<KeyPress>) {
    this.keyPressRepository = keyPressRepository
  }

  async onModuleInit() {
    try {
      await this.keyPressRepository.query("SELECT 1")
      console.log("Database connection established successfully")
    } catch (error) {
      console.error("Database connection failed:", error)
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.keyPressRepository.query("SELECT 1")
      return true
    } catch (error) {
      console.error("Database health check failed:", error)
      return false
    }
  }
}
