import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  hubUrl = environment.hubsUrl;
  private hubConnection?: HubConnection;
  private toaster = inject(ToastrService);
  private router = inject(Router);

  onlineUsers = signal<string[]>([]);


  createHubConnection(user: User) {
    
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection.start().catch(error => console.log(error));
    this.hubConnection.on('UserIsOnLine', username => {
      this.onlineUsers.update(users => [...users, username]);
    });

    this.hubConnection.on('UserIsOffLine', username => {
      this.onlineUsers.update(users => users.filter(x => x !== username));
    });
    
    this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
      this.onlineUsers.set(usernames);
    });

    this.hubConnection.on('NewMessageRecieved', ({username, knownAs}) => {
      this.toaster.info(knownAs + ' has sent you a new message! Click here to read')
      .onTap
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl('/members/' + username + '?tab=Messages'));
      
    })	

  }

  stopHubConnection() {
    if (this.hubConnection?.state === HubConnectionState.Connected){
      this.hubConnection.stop().catch(error => console.log(error))
      
    }
  }

}
