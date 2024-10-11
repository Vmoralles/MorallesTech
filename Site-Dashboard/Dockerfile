FROM node:20
WORKDIR /home/ubuntu
RUN git clone https://github.com/Vmoralles/MorallesTech.git .
WORKDIR /home/ubuntu/MorallesTech/Site-Dashboard/
RUN npm install
CMD ["npm", "start"]
EXPOSE 8080
