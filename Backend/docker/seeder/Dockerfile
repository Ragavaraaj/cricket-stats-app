FROM node:18.4.0-alpine
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3001

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i

COPY . .

CMD [ "npm", "run", "seed" ]
