import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { registerAction } from '../../store/actions/register.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup

  constructor(private formBuilder: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.initializeForm()
  }
  initializeForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onFormSubmit(){
    console.log('form', this.form.value, this.form.valid)
    this.store.dispatch(registerAction(this.form.value))
  }
}
