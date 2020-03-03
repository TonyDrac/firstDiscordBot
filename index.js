const commando = require('discord.js-commando');

const TOKEN = 'NjcwNjE4Nzc5Mzk4NTY5OTg2.XixLkg.5PFZ8dV5ug71-bp7UKkk-rjmLC0'

const client = new commando.Client({      
     
        commandPrefix: "!",
        unknownCommandResponse: true,
    });
    
    client
        .on('error',console.error)
        .on('warn',console.warn)
    //    .on('debug', console.log)
    .on('disconnect', () => {console.warn('Disconnected!'); })
      .on('reconnecting', () => {console.warn('Reconnecting...'); })
    .on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
        console.log(`Connected to guilds [${client.guilds.map(v => { return v.name })}]`);
    })
    .on('rateLimit', (rateLimitInfo) => {
            console.log(`WARNING! Rate limit Path: ${rateLimitInfo.path}`);
    });
client.registry.registerDefaults();

require('./modules/dicebot').init(client);
require('./modules/autopurge').init(client);
require('./modules/greeter').init(client);
require('./modules/gm_channel').init(client);

function main() {
            console.log("Logging in");
        client.login(TOKEN);
    }
    
    main(); 