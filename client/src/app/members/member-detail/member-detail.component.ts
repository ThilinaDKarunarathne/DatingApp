import { Component, inject } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';
<<<<<<< HEAD
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
=======
>>>>>>> 9f6d4a6549240ebac489048959e6e8c46f92b5fc


@Component({
  selector: 'app-member-detail',
  standalone: true,
<<<<<<< HEAD
  imports: [TabsModule, GalleryModule] ,
=======
  imports: [TabsModule] ,
>>>>>>> 9f6d4a6549240ebac489048959e6e8c46f92b5fc
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent {
  private memberSetvice = inject(MembersService);
  private route = inject(ActivatedRoute);
  member?: Member;
<<<<<<< HEAD
  images: GalleryItem[] = [];

=======
>>>>>>> 9f6d4a6549240ebac489048959e6e8c46f92b5fc
  

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberSetvice.getMember(username).subscribe({
<<<<<<< HEAD
      next: member => {
        this.member = member;
        member.photos.map(p => {
          this.images.push(new ImageItem  ({src: p.url, thumb: p.url}))
        })
    }
  })
 }
=======
      next: member => this.member = member
    })
  }
>>>>>>> 9f6d4a6549240ebac489048959e6e8c46f92b5fc

}
