FROM node:14.16-buster

WORKDIR /genart
ENV PORT 6969

COPY . .
RUN npm install

CMD ["npm", "start"]
