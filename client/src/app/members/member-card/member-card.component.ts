import { Component, computed, inject, input } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';
import { LikesService } from '../../_services/likes.service';
import { PresenceService } from '../../_services/presence.service';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  private likeService  = inject(LikesService);
  private presenceService = inject(PresenceService)
  member = input.required<Member>();
  hasLiked = computed(() => this.likeService.likesIds().includes(this.member().id));
  isOnline = computed(() => this.presenceService.onlineUsers().includes(this.member().username));



  toggleLike(){
    this.likeService.toggleLikes(this.member().id).subscribe({
      next: () => {
        if (this.hasLiked()){
          this.likeService.likesIds.update(ids => ids.filter(id => id !== this.member().id))
        } else {
          this.likeService.likesIds.update(ids => [...ids, this.member().id])
        }
      }   
    })
  }

}
