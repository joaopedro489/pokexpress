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
	@Column()
	photo: string;
    @ManyToMany(() => Trainer, trainer => trainer.items)
    trainers: Trainer[];
	cascade: ['insert','update', 'remove'];
}
