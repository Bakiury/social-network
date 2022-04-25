import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // How we get the token
            ignoreExpiration: false, // Default value
            secretOrKey: 'rt-secret', // Password to sign the token
            passReqToCallback: true // Get back the refresh token
        })
    }

    validate(req: Request, payload: any) { // Get payload with the token
        const refreshToken = req.get('authorization').replace('Bearer', '').trim();

        return {
            ...payload,
            refreshToken
        };
    }
}