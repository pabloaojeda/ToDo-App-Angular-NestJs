import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from '../DTO/createTodo.DTO';

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
}
