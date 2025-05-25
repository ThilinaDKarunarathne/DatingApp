import { AfterViewChecked, Component, inject, input,viewChild,ViewChild } from '@angular/core';
import { MessageService } from '../../_services/message.service';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  imports: [TimeagoModule, FormsModule],
  standalone: true,
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements AfterViewChecked{
  @ViewChild('messageForm') messageForm?: any;
  @ViewChild('scrollMe') scrollContainer?: any;
  messageService = inject(MessageService);
  username = input.required<string>();
  messageContent = '';
  loading = false;
  
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  private scrollToBottom() {
    if(this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }
  sendMessage() {
    this.loading = true;
    this.messageService.sendMessage(this.username(), this.messageContent).then(() => {
      this.messageForm?.reset();
      this.scrollToBottom();
    }).finally(() => this.loading = false);
    
    

  }
}
