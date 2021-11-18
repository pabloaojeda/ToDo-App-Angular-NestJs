import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  getAllTodos(): [string, string] {
    return ['Todo1', 'Todo2'];
  }
}
