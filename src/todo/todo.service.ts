import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity, TodoStatus } from '../Entity/todo.entity';
import { CreateTodoDto } from '../DTO/createTodo.DTO';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private repo: Repository<TodoEntity>,
  ) {}

  async getAllTodos() {
    return await this.repo.find();
  }

  async createTodo(CreateTodoDto: CreateTodoDto) {
    const todo = new TodoEntity();
    const { title, description } = CreateTodoDto;

    todo.title = title;
    todo.description = description;
    todo.status = TodoStatus.OPEN;
    // todo.date= CreateTodoDto.createdDate;
    this.repo.create(todo);
    return await this.repo.save(todo);
  }
  async update(id: number, status: TodoStatus) {
    await this.repo.update({ id }, { status });
    return this.repo.findOne({ id });
  }
}
