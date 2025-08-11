import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { KeyPress } from "./keyboard/entities/key-press.entity"
import { KeyboardModule } from "./keyboard/keyboard.module"


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [KeyPress],
      synchronize: true, // Only for dev, auto-creates tables
      logging: ["error", "warn"],
      autoLoadEntities: true,
    }),
    KeyboardModule
  ],
})
export class AppModule {}
