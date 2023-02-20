import { MigrationInterface, QueryRunner } from "typeorm";

export class newMigration1676496494721 implements MigrationInterface {
    name = 'newMigration1676496494721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying, "password" character varying NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" integer NOT NULL DEFAULT '32', "updatedAt" integer NOT NULL DEFAULT '5', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
