import { Component, OnInit, ViewChild } from '@angular/core';
import { Material } from '../materials/models/material.model'; 
import { Structure } from './utils/structure';
import { StructureService } from './utils/structure.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit {
  @ViewChild('structureForm', { static: true })
confirm:string;
  structureData: Subject<Structure> = new Subject();
  structureForm: NgForm ;
  materials: Material[];
  structures:Structure[];
  structure: Structure = {};
  categories:Structure[]
  loading = false;
  // types = [ "category", "finish", "option","size","material"];
  open : boolean= false
  cat:Structure ={ };
  constructor(private service: StructureService) { }

  ngOnInit() {
    this.getAllMaterials();
    this.getAllStructures(); 
    
  }
 

 



getAllStructures() {
  this.loading = true;
  const x = this.service.getStructures();
  x.snapshotChanges().subscribe(
    (structure:any) => {
      this.loading = false;
      this.structures = [];
      this.categories = []
      structure.forEach((element:any) => {
        const y = { ...element.payload.toJSON(), key: element.key };
        y.type == "category"? this.categories.push(y as Structure) : this.structures.push(y as Structure);
           });
    }
    
  );
}


// getStructureById(id:any){
//   const x = this.service.getStructureById(id);
//   x.snapshotChanges().subscribe(
//     (material:any) => {
//       this.loading = false;
//       this.materials = [];
//       material.forEach((element:any) => {
//         const y = { ...element.payload.toJSON(), $key: element.key };
//         this.materials.push(y as Material);
//       });
//     }
    
//   );
// }

onSave(x:any){
  if( x.valid){  
   let y = x.value
   y.parent= null
   
   y.type = "category"
   this.service.createStructures(this.objify(y), [""])} else {alert( "Form invalid")}
 }
remove(key:any){

  if(this.confirm == key){ this.service.deleteStructure(key)}else{ this.confirm =key; alert("Click delete button again to delete the record permenantly")}
  }
view(key:any){
  console.log("view",key);
  
}
require(req:any,key:any){
this.service.requireStructure(req,key)
  
}
getAllMaterials() {
  this.loading = true;
  const x = this.service.getMaterials();
  x.snapshotChanges().subscribe(
    (material:any) => {
      this.loading = false;
      this.materials = [];
      material.forEach((element:any) => {
        const y = { ...element.payload.toJSON(), key: element.key };
        
        this.materials.push(y);
      });
    }
    
  );
}
 objify(x:any) {
   console.log(x);
   
  Object.values(x).forEach((el:any) => {
    el==undefined? el=null: null

  });
  return(x)
}
 

}
