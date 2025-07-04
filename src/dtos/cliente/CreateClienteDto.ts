import {
  IsString,
  IsNumber,
  IsEmail,
  Length,
  MaxLength,
  Min,
  Max,
} from "class-validator";

export class CreateClienteDto {
  @IsString()
  @Length(5, 100)
  nombre: string;

  @IsString()
  @Length(2, 2)
  tipo_documento: string;

  @IsNumber()
  @Min(1000)
  @Max(9999999999)
  numero_documento: number;

  @IsEmail()
  @MaxLength(100)
  email: string;
}
