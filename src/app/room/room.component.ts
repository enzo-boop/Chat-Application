import { Component, OnInit} from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  Id!: string;

  roomId!: string | null;

  helperId: any = this.activatedRoute.snapshot.paramMap.get('id');

  messageHistory:Array<any>=[];
  
  Check(ev:Event) {
    if (this.message.controls['body'].errors) {
      this.message.controls['body'].reset;
      document.getElementsByClassName('mat-form-field')[0].animate({ transform: ['translateX(-10px)', 'translateX(10px)', 'translateX(-10px)', 'translateX(10px)', 'translateX(0px)'] },
        { duration: 300, iterations: 1 });
    }
    else
      this.sendMessage();
  }

  sendMessage() {
    this.roomId = this.activatedRoute.snapshot.paramMap.get('id') + '/' + this.activatedRoute.snapshot.paramMap.get('id2');
   //Ora messaggio
   let tempDate:Date = new Date();
   //messageData= dati messaggio e oraMessagGio
    let messageData: any = {
     sender: this.activatedRoute.snapshot.paramMap.get('id'),
     body:this.message.controls['body'].value,
     time:tempDate.toLocaleTimeString(),
   }
   this.message.controls['body'].reset();
   this.messageHistory.push(messageData);
   //obj= idchatRoom e messageHistory
   let obj ={
     id: this.roomId,
     storedMessage: this.messageHistory,
  }
  //Funzioni di salvataggio in storage
   let tempHistories= JSON.parse(localStorage.getItem('list')!);
    tempHistories === null ?
      tempHistories = [] :
      tempHistories = tempHistories.filter((el: any) => { return el.id === this.roomId });
    if (tempHistories.length === 0) {
      tempHistories.push(obj);
    }
   else{
      tempHistories = tempHistories.filter((el: any) => { return el.id !== this.roomId });
     tempHistories.push(obj);
   }
    localStorage.setItem('list', JSON.stringify(tempHistories));
    console.log(JSON.parse(localStorage.getItem('list')!));
  }

  message:FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    this.message = fb.group({
      body: new FormControl('', Validators['required']),
   });
    this.messageHistory = JSON.parse(localStorage.getItem('list')!);
    if (this.messageHistory === null) {
      this.messageHistory = [];
    }
    else {
      this.messageHistory = this.messageHistory.filter((el: any) => { let possibleComb = [this.activatedRoute.snapshot.paramMap.get('id') + '/' + this.activatedRoute.snapshot.paramMap.get('id2'), this.activatedRoute.snapshot.paramMap.get('id2') + '/' + this.activatedRoute.snapshot.paramMap.get('id')]; return (el.id === possibleComb[0] ||el.id===possibleComb[1])});
      this.messageHistory.length !== 0 ? this.messageHistory = this.messageHistory[0].storedMessage : this.messageHistory=[];
      }
  }

  ngOnInit(): void {
    let temp = this.activatedRoute.snapshot.paramMap.get('id')! + '/' +this.activatedRoute.snapshot.paramMap.get('id2')!;
    if (temp)
      this.Id = temp;
  }


}
