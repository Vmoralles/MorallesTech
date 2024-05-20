create database morallestech;
use morallestech;

create table jogo(
idJogo int primary key auto_increment,
dtJogo datetime,
competicao varchar(100));

create table treino(
idTreino int primary key auto_increment,
dtTreino datetime);

create table usuario(
idUsuario int auto_increment,
fkjogo int,
fkTreino int,
nome varchar(45),
email varchar(255) unique,
senha int,
telefone char(9),
constraint pkcomposta primary key(idUsuario,fkJogo,fkTreino),
constraint fkJogo foreign key (fkJogo) references jogo(idJogo),
constraint fkTreino foreign key (fkTreino) references treino(idTreino));

create table contato(
idContato int auto_increment,
fkUsuario int,
nome varchar(255),
email  varchar(255)unique,
assunto varchar(255),
problema varchar(255),
constraint pkComposta primary key (idContato, fkUsuario),
constraint fkUsuario foreign key (fkUsuario) references usuario(idUsuario));

create table treinoArtilheiro(
idArtilheiro int primary key auto_increment,
nome varchar(255),
sobrenome varchar(255),
gol int,
fkTreino int,
constraint chkfkTreino foreign key (fkTreino) references treino(idTreino));

create table treinoMaestro(
idMaestro int primary key auto_increment,
nome varchar(255),
sobrenome varchar(255),
assistencia int,
fkTreino int,
constraint Chk_fkTreino foreign key (fkTreino) references treino(idTreino));

create table jogoArtilheiro(
idArtilheiro int primary key auto_increment,
nome varchar(255),
sobrenome varchar(255),
gol int,
fkjogo int,
constraint chkfkjogo foreign key (fkjogo) references jogo(idJogo));

create table jogoMaestro(
idMaestro int primary key auto_increment,
nome varchar(255),
sobrenome varchar(255),
assistencia int,
fkjogo int,
constraint chk_fkjogo foreign key (fkjogo) references jogo(idJogo));

