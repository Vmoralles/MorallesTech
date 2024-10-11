FROM node:20
WORKDIR /usr/src/app
RUN git clone https://github.com/Vmoralles/MorallesTech.git .
WORKDIR /usr/src/app/MorallesTech/Site-Dashboard
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]

