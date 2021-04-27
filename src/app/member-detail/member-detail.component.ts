import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../member.service';
import { Member } from '../member';
import { Location } from '@angular/common';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  @Input() member: Member;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMember();
  }

  public getMember() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.memberService
      .getMember(id)
      .subscribe((member) => (this.member = member));
  }

  goBack() {
    this.location.back();
  }
}
