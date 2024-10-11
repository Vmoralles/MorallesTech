FROM node:20

# Definindo o diretório de trabalho
WORKDIR /usr/src/app

# Clonando a branch Teste do repositório
RUN git clone --branch Teste https://github.com/Vmoralles/MorallesTech.git .

# Mudando para o diretório do Site-Dashboard
WORKDIR /usr/src/app/MorallesTech/Site-Dashboard

# Verificando a estrutura de arquivos
RUN ls -la

# Instalando dependências
RUN npm install

EXPOSE 8080

CMD ["npm", "start"]

