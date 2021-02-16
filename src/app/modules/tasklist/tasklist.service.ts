import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  COLLECTION:any = "tasklist";
  constructor(private angularFireStore: AngularFirestore) { }

  insertTask(data){
    return this.angularFireStore.collection(this.COLLECTION).add(data);
  }
  
  updateTask(id, task) {
    return this.angularFireStore.doc(this.COLLECTION + '/' + id).update(task);
  }

  getTaskList(){
    return this.angularFireStore.collection(this.COLLECTION, ref => ref.orderBy('start','asc')).snapshotChanges();
    
  }

  searchTaskList(){
    return this.angularFireStore.collection(this.COLLECTION, ref => ref.where("description", "array-contains", "valeria")).snapshotChanges();    
  }

 

  deleteTask(id) {
    return this.angularFireStore.doc(this.COLLECTION + '/' + id).delete();
  }  
}