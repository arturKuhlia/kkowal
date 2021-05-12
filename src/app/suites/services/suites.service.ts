import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Suite } from '../models/suite.model';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class SuitesService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  get userId() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    }
  }

  add(suite: Suite, userId: string) {
    const suites = this.db.list(`suites/${userId}`);
    return suites.push(suite);
  }

  addSuites(suites: Suite[]) {
    const userId = this.userId;

    if (userId) {
      suites.forEach( (suite: Suite) => {
        this.db.list(`suites/${userId}`).push(suite);
      });
    }
  }

  get(userId: string) {
    return this.db.list(`suites/${userId}`).snapshotChanges();
  }

  update(suite: Suite, userId: string) {
    return of(this.db.object(`suites/${userId}/` + suite.key)
      .update({
        id: suite.id,
        name: suite.name,
        type: suite.type,
        size: suite.size,
        area: suite.area,
        clients: suite.clients,
        active: suite.active,
        note: suite.note,
         categories:suite.categories
         

      }));
  }

  delete(suite: Suite, userId: string) {
    return this.db.object(`suites/${userId}/` + suite.key).remove();
  }
}
