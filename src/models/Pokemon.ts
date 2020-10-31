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
    @IsPositive()
    atk: number;
    @Column()
    @IsPositive()
    hp: number;
    @Column()
    @IsPositive()
    speed: number;
    @OneToMany(() => Trainer, trainer => trainer.favoritePokemon)
    trainers: Trainer[];
}
