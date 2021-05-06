import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  // プロパティ(state)を定義
  members: Member[];

  // serviceを定義
  constructor(private memberService: MemberService) {}

  // ライフサイクルメソッド
  ngOnInit(): void {
    this.getMembers();
  }

  // 初期表示
  getMembers(): void {
    this.memberService
      .getMembers()
      .subscribe((members) => (this.members = members));
  }

  // メンバーを追加する
  public addMemberName(name: string) {
    name = name.trim();
    if (!name) {
      return;
    }
    this.memberService.addMember({ name } as Member).subscribe((member) => {
      this.members.push(member);
    });
  }

  // メンバーを削除する
  public deleteMemberName(member: Member) {
    this.members = this.members.filter((m) => m !== member);
    this.memberService.deleteMember(member).subscribe();
  }
}
