import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl,FormGroup,Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { window } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() onLogin:EventEmitter<any>= new EventEmitter<any>();

  loginForm:FormGroup;

  constructor(private fb:FormBuilder) { 
   
   this.loginForm = fb.group({
     email:new FormControl('',Validators['required']),
     password:new FormControl('',Validators['required'])
   })

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
