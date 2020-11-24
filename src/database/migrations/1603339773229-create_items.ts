import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createItems1603339773229 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table ({
            name: "items",
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
                    name:'price',
                    type:'double'
                },
				{
					name:"photo",
					type: 'varchar',
					isNullable: true
				}
            ]
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('items');
    }


}
