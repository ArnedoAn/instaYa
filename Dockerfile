FROM node:lts-alpine
ENV TOKEN=12da25cc90573a8c6458c644c9d421d39a627b46f18f5fe949f537f512374953a187bd50d5cca69aa515ad88367a81381ce63699461a416c125d61377732ca89
ENV DB_URL=mongodb+srv://andres:pw562tyKPGq1Szmw@instaya.4k5gwax.mongodb.net/?retryWrites=true&w=majority
ENV PORT=3000
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
