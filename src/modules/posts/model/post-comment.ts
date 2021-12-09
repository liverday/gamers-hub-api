import Post from '@modules/posts/model/post'
import User from '@modules/users/model/user';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity('post_comments')
export default class PostComment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Post, post => post.comments)
    post: Post;

    @OneToOne(() => User)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user: User;

    @Column()
    content: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
