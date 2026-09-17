import crypto from "crypto";
import "dotenv/config";

const ENCRYPTION_KEY=Buffer.from(process.env.ENCRYPTION_KEY,"utf-8");
const ALGORITHM = "aes-256-gcm";

export function encryptApiKey(plainTextKey){
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGORITHM,ENCRYPTION_KEY,iv);
    let encrypted = cipher.update(plainTextKey,"utf8","hex");
    encrypted += cipher.final("hex");
    const authTag = cipher.getAuthTag().toString("hex");
    return `${iv.toString("hex")}:${encrypted}:${authTag}`;
}
export function decryptApiKey(encryptedString){
    const [ivHex,encryptedHex,authTagHex]=encryptedString.split(":");
    const iv = Buffer.from(ivHex,"hex");
    const authTag = Buffer.from(authTagHex,"hex");
    const decipher = crypto.createDecipheriv(ALGORITHM,ENCRYPTION_KEY,iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedHex,"hex","utf8");
    decrypted+=decipher.final("utf8");
    return decrypted;
}
