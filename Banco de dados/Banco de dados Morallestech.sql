create database morallestech;
use morallestech;

create table usuario(
idUsuario int  primary key auto_increment,
nome varchar(45),
sobrenome varchar(255),
email varchar(255) unique,
senha varchar(255),
telefone char(11));
	
    select * from usuario;
create table jogo(
idJogo int primary key auto_increment,
jogo varchar(255),
dtJogo datetime,
competicao varchar(100),
fkUsuario int,
constraint fkUsuario foreign key (fkUsuario) references Usuario(idUsuario));
insert into jogo values
(1, "Ministerio X Rb P.S.A","2024-05-15 19:00:00", "Copa Noturna", default),
(2, "Ministerio X America FC P.S.A","2024-05-18 19:00:00", "Copa Noturna", default),
(3, "Ministerio X Fluminense S.C P.S.A","2024-05-25 19:00:00", "Copa Noturna", default),
(4, "Ministerio X Trevo","2024-05-29 19:00:00", "Copa Noturna", default),
(5, "Ministerio X Selecionados F.C","2024-06-02 19:00:00", "Copa Noturna", default),
(6, "Ministerio X JD Mazza","2024-06-09 19:00:00", "Copa Noturna", default),
(7, "Ministerio X Fluminense S.C P.S.A","2024-06-13 19:00:00", "Copa Noturna", default),
(8, "Ministerio X Trevo","2024-06-17 19:00:00", "Copa Noturna", default);


create table estatisticas(
fkUsuario int,
fkJogo int,
idEsta int,
nome varchar(255),
sobrenome varchar(255),
qtdAssistencia int,
qtdGol int,
constraint pkComposta primary key (fkUsuario, fkJogo, idEsta),
constraint chk_fkUsuario foreign key (fkUsuario) references usuario(idUsuario),
constraint chk_fkJogo foreign key (fkJogo) references jogo(idJogo));

create table contato(
idContato int auto_increment,
fkUsuario int,
nome varchar(255),
email  varchar(255)unique,
assunto varchar(255),
problema varchar(255),
constraint pkComposta primary key (idContato, fkUsuario),
constraint chkfkUsuario foreign key (fkUsuario) references usuario(idUsuario));

create table treinoArtilheiro(
idArtilheiro int primary key auto_increment,
nome varchar(255),
sobrenome varchar(255),
gol int,
fkUsuario int,
constraint chkfkTreino foreign key (fkUsuario) references usuario(idUsuario));

create table treinoMaestro(
idMaestro int primary key auto_increment,
nome varchar(255),
sobrenome varchar(255),
assistencia int,
fkUsuario int,
constraint chk_fkTreino foreign key (fkUsuario) references usuario(idUsuario));
