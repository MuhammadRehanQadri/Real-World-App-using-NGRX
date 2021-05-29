import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import {
  currentUserSelector,
  isAnonymousSelector,
  isLoggedInSelector,
} from 'src/app/auth/store/selectors'
import { AppStateInterface } from 'src/app/shared/types/appState.interface'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean | null>
  currentUser$!: Observable<CurrentUserInterface | null>
  isAnonymous$!: Observable<boolean>

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.initializeValues()
  }
  initializeValues() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))
  }
}
