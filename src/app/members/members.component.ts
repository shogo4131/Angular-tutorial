import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MEMBERS } from '../dummyData';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members = MEMBERS;
  member: Member = {
    id: 1,
    name: '山田太郎',
  };

  selectedMember: Member;

  constructor() {}

  ngOnInit(): void {}

  clickMemberFunc(member: Member) {
    this.selectedMember = member;
  }
}
