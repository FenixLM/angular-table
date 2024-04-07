import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialogClosed: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
}
