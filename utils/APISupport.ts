import {NextApiRequest, NextApiResponse} from "next";
import nc from "next-connect";
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import config from "../data/config.json";

// API
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    keyGenerator: (req) => {
        return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    },
    skip: (req) => {
        const ip = req.connection.remoteAddress;
        return ip === "::1" || ip === "::ffff:127.0.0.1" || ip === `::ffff:${config.WHITELIST_IP}`;

    },
    message: {
        message: "Too many requests from this IP, please try again in a minute.",
        code: 429
    },
    statusCode: 429,
});

const APISupport = () =>
    nc<NextApiRequest, NextApiResponse>({
        onNoMatch(req, res) {
            return res.status(405).json({
                message: "Method not allowed",
                code: 405,
            })
        },
        onError(err) {
            console.error(err)
        }
    }).use(limiter).use(cors());

export default APISupport
