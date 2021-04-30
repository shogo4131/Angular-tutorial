import { Injectable } from '@angular/core';
import { Member } from './member';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const members = [
      { id: 11, name: '田中太郎' },
      { id: 12, name: '田中一郎' },
      { id: 13, name: '田中二浪' },
      { id: 14, name: '田中三浪' },
      { id: 15, name: '田中吾郎' },
      { id: 16, name: '田中六郎' },
      { id: 17, name: '田中七浪' },
      { id: 18, name: '田中八郎' },
      { id: 19, name: '田中九浪' },
    ];
    return { members };
  }

  genId(members: Member[]): number {
    return members.length > 0
      ? Math.max(...members.map((member) => member.id)) + 1
      : 11;
  }
}
