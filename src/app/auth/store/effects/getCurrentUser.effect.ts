import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'

import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { AuthService } from '../../services/auth.service'
import { PersistanceService } from 'src/app/shared/services/persistance.service'
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '../actions/getCurrentUser.action'

@Injectable()
export class GetCurrentUserEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
  ) {}

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        if (!this.persistanceService.get('accessToken'))
          return of (getCurrentUserFailureAction())

        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            console.log('getCurrentUser worked', currentUser)
            return getCurrentUserSuccessAction({ currentUser })
          }),

          catchError(() => {
            return of(
              getCurrentUserFailureAction()
            )
          })
        )
      })
    )
  )
}
