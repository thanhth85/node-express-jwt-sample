import jwt from "jsonwebtoken";
import  * as fs from 'fs'; 
import { JwtConfig } from '../../config/jwt.config';

import Logger from '../libs/logger'

const privateKey = fs.readFileSync('config/private.key', 'utf8');
const publicKey = fs.readFileSync('config/public.key', 'utf8');
class JwtService {

    constructor(){}

    sign = (payload: any) => {
        return jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            issuer: 'TEST',
            audience: 'https://www.testing.com',
            expiresIn: '12h',
        });
    }
    
    verify = (token: string) => {
        try {
            return jwt.verify(token, publicKey, JwtConfig.options);
        } catch(error) {
            return false;
        }
    }

    decode = (token: string) => {
        return jwt.decode(token, { complete: true });
    }
}

export default new JwtService();