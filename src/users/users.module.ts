import { Module } from "@nestjs/common";
import { User } from "./models/users.models";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards/auth.guard";

@Module({
    imports: [TypeOrmModule.forFeature([User]),],
    controllers: [UsersController],
    providers: [UsersService, {
        provide: APP_GUARD,
        useClass: AuthGuard,
    }],
})
export class UsersModule{

}