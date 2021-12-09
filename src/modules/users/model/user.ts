import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import Profile from './profile';
import Post from '@modules/posts/model/post';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({
        name: 'is_active'
    })
    isActive: boolean;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;

    @OneToOne(() => Profile, profile => profile.user, {
        eager: true,
        cascade: true
    })
    @JoinColumn({
        name: 'profile_id',
    })
    profile: Profile;

    @OneToMany(() => Post, post => post.user)
    posts: Post[]
}