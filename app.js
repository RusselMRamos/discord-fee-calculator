const Discord = require('app.js');
const client = new Discord.Client(NzI1MTcxMjM1ODcyNTcxNDY0.XvK4fA.e3oDIGmjT-4R-S2taA5LjW0bSwA);

require('dotenv').config();

const fees = {
  Stockx: n => 0.095 * n,
  Paypal: n => (0.029 * n) + 0.3,
  Ebay: n => 0.1 * n + fees.Paypal(n - (0.1*n)),
  Goat: n => 0.095 * n + fees.Paypal(n - 0.095*n),
}

client.on('message', msg => {
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

client.login(NzI1MTcxMjM1ODcyNTcxNDY0.XvK4fA.e3oDIGmjT-4R-S2taA5LjW0bSwA);

