import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

import { RegisterRequestInterface } from '../types/registerRequest.interface'
import { environment } from 'src/environments/environment'
import { AuthResponseInterface } from '../types/authResponse.interface'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { LoginRequestInterface } from '../types/loginRequest.interface'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/api/users'

    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map((response: AuthResponseInterface) => response.user))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/api/users/login'

    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map((response: AuthResponseInterface) => response.user))
  }
}
