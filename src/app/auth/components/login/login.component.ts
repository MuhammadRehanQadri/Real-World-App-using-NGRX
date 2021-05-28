import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { loginAction } from '../../store/actions/login.action';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';
import { LoginRequestInterface } from '../../types/loginRequest.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorsInterface | null>
  
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }
  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }
  initializeForm(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onFormSubmit() {
    console.log('form', this.form.value, this.form.valid)
    const request: LoginRequestInterface = {
      user: this.form.value,
    }
    this.store.dispatch(loginAction({ request }))
  }
}
