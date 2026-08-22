import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialPortfolioSchema1755840000000 implements MigrationInterface {
  name = 'InitialPortfolioSchema1755840000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(
      `CREATE TYPE "public"."skill_category_enum" AS ENUM ('Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."project_status_enum" AS ENUM ('PLANNING', 'IN_PROGRESS', 'COMPLETED', 'MAINTENANCE', 'ARCHIVED')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."employment_type_enum" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."contact_status_enum" AS ENUM ('NEW', 'READ', 'REPLIED', 'ARCHIVED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying(150) NOT NULL, "headline" character varying(200) NOT NULL, "bio" text NOT NULL, "shortBio" text NOT NULL, "profileImage" character varying, "location" character varying(120), "email" character varying(180) NOT NULL, "phone" character varying(40), "resumeUrl" character varying, "availabilityStatus" character varying NOT NULL DEFAULT 'AVAILABLE', CONSTRAINT "UQ_profiles_email" UNIQUE ("email"), CONSTRAINT "PK_profiles" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(120) NOT NULL, "category" "public"."skill_category_enum" NOT NULL, "proficiency" smallint NOT NULL DEFAULT '0', "yearsOfExperience" numeric(4,1) NOT NULL DEFAULT '0', "icon" character varying, "description" text, "displayOrder" integer NOT NULL DEFAULT '0', "isFeatured" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_skills" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_skills_category" ON "skills" ("category")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_skills_displayOrder" ON "skills" ("displayOrder")`,
    );
    await queryRunner.query(
      `CREATE TABLE "technologies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(120) NOT NULL, "category" character varying(120), "icon" character varying, CONSTRAINT "UQ_technologies_name" UNIQUE ("name"), CONSTRAINT "PK_technologies" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(180) NOT NULL, "slug" character varying(220) NOT NULL, "shortDescription" text NOT NULL, "description" text NOT NULL, "image" character varying, "githubUrl" character varying, "liveUrl" character varying, "featured" boolean NOT NULL DEFAULT false, "status" "public"."project_status_enum" NOT NULL DEFAULT 'PLANNING', "displayOrder" integer NOT NULL DEFAULT '0', "startDate" date, "endDate" date, CONSTRAINT "UQ_projects_slug" UNIQUE ("slug"), CONSTRAINT "PK_projects" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_projects_featured" ON "projects" ("featured")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_projects_displayOrder" ON "projects" ("displayOrder")`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_technologies" ("projectsId" uuid NOT NULL, "technologiesId" uuid NOT NULL, CONSTRAINT "PK_project_technologies" PRIMARY KEY ("projectsId", "technologiesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_project_technologies_projectsId" ON "project_technologies" ("projectsId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_project_technologies_technologiesId" ON "project_technologies" ("technologiesId")`,
    );
    await queryRunner.query(
      `CREATE TABLE "experiences" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "company" character varying(180) NOT NULL, "position" character varying(180) NOT NULL, "description" text NOT NULL, "location" character varying, "employmentType" "public"."employment_type_enum" NOT NULL DEFAULT 'FULL_TIME', "startDate" date NOT NULL, "endDate" date, "isCurrent" boolean NOT NULL DEFAULT false, "displayOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_experiences" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_experiences_startDate" ON "experiences" ("startDate")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_experiences_isCurrent" ON "experiences" ("isCurrent")`,
    );
    await queryRunner.query(
      `CREATE TABLE "education" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "institution" character varying(180) NOT NULL, "degree" character varying(180) NOT NULL, "fieldOfStudy" character varying(180), "description" text, "location" character varying, "startDate" date, "endDate" date, "isCurrent" boolean NOT NULL DEFAULT false, "displayOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_education" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "certifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(180) NOT NULL, "issuer" character varying(180) NOT NULL, "description" text, "issueDate" date, "expirationDate" date, "credentialId" character varying, "credentialUrl" character varying, "image" character varying, "displayOrder" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_certifications" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "social_links" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "platform" character varying(80) NOT NULL, "url" character varying(255) NOT NULL, "username" character varying(120), "icon" character varying, "displayOrder" integer NOT NULL DEFAULT '0', "isVisible" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_social_links" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(180) NOT NULL, "description" text NOT NULL, "icon" character varying, "displayOrder" integer NOT NULL DEFAULT '0', "isFeatured" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_services" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact_messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(120) NOT NULL, "email" character varying(180) NOT NULL, "subject" character varying(180), "message" text NOT NULL, "status" "public"."contact_status_enum" NOT NULL DEFAULT 'NEW', CONSTRAINT "PK_contact_messages" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_contact_messages_status" ON "contact_messages" ("status")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_contact_messages_createdAt" ON "contact_messages" ("createdAt")`,
    );
    await queryRunner.query(
      `CREATE TABLE "assets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(180) NOT NULL, "url" character varying(255) NOT NULL, "type" character varying(80) NOT NULL, "altText" character varying, "description" text, CONSTRAINT "PK_assets" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "portfolio_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "key" character varying(120) NOT NULL, "value" text NOT NULL, CONSTRAINT "UQ_portfolio_settings_key" UNIQUE ("key"), CONSTRAINT "PK_portfolio_settings" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_technologies" ADD CONSTRAINT "FK_project_technologies_projects" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_technologies" ADD CONSTRAINT "FK_project_technologies_technologies" FOREIGN KEY ("technologiesId") REFERENCES "technologies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_technologies" DROP CONSTRAINT "FK_project_technologies_technologies"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_technologies" DROP CONSTRAINT "FK_project_technologies_projects"`,
    );
    await queryRunner.query(`DROP TABLE "portfolio_settings"`);
    await queryRunner.query(`DROP TABLE "assets"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_contact_messages_createdAt"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_contact_messages_status"`,
    );
    await queryRunner.query(`DROP TABLE "contact_messages"`);
    await queryRunner.query(`DROP TABLE "services"`);
    await queryRunner.query(`DROP TABLE "social_links"`);
    await queryRunner.query(`DROP TABLE "certifications"`);
    await queryRunner.query(`DROP TABLE "education"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_experiences_isCurrent"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_experiences_startDate"`);
    await queryRunner.query(`DROP TABLE "experiences"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_project_technologies_technologiesId"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_project_technologies_projectsId"`,
    );
    await queryRunner.query(`DROP TABLE "project_technologies"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_projects_displayOrder"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_projects_featured"`);
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`DROP TABLE "technologies"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_skills_displayOrder"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_skills_category"`);
    await queryRunner.query(`DROP TABLE "skills"`);
    await queryRunner.query(`DROP TABLE "profiles"`);
    await queryRunner.query(`DROP TYPE "public"."contact_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."employment_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."project_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."skill_category_enum"`);
  }
}
