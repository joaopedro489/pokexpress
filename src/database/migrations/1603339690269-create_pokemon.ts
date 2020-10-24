import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPokemon1603339690269 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table ({
            name: "pokemon",
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
                    name:'atk',
                    type:'integer'
                },
                {
                    name:'hp',
                    type:'integer'
                },
                {
                    name:'speed',
                    type:'integer'
                }
            ]
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pokemon');
    }

}
