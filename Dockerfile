FROM node:14.16-buster

WORKDIR /genart

COPY . .

RUN apt update

RUN apt install -y \
build-essential \
libcairo2-dev \
libpango1.0-dev \
libjpeg-dev \
libgif-dev \
librsvg2-dev

RUN npm install canvas --build-from-source
RUN npm install

CMD ["npm", "start"]
