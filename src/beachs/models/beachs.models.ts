import { User } from "src/users/models/users.models";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['latitude', 'longitude'])
export class Beach {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 6 })
    latitude: number;

    @Column('decimal', { precision: 10, scale: 6 })
    longitude: number;

    @Column()
    description: string;

    @Column()
    lifeguard: boolean;

    @ManyToOne(() => User, (user) => user.beachs, { onDelete: 'CASCADE' })
    user: User;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}