import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Trainer from './Trainer';
import { IsPositive, IsAlpha } from 'class-validator';

@Entity('pokemon')
export default class  Pokemon {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    @IsAlpha()
    name: string;
    @Column()
    atk: number;
    @Column()
    hp: number;
    @Column()
    speed: number;
    @OneToMany(() => Trainer, trainer => trainer.favoritePokemon)
    trainers: Trainer[];
}
