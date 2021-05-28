import { Injectable } from '@angular/core'

@Injectable()
export class PersistanceService {
  constructor() {}

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('Error saving data to localStorage', e)
    }
  }

  get(key: string): any {
    try {
      let data = localStorage.getItem(key)
      if (data)
        return JSON.parse(data)
      return null
    } catch (e) {
      console.error('Error getting data from localStorage', e)
      return null
    }
  }
}
