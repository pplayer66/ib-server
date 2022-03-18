import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AccountsModule } from "../accounts/accounts.module";
import { AuthModule } from "../auth/auth.module";
import { TemplatesModule } from "../templates/templates.module";

@Module({
  controllers: [AppController],
  imports: [AuthModule, AccountsModule, TemplatesModule],
})
export class AppModule {}
