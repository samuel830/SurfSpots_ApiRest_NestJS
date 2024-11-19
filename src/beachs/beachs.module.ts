import { Module } from "@nestjs/common";
import { Beach } from "./models/beachs.models";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BeachsController } from "./beachs.controller";
import { BeachsService } from "./beachs.service";
import { UsersModule } from "src/users/users.module";
import { User } from "src/users/models/users.models";

@Module({
    imports: [
        TypeOrmModule.forFeature([Beach, User]),
        //UsersModule,
    ],
    controllers: [BeachsController],
    providers: [BeachsService],
})
export class BeachsModule{

}