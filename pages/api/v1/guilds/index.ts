import APISupport from "../../../../utils/APISupport";
import config from "../../../../data/config.json";
import fetch from "node-fetch";

const Index = APISupport().get(async (req, res) => {
    const userGuilds: any = await fetch("https://discord.com/api/v9/users/@me/guilds", {
        method: "GET",
        headers: {
            Authorization: `${req.headers.authorization}`
        }
    });
    if (!userGuilds.ok) {
        res.status(401).json({ error: "Unauthorized", code: 401 });
        return;
    }
    const botGuilds: any = await fetch(`https://discord.com/api/v9/users/@me/guilds`, {
        method: "GET",
        headers: {
            Authorization: `Bot ${config.BOT_TOKEN}`
        }
    });
    const joined = [];
    for (const guild of await botGuilds.json()) {
        joined.push(guild.name);
    }

    const guilds = [];
    for (const guild of await userGuilds.json()) {
        if (guild.owner) {
            guilds.push({
                id: guild.id,
                name: guild.name,
                icon: guild.icon,
                status: "OWNER",
                bot: joined.includes(guild.name)
            })
        } else if ((Number(guild.permissions & 0x8) === 8) || (Number(guild.permissions & 0x20) === 32)) {
            guilds.push({
                id: guild.id,
                name: guild.name,
                icon: guild.icon,
                status: "ADMINISTRATOR",
                bot: joined.includes(guild.name)
            })
        }
    }

    res.status(200).json(guilds);
});

export default Index;
