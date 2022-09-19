import {decryption} from "./crypto";

export function getToken(req: any) {
    // Support both original key and encrypted key
    let key = `${req.headers.authorization}`;
    if (key.includes(".")) {
        key = `Bearer ${decryption(key.split(" ")[1])}`;
    }

    return key;
}
