import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
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
	@Column()
	photo: string;
    @OneToMany(() => Trainer, trainer => trainer.favoritePokemon,{ onDelete: 'SET NULL' })
    master: Trainer[];
	@ManyToMany(() => Trainer, trainer => trainer.pokemon, { onDelete: 'CASCADE' })
    trainer: Trainer[];
}
