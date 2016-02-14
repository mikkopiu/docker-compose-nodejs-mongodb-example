FROM node:argon

ADD package.json /code/
WORKDIR /code
RUN npm install
ADD . /code

CMD ["node", "server.js"]
