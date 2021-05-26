import {
  AngularFireList,
  AngularFireObject,
  AngularFireDatabase,
} from "@angular/fire/database";
import { Structure } from "./structure";
import { Injectable } from "@angular/core";
import { Material } from "src/app/materials/models/material.model";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class StructureService {
  structures: AngularFireList<Structure>;
  structure: AngularFireObject<Structure>;

  materials: AngularFireList<Material> ;
  material: AngularFireObject<Material>;


  constructor(private db: AngularFireDatabase,private afAuth: AngularFireAuth) {
    this.getStructures();
  }
  
  get userId() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.uid;
    }
  }
  

  createStructures(data: Structure, arr:string[]) {
  
 let t =this.structures.push(data).key
 if (data.parent ){

// if (!arr) {
//   arr=["0"]
// }
  
 t?arr.push(t):null
 this.db.object("structures/" + data.parent).update( {options:arr})
}
  // data.options = ["0"]
 

  }

  getStructures() {
    this.structures = this.db.list("structures");
    return this.structures;
  }
  

  getStructureById(key: string) {
    this.structure = this.db.object("structures/" + key);
    return this.structure;
  }

  updateStructure(data: Structure) {
    this.structures.update(data.key, data);
  }


requireStructure( data:boolean, key:any){
  this.db.object("structures/" + key).update({ required: data  })
   
}
  

  deleteStructure(key: string) {
    this.structures.remove(key);
  }


  getMaterials() {
    this.materials = this.db.list("materials");
    return this.materials;
  }

}