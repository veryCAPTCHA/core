import APISupport from "../../../utils/APISupport";
import { serialize } from "cookie";

/**
 * Logs out the user
 * Response Code : 301
 */
const Index = APISupport().get(async (req, res) => {
    res.setHeader("Set-Cookie", serialize("token", "", {
        path: "/",
        maxAge: -1,
    }));

    res.redirect(301, "/");
});

export default Index;
