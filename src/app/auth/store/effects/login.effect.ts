import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'

import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { AuthService } from '../../services/auth.service'
import { loginAction, loginFailureAction, loginSuccessAction } from '../actions/login.action'


@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            return loginSuccessAction({ currentUser })
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              loginFailureAction({ errors: errorResponse.error.errors })
            )
          })
        )
      })
    )
  )

  redirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(({ currentUser }) => {
          this.router.navigateByUrl('/')
        })
      ),
    { dispatch: false }
  )
}
