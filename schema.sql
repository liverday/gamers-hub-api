create extension if not exists "uuid-ossp";

drop table if exists user_followers;
drop table if exists user_games;
drop table if exists game_tags;
drop table if exists games;
drop table if exists post_comment_likes;
drop table if exists post_comments;
drop table if exists post_likes;
drop table if exists post_files;
drop table if exists posts;
drop table if exists files;
drop table if exists users;
drop table if exists profiles;
drop table if exists countries;

create table countries (
	id uuid not null default uuid_generate_v4() primary key,
	iso_code varchar not null,
	flag_url varchar
);

create table games (
	id uuid not null default uuid_generate_v4() primary key,
	name varchar not null,
	description varchar not null
);

create table game_tags (
	id uuid not null default uuid_generate_v4() primary key,
	game_id uuid not null references games(id),
	tag varchar
);

create table profiles (
	id uuid not null default uuid_generate_v4() primary key,
	first_name varchar not null,
	last_name varchar not null,
	gender char(1) not null,
	bio varchar,
	created_at timestamp not null default now(),
	updated_at timestamp not null default now()
);

create table users (
	id uuid not null default uuid_generate_v4() primary key,
	profile_id uuid not null references profiles(id),
	email varchar(80) not null unique,
	username varchar(50) not null,
	password varchar not null,
	is_active boolean not null default true,
	created_at timestamp not null default now(),
	updated_at timestamp not null default now()
);

create table user_followers (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null references users(id),
	follower_id uuid not null references users(id)
);

create table user_games (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null references users(id),
	game_id uuid not null references games(id)
);

create table posts (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null references users(id),
	title varchar(100) not null,
	content varchar(300) not null,
	created_at timestamp not null default now(),
	updated_at timestamp not null default now()
);

create table post_comments (
	id uuid not null default uuid_generate_v4() primary key,
	post_id uuid not null references posts(id),
	user_id uuid not null references users(id),
	content varchar not null,
	created_at timestamp not null default now(),
	updated_at timestamp not null default now()
);

create table post_likes (
	id uuid not null default uuid_generate_v4() primary key,
	post_id uuid not null references posts(id),
	user_id uuid not null references users(id)
);

create table post_comment_likes (
	id uuid not null default uuid_generate_v4() primary key,
	comment_id uuid not null references post_comments(id),
	user_id uuid not null references users(id)
);

create table files (
	id uuid not null default uuid_generate_v4() primary key,
	file_name varchar not null,
	path varchar not null,
	created_at timestamp not null default now(),
	updated_at timestamp not null default now()
);

create table post_files (
	id uuid not null default uuid_generate_v4() primary key,
	post_id uuid not null references posts(id),
	file_id uuid not null references files(id)
);