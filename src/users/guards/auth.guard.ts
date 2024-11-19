import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private reflector: Reflector
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'];

        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);

        if(isPublic){
            return true;
        }

        if(!token){
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token);
            request['userId'] = payload['id'];
        } catch (error) {
            return false;
        }

        return true;
    }
} 