FROM node:20.11.0

WORKDIR /receiver

COPY package.json /receiver

RUN npm install

COPY . /receiver

RUN npm run compile

CMD [ "sh", "-c", "if [ \"$NODE_ENV\" = 'development' ]; then npm run dev; else npm start; fi" ]
