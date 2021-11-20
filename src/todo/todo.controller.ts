import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from '../DTO/createTodo.DTO';
import { TodoStatus } from 'src/Entity/todo.entity';
import { TodoStatusValidationPipe } from '../pipes/TodoStatusValidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../Entity/user.entity';
import { User } from 'src/auth/user.decorator';

// http://localhost:3000/api/todos
@Controller('api/todos')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {}

  //http GET verb
  @Get()
  getAlltodos(@User() user: UserEntity) {
    // console.log(this.todoService.getAllTodos());
    return this.todoService.getAllTodos(user);
  }
  @Post()
  createNewTodo(
    @Body(ValidationPipe) data: CreateTodoDto,
    @User() user: UserEntity,
  ) {
    return this.todoService.createTodo(data, user);
  }

  @Patch(':id')
  updateTodo(
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    @Param('id') id: number,
    @User() user: UserEntity,
  ) {
    return this.todoService.update(id, status, user);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number, @User() user: UserEntity) {
    return this.todoService.delete(id, user);
  }
}
