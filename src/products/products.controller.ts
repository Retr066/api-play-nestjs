import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import sendResponse from 'src/utils/reponse';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const createdProduct = await this.productsService.create(createProductDto);
    return sendResponse({
      message: 'Producto creado correctamente',
      data: createdProduct,
      statusCode: HttpStatus.CREATED,
    });
  }

  @Get()
  async findAll() {
    const allProduct = await this.productsService.findAll();
    if (allProduct.length === 0) {
      return sendResponse({
        message: 'No hay productos disponibles',
        statusCode: HttpStatus.NOT_FOUND,
        data: [],
      });
    }
    return sendResponse({
      message: 'Lista de productos',
      data: allProduct,
      statusCode: HttpStatus.OK,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    const foundProduct = await this.productsService.findOne(id);
    if (!foundProduct) {
      return sendResponse({
        message: 'Producto no encontrado',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return sendResponse({
      message: 'Producto encontrado',
      data: foundProduct,
      statusCode: HttpStatus.OK,
    });
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    const deletedProduct = await this.productsService.remove(id);
    if (!deletedProduct) {
      return sendResponse({
        message: 'Producto no encontrado',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return sendResponse({
      message: 'Producto eliminado correctamente',
      statusCode: HttpStatus.OK,
    });
  }
}
