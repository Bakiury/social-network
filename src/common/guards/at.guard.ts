import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) { // This is a Dependency Injection
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // Get the "isPublic" metadata, then check it on the handler
        // and if you don't find anything, then check it on the class
        // and if you don't find anything at all, it will be false
        // true: means that the endpoint (handler) is public
        // false: means protect the endpoint
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass()
        ])

        if (isPublic) return true;

        // AuthGuard will automatically detect the strategy and it will check
        // if the token is correct and everything...
        return super.canActivate(context)
    }
}