import { IsNotEmpty, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString({
    message: 'El nombre debe ser una cadena de texto',
  })
  @IsNotEmpty({
    message: 'El nombre no puede estar vacío',
  })
  @MinLength(3, {
    message: 'El nombre debe tener al menos 3 caracteres',
  })
  name: string;

  @IsString({
    message: 'La descripción debe ser una cadena de texto',
  })
  @IsNotEmpty({
    message: 'La descripción no puede estar vacía',
  })
  @MinLength(5, {
    message: 'La descripción debe tener al menos 5 caracteres',
  })
  description: string;

  @IsString({
    message: 'La URL de la imagen debe ser una cadena de texto',
  })
  @IsNotEmpty({
    message: 'La URL de la imagen no puede estar vacía',
  })
  @IsUrl()
  urlImage: string;
}
