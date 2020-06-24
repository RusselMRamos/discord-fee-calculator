const Discord = require('app.js');
const bot = new Discord.Client(NzI1MTcxMjM1ODcyNTcxNDY0.XvK4fA.e3oDIGmjT-4R-S2taA5LjW0bSwA);

// When the bot is connected and ready, log to console.
bot.on('ready', () => {
   console.log('Connected and ready.');
});

// Every time a message is sent anywhere the bot is present,
// this event will fire and we will check if the bot was mentioned.
// If it was, the bot will attempt to respond with "Present".
bot.on('messageCreate', async (msg) => {
   const botWasMentioned = msg.mentions.find(
       mentionedUser => mentionedUser.id === bot.user.id,
   );

   if (botWasMentioned) {
       try {
           await msg.channel.createMessage('Present');
       } catch (err) {
           // There are various reasons why sending a message may fail.
           // The API might time out or choke and return a 5xx status,
           // or the bot may not have permission to send the
           // message (403 status).
           console.warn('Failed to respond to mention.');
           console.warn(err);
       }
   }
});

bot.on('error', err => {
   console.warn(err);
});

bot.connect();

require('dotenv').config();

const fees = {
  Stockx: n => 0.095 * n,
  Paypal: n => (0.029 * n) + 0.3,
  Ebay: n => 0.1 * n + fees.Paypal(n - (0.1*n)),
  Goat: n => 0.095 * n + fees.Paypal(n - 0.095*n),
}

bot.on('message', msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith('!fee')) return;
  const [,number] = msg.content.split(' ');
  const embed = new Discord.RichEmbed();

  if (isNaN(number)) return msg.channel.send({ embed: { 
      color: 3447003, 
      description: ':interrobang: Argument must be a number.'
    }
  });

  Object.keys(fees).forEach(fee => {
    embed.addField(`${fee} Payout`, `$${Number(number - fees[fee](number)).toFixed(2)}`);
  });

  msg.channel.send(embed);
});

bot.login(process.env.NzI1MTcxMjM1ODcyNTcxNDY0.XvK4fA.e3oDIGmjT-4R-S2taA5LjW0bSwA);

