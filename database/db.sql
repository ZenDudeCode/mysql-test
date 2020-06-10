CREATE DATABASE database_link;

use database_link;

create table users(
    id int(11) not null,
    username varchar(16) not null,
    password varchar(60) not null,
    fullname varchar(100) not null
);

alter table users add primary key (id);

alter table users add id int(11) not null, auto_increment = 2;

describe users;

-- link table

CREATE table links (
    id int(11) not null,
    title varchar(150) not null,
    url varchar(255) not null,
    description text,
    user_id int(11),
    create_at timestamp not null default current_timestamp,
    CONSTRAINT fk_user FOREIGN key (user_id) REFERENCES users(id) 
    );

    ALTER TABLE LINKS ADD PRIMARY KEY(id);
     ALTER TABLE LINKS modify id int(11) not null auto_increment, auto_increment = 2;
