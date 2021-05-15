import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Option } from '../models/option.model';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  get userId() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    }
  }

  add(option: Option, userId: string) {
    const options = this.db.list(`options/${userId}`);
    return options.push(option);
  }

  addOptions(options: Option[]) {
    const userId = this.userId;

    if (userId) {
      options.forEach( (option: Option) => {
        this.db.list(`options/${userId}`).push(option);
      });
    }
  }

  get(userId: string) {
    return this.db.list(`options/${userId}`).snapshotChanges();
  }

  update(option: Option, userId: string) {
    return of(this.db.object(`options/${userId}/` + option.key)
      .update({
        id: option.id,
        name: option.name,
        type: option.type,
        size: option.size,
        area: option.area,
        clients: option.clients,
        active: option.active,
        note: option.note,
        categories:option.categories
         

      }));
  }

  delete(option: Option, userId: string) {
    return this.db.object(`options/${userId}/` + option.key).remove();
  }
}
