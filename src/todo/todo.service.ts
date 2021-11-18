import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity, TodoStatus } from '../Entity/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private repo: Repository<TodoEntity>,
  ) {}

  async getAllTodos() {
    return await this.repo.find();
  }

  async createTodo(title: string, description: string) {
    const todo = new TodoEntity();
    todo.title = title;
    todo.description = description;
    todo.status = TodoStatus.OPEN;
    this.repo.create(todo);
    return await this.repo.save(todo);
  }
}
