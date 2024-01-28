/* Angular */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  /* ----- Public methods --------------------------------------------------------------------------------------------------------------- */

  public get(key: string): unknown {
    const value: string | null = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : value;
  }

  public set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

}
