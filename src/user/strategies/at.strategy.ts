import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // How we get the token
            ignoreExpiration: false, // Default value
            secretOrKey: 'at-secret' // Password to sign the token
        })
    }

    validate(payload: any) { // Get payload without the token
        return payload;
    }
}