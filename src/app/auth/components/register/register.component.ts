import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { AppStateInterface } from 'src/app/shared/types/appState.interface'

import { registerAction } from '../../store/actions/register.action'
import { isSubmittingSelector } from '../../store/selectors'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup
  isSubmitting$!: Observable<boolean>

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppStateInterface>,
  ) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }
  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }
  initializeForm(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onFormSubmit() {
    console.log('form', this.form.value, this.form.valid)
    this.store.dispatch(registerAction(this.form.value))
  }
}
