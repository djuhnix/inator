
# DJUHNIXINATOR 

Just another fun discord bot.

- [Bot invite link](https://discord.com/api/oauth2/authorize?client_id=826701015582769172&permissions=277025532992&scope=applications.commands%20bot)

## Deploying app manually with heroku

1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli)
2. Add heroku remote : `heroku git:remote -a djuhnixinator` 
   * or `git remote set-url heroku https://git.heroku.com/djuhnixinator.git`
3. Checkout to the master branch and push to the heroku remote : `git push heroku master`

## Deploying manually in a VPS with Docker

1. Clone the repository : `git clone https://github.com/djuhnix/inator.git djuhnixinator && cd djuhnixinator`
2. Build the image : `sudo docker build --tag djuhnixinator .`
3. Copy env file : `cp .env.example .env`
4. Fill env with associated value
5. Run the container : `docker run -i -d --name djuhnixinator_instance --env-file .env --restart always djuhnixinator`
---
_template from [@tom-shelby/discord-cnam](https://github.com/tom-shelby/discord-cnam)_