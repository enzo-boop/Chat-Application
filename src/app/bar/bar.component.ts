import { Component, Input, OnInit,Output } from '@angular/core';
import User from '../app.component';
import { MatDialog } from '@angular/material/dialog';
import { AddusermodalComponent } from '../addusermodal/addusermodal.component';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  @Output() userAdded: EventEmitter<any> = new EventEmitter<any>();

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

  openDialog() {
    let dialogRef = this.dialog.open(AddusermodalComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res !== false) {
        this.addUser(res);
      }
    })
  }

  addUser(user: any) {
    if (user !== undefined) {
    let newUser: User = {
      id: JSON.parse(localStorage!.getItem('users')!).length,
      name: user.name,
      surname: user.surname,
      phone:user.phone,
      email:user.email,
    }
    let temp = JSON.parse(localStorage!.getItem('users')!).map((elem: User) => { return elem });
    temp.push(newUser);
    localStorage.setItem('users', JSON.stringify(temp));
      this.userAdded.emit();
    }
  }

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

}
