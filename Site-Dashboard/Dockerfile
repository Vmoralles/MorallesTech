FROM node:20
WORKDIR /usr/src/app
RUN git clone --branch Teste https://github.com/Vmoralles/MorallesTech.git .
WORKDIR /usr/src/app/MorallesTech/Site-Dashboard
RUN ls -la  
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]

