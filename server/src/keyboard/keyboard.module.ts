import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { KeyboardGateway } from "./keyboard.gateway"
import { KeyboardService } from "./keyboard.service"
import { KeyboardController } from "./keyboard.controller"
import { KeyPress } from "./entities/key-press.entity"

@Module({
  imports: [TypeOrmModule.forFeature([KeyPress])],
  providers: [KeyboardGateway, KeyboardService],
  controllers: [KeyboardController],
})
export class KeyboardModule {}
