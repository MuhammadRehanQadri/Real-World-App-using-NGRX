import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { PersistanceService } from './persistance.service'

@Injectable()
export class AuthinterceptorService implements HttpInterceptor {
  constructor(private persistanceService: PersistanceService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.persistanceService.get('accessToken')
    if (token)
      req = req.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
        },
      })

    return next.handle(req)
  }
}
