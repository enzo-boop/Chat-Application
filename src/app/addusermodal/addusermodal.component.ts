import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import User from '../app.component';

@Component({
  selector: 'app-addusermodal',
  templateUrl: './addusermodal.component.html',
  styleUrls: ['./addusermodal.component.scss']
})
export class AddusermodalComponent implements OnInit {

  result: User|any;

  form: FormGroup;

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
