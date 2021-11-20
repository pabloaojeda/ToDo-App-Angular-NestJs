import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity, TodoStatus } from '../Entity/todo.entity';
import { CreateTodoDto } from '../DTO/createTodo.DTO';
import { UserEntity } from '../Entity/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private repo: Repository<TodoEntity>,
  ) {}

  async getAllTodos(user: UserEntity) {
    const query = await this.repo.createQueryBuilder('todo');

    query.where('todo.userId = :userId', { userId: user.id });

    try {
      return await query.getMany();
    } catch (err) {
      throw new NotFoundException('No todo found');
    }
  }

  async createTodo(CreateTodoDto: CreateTodoDto, user: UserEntity) {
    const todo = new TodoEntity();
    const { title, description } = CreateTodoDto;

    todo.title = title;
    todo.description = description;
    todo.status = TodoStatus.OPEN;
    todo.userId = user.id;
    // todo.date= CreateTodoDto.createdDate;
    this.repo.create(todo);
    return await this.repo.save(todo);
  }
  async update(id: number, status: TodoStatus, user: UserEntity) {
    try {
      await this.repo.update({ id, userId: user.id }, { status });
      return this.repo.findOne({ id });
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
  async delete(id: number, user: UserEntity) {
    const result = await this.repo.delete({ id, userId: user.id });

    if (result.affected == 0) {
      throw new NotFoundException('Todo not deleted');
    } else {
      return { success: true };
    }

    // try {
    //   return await this.repo.delete({ id });
    // } catch (err) {
    //   throw new InternalServerErrorException('Something went wrong');
    // }
  }
}
