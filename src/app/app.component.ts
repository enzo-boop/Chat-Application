import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

export default interface User{
  id:number;
  name:string;
  surname:string;
  email:string;
  phone:number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'chatapp'

  friendList:Array<User>=
  [
  {
    id:0,
    name:'Salvatore',
    surname:'Ferro',
    email:'sferro@gmail.com',
    phone:3333334443
  },
  {
    id:1,
    name:'Vincenzo',
    surname:'Donnarumma',
    email:'vincenzodnm@outlook.it',
    phone:4444443334
  }
];

  logged:any = {
    trusted:false,
    id:-1
  };

  matchEmail(email:string){
    let temp = this.friendList.filter((el)=>{return el.email==email});
    if(temp.length!==0)
    {
    this.logged.id=temp[0].id;
    this.logged.trusted=true;
    console.log('logged');
    localStorage.setItem('logged',JSON.stringify(this.logged));
    }
    else
    console.log('no matching emails');
  }

  logOut(){
    this.logged.id=-1;
    this.logged.trusted=false;
    localStorage.removeItem('logged');
  }

  cleanCache() {
    localStorage.clear();
    location.href = '';
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe((result) => { result === true ? this.cleanCache() : null });
  }

  constructor(private dialog: MatDialog) {
    if(JSON.parse(localStorage.getItem('logged')!)!==null){
      this.logged = (JSON.parse(localStorage.getItem('logged')!));
    }
    
  }

}


