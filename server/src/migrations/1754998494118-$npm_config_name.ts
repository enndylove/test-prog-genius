import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1754998494118 implements MigrationInterface {
    name = ' $npmConfigName1754998494118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "key_presses" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b852a57e22c93166f0cce4c8e21" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "key_presses"`);
    }

}
