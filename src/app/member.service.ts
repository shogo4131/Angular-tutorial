import { Injectable } from '@angular/core';
import { MEMBERS } from './dummyData/dummyData';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private memberUrl = 'api/members';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // 非同期処理(メンバーリスト)
  getMembers(): Observable<Member[]> {
    this.messageService.addMessage('message: 社員一覧データを取得しました.');
    return this.http.get<Member[]>(this.memberUrl);
  }

  getMember(id: number): Observable<Member> {
    this.messageService.addMessage(
      `MemberService: 社員データid=${id}を取得した`
    );
    return of(MEMBERS.find((member) => member.id === id));
  }

  private log(message: string) {
    this.messageService.addMessage(`MessageService: ${message}`);
  }
}
