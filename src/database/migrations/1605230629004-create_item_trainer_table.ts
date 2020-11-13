import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createItemTrainerTable1605230629004 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable( new Table ({
			name: "item_trainer",
			columns: [
				{
					name: 'id',
					type: 'integer',
					unsigned: true,
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'itemId',
					type: 'integer',
					unsigned: true
				},
				{
					name:"trainerId",
					type: 'integer',
					unsigned: true
				}
			]
		}));
		await queryRunner.createForeignKey("item_trainer", new TableForeignKey({
            columnNames: ["itemId"],
            referencedColumnNames: ["id"],
            referencedTableName: "items",
            onDelete: "CASCADE"
        }));
		await queryRunner.createForeignKey("item_trainer", new TableForeignKey({
			columnNames: ["trainerId"],
			referencedColumnNames: ["id"],
			referencedTableName: "trainers",
			onDelete: "CASCADE"
		}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('item_trainer');
	}

}
