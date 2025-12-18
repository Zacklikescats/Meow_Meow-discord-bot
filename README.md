# Meow_Meow-discord-bot
A cat bot that periodically meows.

# REQUIRED FOR SETUP:

npm init -y<br>
npm i discord.js<br>
npm i dotenv

Frequently run these scripts to keep this bot up to date.

    //meows in every channel
    setInterval(() => {
        meowChannels.forEach((channelId) => { 
            const channel = client.channels.cache.get(channelId);
            if (channel) {
                channel.send("meow").catch(console.error);
            }
        });
    }, 5 * 60 * 1000); //interval

Make sure to replace channelId in this line to the last number in the channel link of the discord channel you want the bot to meow in:
const channel = client.channels.cache.get(channelId);

# Running the bot:

node <filename>.js

