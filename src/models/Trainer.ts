import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import Item from './Item';
import Pokemon from './Pokemon';
import { Length, IsAlpha } from 'class-validator';

@Entity('trainers')
export default class  Trainer {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    @Length(5, 20)
    name: string;
    @Column()
    @IsAlpha()
    region: string;
    @Column()
    password: string;
    @ManyToMany(() => Item)
    @JoinTable()
    items: Item[];
    @OneToOne(() => Trainer)
    @JoinColumn()
    trainer: Trainer;
    @ManyToMany(() => Pokemon)
    @JoinTable()
    pokemon: Pokemon[];
    @ManyToOne(() => Pokemon, pokemon => pokemon.trainers)
    favoritePokemon: Pokemon;
}
