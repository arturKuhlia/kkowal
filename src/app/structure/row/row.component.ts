import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Material } from 'src/app/materials/models/material.model';
import { Structure } from '../utils/structure';
 import { StructureService } from '../utils/structure.service';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {
  @Input() catKey:any
  @Input() mats:any
  @ViewChild('subStructureForm', { static: true })
  confirm:string;
  subStructureData: Subject<Structure> = new Subject();
  subStructureForm: NgForm ;
  materials: Material[];
  structures:Structure[];
  structure: Structure = {};
  cat:Structure = {};
  options :any
  types = [ "category", "finish", "option","size","material"];
  open : boolean= false

  categ :string //chosen categ
   
  constructor(private service : StructureService ) { }

  ngOnInit() {
    this.getAllMaterials()
    this.service.getStructureById(this.catKey).snapshotChanges().subscribe(
      (el:any) => {
        const y = { ...el.payload.toJSON(), key: el.key };
        
       this.cat=y
        const values = Object.keys(y.options).map(key => y.options[key])
       


        this.options = values
       
         

      }
      
    );
    
    this.options==undefined? this.options=["0"]:null;
     
  }
   

  getAllMaterials() {
   
    const x = this.service.getMaterials();
    x.snapshotChanges().subscribe(
      (material:any) => {
     
        this.materials = [];
        material.forEach((element:any) => {
          const y = { ...element.payload.toJSON(), key: element.key };
          
          this.materials.push(y);
        });
      }
      
    );
  }


  choose(key:string){
    this.categ = key
  }

  onSave(x:any){
 
              
    if( x.valid){  
      x.value.parent = this.catKey 
       

      this.service.createStructures(this.objify(x.value), this.options)} else {alert( "Form invalid")}
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

  objify(x:any) {
  
   Object.values(x).forEach((el:any) => {
     el==undefined? el=null: null
   });
   return(x)
 }
}
