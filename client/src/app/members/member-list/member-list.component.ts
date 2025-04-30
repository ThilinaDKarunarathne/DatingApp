import { ImplicitReceiver } from '@angular/compiler';
import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
<<<<<<< HEAD
    selector: 'app-member-list',
    imports: [MemberCardComponent],
    templateUrl: './member-list.component.html',
    styleUrl: './member-list.component.css'
=======
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
>>>>>>> 9f6d4a6549240ebac489048959e6e8c46f92b5fc
})
export class MemberListComponent implements OnInit{
  private memberService = inject(MembersService);
  members: Member[] = [];

  ngOnInit(): void {
      this.loadMembers();
      }

  loadMembers(){
    this.memberService.getMembers().subscribe({
      next: members => this.members = members,
      error: error => console.log(error.detail)
    })
  }
}
