import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private memberUrl = 'api/members';
  httpOption = {
    headers: new HttpHeaders({ ContentType: 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // 非同期処理(メンバーリスト)
  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.memberUrl).pipe(
      tap(() => this.log('社員データを取得しました')),
      catchError(this.handleError<Member[]>('getMembers', []))
    );
  }

  // 非同期処理(メンバー詳細)
  getMember(id: number): Observable<Member> {
    const url = `${this.memberUrl}/${id}`;
    return this.http.get<Member>(url).pipe(
      tap((_) => this.log(`社員データid=${id}を取得した`)),
      catchError(this.handleError<Member>(`getMember id=${id}`))
    );
  }

  // 非同期処理(メンバー更新)
  updateMember(member: Member): Observable<any> {
    return this.http.put(this.memberUrl, member, this.httpOption).pipe(
      tap((_) => this.log(`社員データ${member.id}を更新しました`)),
      catchError(this.handleError<any>('updateMember'))
    );
  }

  // 非同期処理(メンバー追加)
  addMember(member: Member): Observable<Member> {
    return this.http
      .post<Member>(this.memberUrl, member, this.httpOption)
      .pipe(
        tap(
          (newMember: Member) =>
            this.log(`社員データ${newMember.name}を追加しました`),
          catchError(this.handleError<Member>('addMember'))
        )
      );
  }

  // 非同期処理(メンバー削除)
  deleteMember(member: Member | number): Observable<Member> {
    const id = typeof member === 'number' ? member : member.id;
    const url = `${this.memberUrl}/${id}`;

    return this.http
      .delete<Member>(url, this.httpOption)
      .pipe(
        tap(
          (_) => this.log(`社員データ${id}を削除しました`),
          catchError(this.handleError<Member>('deleteMember'))
        )
      );
  }

  // 非同期処理(メンバー検索)
  searchMembers(term: string): Observable<Member[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<Member[]>(`${this.memberUrl}/?name=${term}`)
      .pipe(
        tap(
          (_) => this.log(`${term}に該当する社員が見つかりました`),
          catchError(this.handleError<Member[]>('searchMember', []))
        )
      );
  }

  // ログ出力
  private log(message: string) {
    this.messageService.addMessage(`MessageService: ${message}`);
  }

  // 例外処理
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      this.log(`${operation} 失敗: ${error.message}`);

      return of(result as T);
    };
  }
}
