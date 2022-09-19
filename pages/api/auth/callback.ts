import APISupport from "../../../utils/APISupport";
import config from "../../../data/config.json";
import {encryption} from "../../../utils/crypto";
import {serialize} from "cookie";

/**
 * Callback for the Discord OAuth2
 * Response Code : 301, 400
 */
const Callback = APISupport().get(async (req, res) => {
    if (!req.query.code) {
        res.status(400).json({ message: "No code provided", code: 400 });
        return;
    }

    const token = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        body: new URLSearchParams({
            client_id: config.CLIENT_ID,
            client_secret: config.CLIENT_SECRET,
            redirect_uri: config.DEFAULT_URL + "/api/auth/callback",
            grant_type: "authorization_code",
            code: `${req.query.code}`,
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    });
    if (!token.ok) {
        res.status(400).json({ message: "Invalid code", code: 400 });
        return;
    }

    const access_token = await token.json().then(r => r.access_token);

    res.setHeader("set-cookie", serialize("token", encryption(access_token), {
        path: "/",
        maxAge: Date.now() + 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: "lax",
    }));

    res.redirect(301, "/");
});

export default Callback;
