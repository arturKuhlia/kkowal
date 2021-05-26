import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Material } from '../models/material.model';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  get userId() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    }
  }

  // add(material: Material, userId: string) {
  add(material: Material, userId: string) {
    console.log(userId);
     
    const materials = this.db.list(`materials`);
    return materials.push(material);
  }

  addMaterials(materials: Material[]) {
    const userId = this.userId;

    if (userId) {
      materials.forEach( (material: Material) => {
        this.db.list(`materials/`).push(material);
      });
    }
  }

  get(userId: string) {
    console.log(userId);
    return this.db.list(`materials`).snapshotChanges();
  }

  update(material: Material, userId: string) {
    console.log(userId);
    return of(this.db.object(`materials/` + material.key)
      .update({
        id: material.id,
        name: material.name,
        type: material.type,
        size: material.size,
        area: material.area,
        clients: material.clients,
        active: material.active,
        note: material.note,
         categories:material.categories
         

      }));
  }

  delete(material: Material, userId: string) {
    console.log(userId);
    return this.db.object(`materials/` + material.key).remove();
  }
}
