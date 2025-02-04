import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1738731192790 implements MigrationInterface {
    name = 'Migration1738731192790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL DEFAULT (''), "age" integer NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')), "updatedAt" datetime NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')))`);
        await queryRunner.query(`CREATE INDEX "IDX_1f457efff42e9e3d54598c4bd8" ON "user" ("age") `);
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL DEFAULT (''), "content" text NOT NULL DEFAULT (''), "createdAt" datetime NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')), "updatedAt" datetime NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')), "userId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL DEFAULT (''), "content" text NOT NULL DEFAULT (''), "createdAt" datetime NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')), "updatedAt" datetime NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')), "userId" integer NOT NULL, CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_post"("id", "title", "content", "createdAt", "updatedAt", "userId") SELECT "id", "title", "content", "createdAt", "updatedAt", "userId" FROM "post"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL DEFAULT (''), "content" text NOT NULL DEFAULT (''), "createdAt" datetime NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')), "updatedAt" datetime NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')), "userId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "post"("id", "title", "content", "createdAt", "updatedAt", "userId") SELECT "id", "title", "content", "createdAt", "updatedAt", "userId" FROM "temporary_post"`);
        await queryRunner.query(`DROP TABLE "temporary_post"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP INDEX "IDX_1f457efff42e9e3d54598c4bd8"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
