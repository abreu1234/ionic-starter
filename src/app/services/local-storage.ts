import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorage {

  constructor(private storage: Storage) {
  }

  setSkipIntroPage(val: boolean): Promise<any> {
    return this.storage.set('skipIntroPage', val);
  }

  getSkipIntroPage(): Promise<any> {
    return this.storage.get('skipIntroPage');
  }

  setLang(val: string): Promise<any> {
    return this.storage.set('lang', val);
  }

  getLang(): Promise<any> {
    return this.storage.get('lang');
  }

  getIsPushEnabled(): Promise<boolean> {
    return this.storage.get('isPushEnabled');
  }

  setIsPushEnabled(val: boolean) {
    return this.storage.set('isPushEnabled', val);
  }
}
