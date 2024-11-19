import { Beach } from "src/beachs/models/beachs.models";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @OneToMany(() => Beach, (beach) => beach.user)
    beachs: Beach[];

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}