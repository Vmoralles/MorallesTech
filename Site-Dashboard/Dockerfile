# Use uma imagem base do Node.js
FROM node:20

# Crie um diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de configuração do Node.js
COPY Site-Dashboard/package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY Site-Dashboard/ ./

# Exponha a porta da aplicação
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "start"]


CMD ["npm", "start"]

