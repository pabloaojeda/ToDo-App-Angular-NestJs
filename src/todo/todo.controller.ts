import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from '../DTO/createTodo.DTO';
import { TodoStatus } from 'src/Entity/todo.entity';
import { TodoStatusValidationPipe } from '../pipes/TodoStatusValidation.pipe';

// http://localhost:3000/api/todos
@Controller('api/todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  //http GET verb
  @Get()
  getAlltodos() {
    // console.log(this.todoService.getAllTodos());
    return this.todoService.getAllTodos();
  }
  @Post()
  createNewTodo(@Body(ValidationPipe) data: CreateTodoDto) {
    return this.todoService.createTodo(data);
  }

  @Patch(':id')
  updateTodo(
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    @Param('id') id: number,
  ) {
    return this.todoService.update(id, status);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.todoService.delete(id);
  }
}
