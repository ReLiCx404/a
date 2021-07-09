const NanaAPI = require("nana-api");
const nana = new NanaAPI();
const Discord = require('discord.js');
const client = new Discord.Client();
const nhentai = require('nhentai');
const api = new nhentai.API();
const path = require('path')

const prefix = 'n!';

client.on('ready', () => {
    setInterval(() => {
        nana.popular().then(g => {
            var pop = g.results[0].id;
        
        console.log(`Logged in as ${client.user.tag}!`);
        client.user.setActivity('https://nhentai.net/g/'+pop, { type: 'WATCHING' })
            .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
            .catch(console.error);
        })
    }, 3600000)
});

client.on('message', msg => {
    if (msg.content === 'n!popular') {
        nana.popular().then((g) => {
            var n = 0;
            while(n<=4) {
                var r = g.results[n].id
                msg.channel.send('https://nhentai.net/g/'+r)
                n++;
                console.log(r);
        }});
    }
});

client.on('message', (message) => {
    if(message.content==='n!random') {
        nana.random().then(r => {
            message.channel.send('https://nhentai.net/g/'+r.id);
            console.log(r.id);
        })
    }
});

client.on('message', (message) => {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if(command === "tag") {
        if(args.length < 2){
            return message.channel.send('Incorrect format, Format should be n!tag `tag` `no. of doujins`')
}
        var x = args[0];
        var y = args[1];
        var int = parseInt(y);
            nana.tag(x, 1, 'week').then(r => {
                var n = 1;
                while(n<=int) {
                    var rep = r.results[n].id;
                    message.channel.send('https://nhentai.net/g/'+rep);
                    console.log(rep);
                    n++;              
        }
    })
}});

client.on('message', (message) => {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if(command === "artist") {
        if(args.length < 2){
            return message.channel.send('Incorrect format, Format should be n!artist `artist` `no. of doujins`')
}
        var x = args[0];
        var y = args[1];
        var int = parseInt(y);
        nana.artist(x, 1, 'week').then(r => {
            var n = 1;
            while(n<=int) {
                var rep = r.results[n].id;
                message.channel.send('https://nhentai.net/g/'+rep);
                console.log(rep);
                n++;              
        }
    })
}});

client.on('message', (message) => {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if(command === "search") {
        if(args.length < 1){
            return message.channel.send('Incorrect format, Format should be n!search `id`')
}
        var x = args[0];
        nana.g(x).then(r => {
                var rep = r.id;
                message.channel.send('https://nhentai.net/g/'+rep);
                console.log(rep);
    })
}});

client.on('message', (message) => {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if(command === "view") {
        if(args.length < 1){
            return message.channel.send('Incorrect format, Format should be n!view `id`')
}
    var x = args[0];
    api.fetchDoujin(x).then(doujin => {
        console.log(x);
        n = doujin.pages.length;
        for(i=0;i<=n; i++){
            message.channel.send(doujin.pages[i].url);
        }
    });
}});


client.on('message', (message) => {
    if(message.content === 'n!help') {
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#ec2753')
            .setTitle('Commands')
            .setAuthor('REGRET#5861', 'https://i.kym-cdn.com/entries/icons/facebook/000/026/029/8P68F-_I_400x400.jpg')
            .setDescription('List of commands and how to use them')
            .setThumbnail('https://i.kym-cdn.com/entries/icons/facebook/000/026/029/8P68F-_I_400x400.jpg')
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: 'n!popular', value: 'Gives the popular doujins of the day', inline: false },
                { name: 'n!tag', value: 'Search for a specific tag', inline: false },
                { name: 'n!random', value: 'Gives a random doujin!', inline:false },
                { name: 'n!artist', value: 'Search for a specific artists works', inline:false },                
                { name: 'n!search', value: 'Search with an id', inline:false }, 
                { name: 'n!view', value: 'View a doujin on nhentai with an id', inline:false },
                )
            .addField('‏‏‎ ‎', '`n!popular`', false)
            .addField('‏‏‎ ‎‎', '`n!tag tag no.ofdoujins`', false)
            .addField('‎‏‏‎ ‎', '`n!random`', false)
            .addField('‏‏‎ ‎‎', '`n!artist artist no.ofdoujins`', false)
            .addField('‏‏‎ ', '`n!search id`', false)
            .addField('‏‏‎ ', '`n!view id`', false)
            .setTimestamp()
            .setFooter('Nut Time');

        message.channel.send(exampleEmbed);
    }
    });

client.on('message', (msg) => {
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if(args.length < 0) {
        if(command === "sus") {
            const {voice} = msg.member
            if(!voice.channelID) {
                msg.reply('you need to be in a vc you sussy baka')
                return
            }
            voice.channel.join().then((connection) => {
                connection.play(path.join(__dirname,'amogus.mp3'))
            msg.reply('https://cdn.discordapp.com/attachments/808357174745104436/851515154599772200/artworks-Uii8SMJvNPxy8ePA-romBoQ-t500x500.png')
            })
            setTimeout(()=>{
                msg.member.voice.channel.leave();
                msg.reply('STOP I CANT TAKE IT ANYMORE I CANT TAKE THIS PAIN ANYMORE PLEASE STOP SAYING SUS IM GOING INSANE STOP MY BRAIN IS MALFUNCTIONING STOP IT JUST STOP I SWEAR IF I SEE ANOTHER ONE OF YOU SAY SUS I WILL COMMIT SUS JUST STOP MESSING WITH ME I CANT SLEEP BECAUSE WHEREVER I GO I SEE HIS FACE HES FOLLOWING ME EVERYWHERE IM SCARED SO STOP')
            }, 75000)
        }
    }
})


client.login(process.env.BOT_TOKEN);
