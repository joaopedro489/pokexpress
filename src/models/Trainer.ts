import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import Item from './Item';
import Pokemon from './Pokemon';
import { Length, IsAlpha, IsEmail } from 'class-validator';

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
    @ManyToMany(() => Item)
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
    @ManyToMany(() => Pokemon)
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
    favoritePokemon: Pokemon;
}
