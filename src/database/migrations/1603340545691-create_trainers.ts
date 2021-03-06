import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTrainers1603340545691 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table ({
            name: "trainers",
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
				{
                    name: 'email',
                    type: 'varchar',
					isUnique: true
                },
                {
                    name:'region',
                    type:'varchar'
                },
                {
                    name:'password',
                    type:'varchar'
                },
				{
					name:"photo",
					type: 'varchar',
					isNullable: true
				},
				{
					name:"file",
					type: 'varchar',
					isNullable: true
				},
				{
					name:"trainerId",
					type: 'integer',
					isNullable: true,
					unsigned: true
				},
				{
					name:'favoritePokemonId',
					type:'integer',
					isNullable: true,
					unsigned: true
				}
            ]
        }));
		await queryRunner.createForeignKey("trainers", new TableForeignKey({
			columnNames: ["favoritePokemonId"],
			referencedColumnNames: ["id"],
			referencedTableName: "pokemon",
			onDelete: "SET NULL"
		}));
		await queryRunner.createForeignKey("trainers", new TableForeignKey({
			columnNames: ["trainerId"],
			referencedColumnNames: ["id"],
			referencedTableName: "trainers",
			onDelete: "SET NULL"
		}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('trainers');
    }

}
