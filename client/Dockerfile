FROM node:boron

ENV CODE_DIR /code

RUN mkdir -p $CODE_DIR

WORKDIR $CODE_DIR

ADD . $CODE_DIR

RUN npm install

CMD [ "npm", "start" ]
