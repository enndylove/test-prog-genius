import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity("key_presses")
export class KeyPress {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  key!: string

  @Column({ type: "timestamp" })
  timestamp!: Date

  @CreateDateColumn()
  createdAt!: Date
}
