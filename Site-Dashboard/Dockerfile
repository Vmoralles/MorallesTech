FROM node:20

# Definindo o diretório de trabalho
WORKDIR /usr/src/app

# Clonando a branch Teste do repositório
RUN git clone https://github.com/Vmoralles/MorallesTech.git .

# Mudando para o diretório do Site-Dashboard
WORKDIR /usr/src/app/MorallesTech/Site-Dashboard

# Verificando a estrutura de arquivos
RUN ls -la /usr/src/app/MorallesTech/Site-Dashboard

# Verificando se o package.json está presente
RUN [ -f /usr/src/app/MorallesTech/Site-Dashboard/package.json ] || (echo "Arquivo package.json não encontrado" && exit 1)

# Instalando dependências
RUN npm install

EXPOSE 8080

CMD ["npm", "start"]

