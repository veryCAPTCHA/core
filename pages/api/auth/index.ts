import APISupport from "../../../utils/APISupport";
import config from "../../../data/config.json";

const Index = APISupport().get(async (req, res) => {
    res.redirect(301, config.DISCORD_OAUTH2_URL);
});

export default Index;
