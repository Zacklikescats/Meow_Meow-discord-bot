import dotenv from 'dotenv';
dotenv.config();
import { 
    Client, 
    GatewayIntentBits,
    ChannelType,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder
} from 'discord.js';


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

const meowChannels = new Map();

client.once('ready', () => {
    console.log(`Bot online as ${client.user.tag}`);

    client.guilds.cache.forEach(guild => {
        const channel = getMainChannel(guild);
        if (channel) {
            meowChannels.set(guild.id, channel.id);
        }
    });

    //meows in every channel
    setInterval(() => {
        meowChannels.forEach((channelId) => { 
            const channel = client.channels.cache.get(channelId);
            if (channel) {
                channel.send("meow").catch(console.error);
            }
        });
    }, 5 * 60 * 1000); //interval
});

client.on('guildCreate', guild => {
    console.log(`Joined new guild: ${guild.name}`);
    const channel = getMainChannel(guild);
    if (channel) {
        meowChannels.set(guild.id, channel.id);
    }
});

function getMainChannel(guild) {
    if (guild.systemChannel?.permissionsFor(guild.members.me)?.has('SendMessages')) {
        return guild.systemChannel;
    }
    
    return guild.channels.cache.find(
        ch => ch.type === ChannelType.GuildText && ch.permissionsFor(guild.members.me)?.has('SendMessages')
    );
}

client.on('messageCreate', async (message) => {

    await message.channel.sendTyping();

    if (message.author.bot) return;
    const content = message.content.toLowerCase();

    if (content === '!tip' || content === '/tip') {
        const button = new ButtonBuilder()
        .setLabel('Tip_cat')
        .setStyle(ButtonStyle.Link)
        .setURL('https://buymeacoffee.com/zackdcat')
        .setEmoji('🪙');
        const row = new ActionRowBuilder().addComponents(button);
        message.channel.send({ components: [row] });
    }
});

client.login(process.env.DISCORD_TOKEN);


