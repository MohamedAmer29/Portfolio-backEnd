import { MigrationInterface, QueryRunner } from 'typeorm';

export class SyncSchema1787410578629 implements MigrationInterface {
  name = 'SyncSchema1787410578629';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."contact_messages_emailstatus_enum" AS ENUM('PENDING', 'SENT', 'FAILED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_messages" ADD "emailStatus" "public"."contact_messages_emailstatus_enum" NOT NULL DEFAULT 'PENDING'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact_messages" DROP COLUMN IF EXISTS "emailStatus"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."contact_messages_emailstatus_enum"`,
    );
  }
}
