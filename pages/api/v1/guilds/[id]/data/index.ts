import APISupport from "../../../../../../utils/APISupport";
import {getToken} from "../../../../../../utils/extend";
import {data} from "../../../../../../utils/Mongoose";

/**
 * Returns the data of a guild
 * Response Code : 200, 400, 401, 404
 */
const Index = APISupport()
    .get(async (req, res) => {
        const db = await data.findOne({guildID: req.query.id});
        const guildData = await fetch('http://localhost:3000/api/v1/guilds', {
            method: 'GET',
            headers: {
                'Authorization': getToken(req)
            }
        });

        if (!guildData.ok) {
            if (guildData.status === 401) {
                res.status(401).json({message: "Unauthorized", code: 401});
            } else {
                res.status(400).json({message: "Bad Request", code: 400});
            }
            return;
        }

        const guildJson = await guildData.json();
        if (guildJson.find((guild: any) => guild.id === req.query.id)) {
            if (db) {
                res.status(200).json({
                    "guild_id": db.guildID,
                    "embed_title": db.embedTitle,
                    "embed_field": db.embedField,
                    "role": db.embedRole,
                    "button_emoji": db.buttonEmoji,
                    "button_label": db.buttonLabel,
                    "verify_style": db.verifyStyle,
                });
            } else {
                res.status(404).json({message: "Not Found", code: 404});
            }
        } else {
            res.status(404).json({message: "Not Found", code: 404});
            return;
        }
    }).patch(async (req, res) => {
        const guildData = await fetch('http://localhost:3000/api/v1/guilds', {
            method: 'GET',
            headers: {
                'Authorization': getToken(req)
            }
        });

        if (!guildData.ok) {
            if (guildData.status === 401) {
                res.status(401).json({message: "Unauthorized", code: 401});
            } else {
                res.status(400).json({message: "Bad Request", code: 400});
            }
            return;
        }

        const guildJson = await guildData.json();
        if (guildJson.find((guild: any) => guild.id === req.query.id)) {
            const db = await data.findOneAndUpdate({guildID: req.query.id}, {
                $set: {
                    embedTitle: req.body.embed_title,
                    embedField: req.body.embed_field,
                    embedRole: req.body.role,
                    buttonEmoji: req.body.button_emoji,
                    buttonLabel: req.body.button_label,
                    verifyStyle: req.body.verify_style
                }
            }, {new: true});

            if (db) {
                res.status(200).json({
                    "guild_id": db.guildID,
                    "embed_title": db.embedTitle,
                    "embed_field": db.embedField,
                    "role": db.embedRole,
                    "button_emoji": db.buttonEmoji,
                    "button_label": db.buttonLabel,
                    "verify_style": db.verifyStyle,
                });
            } else {
                res.status(404).json({message: "Not Found", code: 404});
                return;
            }
        } else {
            res.status(404).json({message: "Not Found", code: 404});
            return;
        }
    });

export default Index;
