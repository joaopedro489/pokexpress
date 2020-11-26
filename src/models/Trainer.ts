import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne, BeforeInsert } from 'typeorm';
import Item from './Item';
import Pokemon from './Pokemon';
import { Length, IsAlpha, IsEmail } from 'class-validator';
import bcrypt from "bcrypt";

@Entity('trainers')
export default class  Trainer {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    @Length(5, 20)
    name: string;
	@Column()
	@IsEmail()
	email: string;
    @Column()
    @IsAlpha()
    region: string;
    @Column()
    password: string;
	@Column()
	photo: string;
	@Column()
	file: string;
    @ManyToMany(() => Item, { onDelete: 'CASCADE' })
    @JoinTable({ name: "item_trainer", joinColumn:{
            name: 'trainerId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'itemId',
            referencedColumnName: 'id'
        }
	})
    items: Item[];
    @OneToOne(() => Trainer)
    @JoinColumn()
    trainer: Trainer;
    @ManyToMany(() => Pokemon, { onDelete: 'CASCADE' })
    @JoinTable({ name: "pokemon_trainer", joinColumn: {
            name: 'trainerId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'pokemonId',
            referencedColumnName: 'id'
        }})
    pokemon: Pokemon[];
    @ManyToOne(() => Pokemon, pokemon => pokemon.trainer)
    favoritePokemon: Pokemon | null;
	@BeforeInsert()
   	async hashPassword(){
	   this.password = await bcrypt.hash(this.password, 12);
   	}
}
