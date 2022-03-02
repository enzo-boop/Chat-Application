import { Component, OnInit, Output,Input } from '@angular/core';
import { FormBuilder, FormControl,FormGroup,Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() onLogin:EventEmitter<any>= new EventEmitter<any>();

  loginForm:FormGroup;

  constructor(private fb: FormBuilder) {
   this.loginForm = fb.group({
     email:new FormControl('',Validators['required']),
     password:new FormControl('',Validators['required'])
   })
    if (localStorage.getItem('users') === null) {
    let temp = [{
      id: 0,
      name: 'vincenzo',
      surname: 'donnarumma',
      email: 'vincenzodnm@outlook.it',
      phone: 3458800962,
    },
    {
      id: 1,
      name: 'salvatore',
      surname: 'ferro',
      email: 'sferro@gmail.com',
      phone: 3458800962,
    }
    ];
    localStorage.setItem('users', JSON.stringify(temp));
    }
  }
  
  logCheck(){
     if(this.loginForm.controls['email'].errors||this.loginForm.controls['password'].errors)
     console.log('invalid email or password');
     else
      this.onLogin.emit(this.loginForm.controls['email'].value);
    location.href = '';
  }

  ngOnInit(): void {
  }

}
