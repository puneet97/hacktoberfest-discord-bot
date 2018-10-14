const { Client, Attachment } = require('discord.js');
const https = require('https');
const client = new Client();
const prefix = 'hack!';

client.on('ready', () => console.log('Bot has logged in!'));

client.on('message', async (msg) => {
  if(msg.author.bot || !msg.content.startsWith(prefix)) return;
  let args = msg.content.split(' ');
  const command = args.shift().slice(prefix.length);
  //Add your commands here. Good command handlers are overrated :POGGERS:

  switch (command) {
    case 'ping':
      const m = await msg.channel.send('Pinging...');
      m.edit(`Ponggers! Client ping: \`${m.createdTimestamp - msg.createdTimestamp}\`ms. Heartbeat ping: \`${client.ping}\`ms`);
      break;
    case 'hello':
      await msg.reply(`Hello ${msg.author.username}`);
      break;
    case 'steak':
      let attach = new Attachment("https://media.giphy.com/media/9UyZI216ic5vG/giphy.gif");
      msg.channel.send(attach);
      break;
    case 'lul':
      const attachment = new Attachment('https://ubisafe.org/images/lul-transparent-twitch-1.png');
      msg.channel.send(attachment);
      break;
    case 'status':
      const m = await msg.channel.send('Querying GitHub for pull request count during Hacktoberfest...');
      const username = args[0];
      const apiUrl = `https://api.github.com/search/issues?q=-label:invalid+created:2018-09-30T10%3A00%3A00%2B00%3A00..2018-11-01T12%3A00%3A00%2B00%3A00+type:pr+is:public+author:${username}&per_page=300`;
      https.get(apiUrl, {
        headers: {
          'User-Agent': 'Hacktoberfest bot <https://github.com/RuyiLi/hacktoberfest-discord-bot>',
        },
      }, resp => {
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => {
          const result = JSON.parse(data);

          if(result.errors) {
            m.edit(`${username} not found :(`);
          } else {
            m.edit(`${username} made ${result.total_count}/5 pull requests during Hacktoberfest 2018`);
          }
        });
      });
      break;
    case 'scream':
      msg.reply(args.join(' ').toUpperCase());
      break;
    default:
      msg.reply(`Invalid Command!`);
  }
})

client.login(process.env.TOKEN);
