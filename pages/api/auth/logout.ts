import APISupport from "../../../utils/APISupport";
import { serialize } from "cookie";

const Index = APISupport().get(async (req, res) => {
    res.setHeader("Set-Cookie", serialize("token", "", {
        path: "/",
        maxAge: -1,
    }));

    res.redirect(301, "/");
});

export default Index;
