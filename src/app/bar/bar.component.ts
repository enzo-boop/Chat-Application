import { Component, Input, OnInit } from '@angular/core';
import User from '../app.component';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  @Input() currentId: number = -1;

  @Input() currentFriends: Array<User> = [];

  badgeCount(friendId: any): number {
    let value = 0;
    let comboChat: any = [this.currentId + '/' + friendId, friendId + '/' + this.currentId];
    if (localStorage.getItem('list')) {
      let currentChat = JSON.parse(localStorage.getItem('list')!).filter((elem: any) => {return elem.id===comboChat[0]||elem.id===comboChat[1] });
      if (currentChat.length !== 0) {
        currentChat = currentChat[0];
      currentChat.storedMessage.map((elem: any) => { elem.sender !== this.currentId.toString() ? value++ : value = 0 })
      }
    }
    location.href.slice(22, location.href.length) === comboChat[0] || location.href.slice(22, location.href.length) === comboChat[1]?value=0:null;
    return value
  };

  constructor() {
 
  }

  ngOnInit(): void {
  
  }

}
