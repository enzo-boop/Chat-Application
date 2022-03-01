import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import User from '../app.component';

@Component({
  selector: 'app-addusermodal',
  templateUrl: './addusermodal.component.html',
  styleUrls: ['./addusermodal.component.scss']
})
export class AddusermodalComponent implements OnInit {

  form: FormGroup;

  Check(){
    let value;
    if (this.form.controls['name'].errors || this.form.controls['surname'].errors || this.form.controls['phone'].errors || this.form.controls['email'].errors) {
      console.warn('invalid fields');
  }
    else {
      let newUser: User = {
        id: JSON.parse(localStorage!.getItem('users')!).length,
        name: this.form.controls['name'].value,
        surname: this.form.controls['surname'].value,
        email: this.form.controls['email'].value,
        phone: this.form.controls['phone'].value,
      }
      value = newUser;
      this.addUser(value);
    }
  }

  addUser(user: User) {
    console.log(user);
    let temp = JSON.parse(localStorage!.getItem('users')!).map((elem: User) => { return elem });
    temp.push(user);
    localStorage.setItem('users', JSON.stringify(temp));
  }

  constructor(private fb:FormBuilder) {
    this.form = this.fb.group({   
      name: new FormControl('', Validators['required']),
      surname: new FormControl('', Validators['required']),
      phone: new FormControl('', Validators['required']),
      email: new FormControl('', Validators['required']),
    })}

  ngOnInit(): void {
  }

}
