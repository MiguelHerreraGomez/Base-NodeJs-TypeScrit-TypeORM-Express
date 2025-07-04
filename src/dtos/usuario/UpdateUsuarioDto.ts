import {
  IsString,
  IsEmail,
  Length,
  MaxLength,
  IsOptional,
} from "class-validator";

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  @Length(5, 100)
  nombre?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email: string;
}
