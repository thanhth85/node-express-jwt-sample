import express from 'express';

import JwtService from '../services/jwt.service'
import Logger from '../libs/logger'

class JwtMiddleWare {

    constructor() {}

    verify = ( req: express.Request,
        res: express.Response,
        next: express.NextFunction) => {
        const bearer = req.header('Authorization') || '';
        const token = bearer.split(' ')[1];
        // Logger.debug(`token: ${token}`);
        const valid = JwtService.verify(token);
        return valid ? next() : res.status(401).send({ error: 'Unauthorized' });    
    }

    hasRole(role: string) {
        return (req: express.Request,
            res: express.Response,
            next: express.NextFunction) => {
          const bearer = req.header('Authorization') || '';
          const token = bearer.split(' ')[1];
          const decoded = JwtService.decode(token);
          Logger.debug(`decoded: ${decoded}`);
        //   const foundRole = decoded.payload.roles.find((e: { role: string; }) => e.role === role);
        //   return foundRole ? next() : res.status(403).send({ error: 'Access Denied' });
        }
    }
    
    hasAllRoles(roles: any[]) {
        return (req: express.Request,
            res: express.Response,
            next: express.NextFunction) => {
            const bearer = req.header('Authorization') || '';
            const token = bearer.split(' ')[1];
            const decoded = JwtService.decode(token);
            // const foundAllRole = roles.every(e => decoded.payload.roles.find((i: { role: string; }) => i.role === e));
            // return foundAllRole ? next() : res.status(403).send({ error: 'Access Denied' });
        }
    }
    
    hasAnyRole(roles: any[]) {
        return (req: express.Request,
            res: express.Response,
            next: express.NextFunction) => {
          const bearer = req.header('Authorization') || '';
          const token = bearer.split(' ')[1];
          const decoded = JwtService.decode(token);
        //   const foundAnyRole = roles.some(e => decoded.payload.roles.find((i: { role: any; }) => i.role === e));
        //   return foundAnyRole ? next() : res.status(403).send({ error: 'Access Denied' });
        }
    }
}

export default new JwtMiddleWare();