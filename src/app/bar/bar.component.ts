import { Component, Input, OnInit } from '@angular/core';
import User from '../app.component';
import { MatDialog } from '@angular/material/dialog';
import { AddusermodalComponent } from '../addusermodal/addusermodal.component';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  @Input() currentId: number = -1;

  currentFriends: Array<User> = JSON.parse(localStorage!.getItem('users')!).map((el: any) => { return el });

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

  openDialog() {
    let dialogRef = this.dialog.open(AddusermodalComponent);
  }

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  
  }

}
