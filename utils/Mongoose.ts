import mongoose from 'mongoose';

mongoose.connect(`${require("../data/mongo.json").DB}`).then(undefined)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to MongoDB");
});

const guildData = new mongoose.Schema({
    guildID: {type: String, required: true, unique: true},
    embedTitle: {type: String, required: true, default: "Title"},
    embedField: {type: String, required: true, default: "Field"},
    embedRole: {type: String, required: true, default: "0000000000000000000"},
    buttonEmoji: {type: String, required: true, default: "✅"},
    buttonLabel: {type: String, required: true, default: "인증"},
    verifyStyle: {type: String, required: true, default: "v2"},
    createdChannelID: {type: String},
    createdMessageID: {type: String},
    customId: {type: String},
    verifiedUser: {type: Array}
});

export const data = mongoose.models.captchaData || mongoose.model("captchaData", guildData)
// export const data = mongoose.models.test || mongoose.model("test", guildData)
