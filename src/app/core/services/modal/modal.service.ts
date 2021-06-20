import { Injectable, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public modalOpened: Subject<TemplateRef<any>> = new Subject();

  constructor() { }
}
