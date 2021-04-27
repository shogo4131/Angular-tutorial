import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  // プロパティ(state)を定義
  members: Member[];
  selectedMember: Member;

  // serviceを定義
  constructor(
    private memberService: MemberService,
    private messageService: MessageService
  ) {}

  // ライフサイクルメソッド
  ngOnInit(): void {
    this.getMembers();
  }

  // serviceから取得したデータをmembersプロパティに入れる
  getMembers(): void {
    this.memberService
      .getMember()
      .subscribe((members) => (this.members = members));
  }

  // 関数定義
  public clickMemberFunc(member: Member) {
    this.selectedMember = member;
    this.messageService.addMessage(
      `MemberComponent: 社員データ${member.id}が選択されました`
    );
  }
}
