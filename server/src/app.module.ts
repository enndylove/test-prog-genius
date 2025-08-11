import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      // @TODO: entities: [KeyPress]
      synchronize: true, // Only for dev, auto-creates tables
      logging: ["error", "warn"],
      autoLoadEntities: true,
    }),
    // @TODO: init KeyboardModule
  ],
})
export class AppModule {}
