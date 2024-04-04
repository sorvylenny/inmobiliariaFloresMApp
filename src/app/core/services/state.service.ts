import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  constructor() { }
  getIsLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }

  getIsLoggedInFromLocalStorage(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn ? JSON.parse(isLoggedIn) : false;
  }
}
