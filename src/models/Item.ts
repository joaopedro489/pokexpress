import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { IsPositive, IsAlpha } from 'class-validator';
import Trainer from './Trainer';
@Entity('items')
export default class  Item {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    @IsAlpha()
    name: string;
    @Column()
    @IsPositive()
    price: number;
    @ManyToMany(() => Trainer, trainer => trainer.items, { onDelete: 'CASCADE' })
    trainers: Trainer[];
}
