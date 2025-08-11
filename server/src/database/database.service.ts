import { Injectable, type OnModuleInit } from "@nestjs/common"
import type { Repository } from "typeorm"

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly keyPressRepository: Repository<any> // @TODO: key-press.entity

  constructor(keyPressRepository: Repository<any>) { // @TODO: key-press.entity
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
