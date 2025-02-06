import { Migration } from '@mikro-orm/migrations';

export class Migration20250206074418 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table \`User\` (\`id\` integer not null primary key autoincrement, \`createdAt\` datetime null, \`updatedAt\` datetime null, \`name\` text not null, \`age\` integer not null);`,
    );
    this.addSql(`create index \`User_age_index\` on \`User\` (\`age\`);`);

    this.addSql(
      `create table \`Post\` (\`id\` integer not null primary key autoincrement, \`createdAt\` datetime null, \`updatedAt\` datetime null, \`title\` text not null, \`content\` text not null, \`userId\` integer not null, constraint \`Post_userId_foreign\` foreign key(\`userId\`) references \`User\`(\`id\`) on update cascade);`,
    );
    this.addSql(`create index \`Post_userId_index\` on \`Post\` (\`userId\`);`);
  }
}
