require('dotenv').config();
import * as crypto from 'crypto'

const key = process.env.HASH_KEY_PASSWORD

export const encrypt = (text: string) => {
    const iv = crypto.randomBytes(12); // IV de 12 bytes para GCM
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
    let encrypted = cipher.update(text, 'utf-8', 'base64');
    encrypted += cipher.final('base64');
    const authTag = cipher.getAuthTag().toString('base64');
  
    return {
      encryptedData: encrypted,
      iv: iv.toString('base64'),
      authTag
    }
}

export const decrypt = (encrypted: string, ivBase64: string, authTagBase64: string) => {
    const iv = Buffer.from(ivBase64, 'base64');
    const authTag = Buffer.from(authTagBase64, 'base64');
  
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
  
    let decrypted = decipher.update(encrypted, 'base64', 'utf-8');
    decrypted += decipher.final('utf-8');
  
    return decrypted;
}