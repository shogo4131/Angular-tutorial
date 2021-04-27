import { Injectable } from '@angular/core';
import { MEMBERS } from './dummyData/dummyData';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private messageService: MessageService) {}

  // 非同期処理(メンバーリスト)
  getMember(): Observable<Member[]> {
    this.messageService.addMessage('message: 社員一覧データを取得しました.');
    return of(MEMBERS);
  }
}
