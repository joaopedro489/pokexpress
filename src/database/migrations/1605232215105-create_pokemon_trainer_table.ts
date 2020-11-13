import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createPokemonTrainerTable1605232215105 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable( new Table ({
			name: "pokemon_trainer",
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
					name:'pokemonId',
					type:'integer',
					unsigned: true,
				},
				{
					name:"trainerId",
					type: 'integer',
					unsigned: true
				}
			]
		}));
		await queryRunner.createForeignKey("pokemon_trainer", new TableForeignKey({
			columnNames: ["pokemonId"],
			referencedColumnNames: ["id"],
			referencedTableName: "pokemon",
			onDelete: "CASCADE"
		}));
		await queryRunner.createForeignKey("pokemon_trainer", new TableForeignKey({
			columnNames: ["trainerId"],
			referencedColumnNames: ["id"],
			referencedTableName: "trainers",
			onDelete: "CASCADE"
		}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('pokemon_trainer');
	}

}
