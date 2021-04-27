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

  // serviceから取得したデータをmembersプロパティに入れる
  getMembers(): void {
    this.memberService
      .getMembers()
      .subscribe((members) => (this.members = members));
  }
}
