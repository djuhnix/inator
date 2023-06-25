FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/bot

WORKDIR /usr/src/bot

COPY package.json /usr/src/bot
COPY package-lock.json /usr/src/bot/package-lock.json

RUN npm install

COPY . /usr/src/bot

# Start the bot.
CMD ["node", "bot.js"]
