import { IsString, IsNumber, IsIn, Min, Max } from "class-validator";

export class CreateTransferenciaDto {
  @IsNumber()
  @Min(1000)
  @Max(9999999999)
  numero_documento_usuario: number;

  @IsString()
  @IsIn(["recaudo", "pago en linea", "consignacion"], {
    message:
      "tipo_transferencia debe ser recaudo, pago en linea o consignacion",
  })
  tipo_transferencia: string;

  @IsNumber()
  valor: number;
}
