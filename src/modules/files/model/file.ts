import Post from '@modules/posts/model/post';
import { Exclude } from 'class-transformer';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity('files')
export default class File {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
        name: 'file_name'
    })
    fileName: string;

    @Column()
    @Exclude()
    path: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToMany(() => Post, post => post.files)
    @JoinTable({
        name: 'post_files',
        joinColumn: {
            name: 'file_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'post_id',
            referencedColumnName: 'id'
        }
    })
    posts: Post[];
}