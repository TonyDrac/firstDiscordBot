const config = require('../config.js');
const axios = require('axios')
const sleep = require('util').promisify(setTimeout)

var replies = [
    'Hokus Pokus.. ',
    'Simsalabim! ',
    'Du fåååår.. ',
    'Ojojoj! ',
    '🎲 ',
    'Jag visste att du ville ha ',
    'Tärningen är kastad.. ',
    'Åh, mitt lyckonummer ',
    'Var det den här siffran du ville ha? ',
    'Den bästa siffran är:  ',
    'Den magiska siffran  '
]

module.exports = {
    init: function (client) {
        client.on('message', (msg) => {
            if (msg.content.length <= 20) {
                roll(msg).then(console.log).catch(console.err);
            }
        })
    }
}

async function roll(msg) {
    try {
        const response = await axios.get(`https://${config.dicebot.url}:${config.dicebot.port}/roll/${msg.content}`);
        if (response.data.result && !response.data.trivial) {
            let reply = await msg.reply(`🎲${msg.content}🎲`);
            await sleep(200);
            var randomNumber = Math.floor(Math.random() * (replies.length));
            await reply.edit(replies[randomNumber] + `${response.data.result}! 🎲`)
        }
    } catch (error) {
        if (error.response && error.response.status != 404) {
            console.error(error);
        }
    }
}
