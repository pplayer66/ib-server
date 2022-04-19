import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AccountsModule } from "../accounts/accounts.module";
import { AuthModule } from "../auth/auth.module";
import { TemplatesModule } from "../templates/templates.module";
import { OperationsModule } from "../operations/operations.module";
import { ServicesModule } from "../services/services.module";
import { ProvidersModule } from "../providers/providers.module";
import { PaymentsModule } from "../payments/payments.module";
import { TransfersModule } from "../transfers/transfers.module";
import { ConversionModule } from "../conversion/conversion.module";

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    AccountsModule,
    TemplatesModule,
    OperationsModule,
    ServicesModule,
    ProvidersModule,
    PaymentsModule,
    TransfersModule,
    ConversionModule,
  ],
})
export class AppModule {}
