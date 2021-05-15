import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Selection } from '../models/selection.model';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class SelectionsService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  get userId() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    }
  }

  add(selection: Selection, userId: string) {
    const selections = this.db.list(`selections/${userId}`);
    return selections.push(selection);
  }

  addSelections(selections: Selection[]) {
    const userId = this.userId;

    if (userId) {
      selections.forEach( (selection: Selection) => {
        this.db.list(`selections/${userId}`).push(selection);
      });
    }
  }

  get(userId: string) {
    return this.db.list(`selections/${userId}`).snapshotChanges();
  }

  update(selection: Selection, userId: string) {
    return of(this.db.object(`selections/${userId}/` + selection.key)
      .update({
        id: selection.id,
        name: selection.name,
        type: selection.type,
        size: selection.size,
        area: selection.area,
        clients: selection.clients,
        active: selection.active,
        note: selection.note,
         categories:selection.categories
         

      }));
  }

  delete(selection: Selection, userId: string) {
    return this.db.object(`selections/${userId}/` + selection.key).remove();
  }
}
