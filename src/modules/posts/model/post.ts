import User from '@modules/users/model/user';
import PostComment from './post-comment';
import File from '@modules/files/model/file'
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, RelationId, JoinColumn } from 'typeorm';

@Entity('posts')
export default class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.posts, {
        eager: true
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => PostComment, comment => comment.post, {
        eager: true
    })
    comments: PostComment[];

    @Column()
    title: string;

    @Column()
    content: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToMany(() => File, file => file.posts, {
        eager: true
    })
    @JoinTable({
        name: 'post_files',
        joinColumn: {
            name: 'post_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'file_id',
            referencedColumnName: 'id'
        }
    })
    files: File[];
}