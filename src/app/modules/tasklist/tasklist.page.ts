import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonList, LoadingController, ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { TaskFormComponent } from './taskform/taskform.component';
import { TaskListService } from './tasklist.service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.page.html',
  styleUrls: ['./tasklist.page.scss'],
})
export class TasklistPage implements OnInit {
  @ViewChild(IonList) ionList : IonList;

  searchText:String;
  task:Task;
  action: String;
  taskListArray = [];

  constructor(
    private modalController: ModalController, 
    private toastController: ToastController, 
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController,
    private tasklistService: TaskListService
  ) {
    this.action = 'NUEVA TAREA';
  }

  ngOnInit() {
    this.getTaskList();
    this.presentLoading();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere...',
      duration: 3000
    });
    loading.present();
  
  }
  async presentToast(_message:any, _color: any) {
    const toast = await this.toastController.create({
      color: _color,
      message: _message,
      duration: 3000,
      cssClass: 'toast-custom-class'
    });
    toast.present();
  }

  async presentActionSheet(id) {
    const actionSheet = await this.actionSheetController.create({
      header: '¿Esta seguro de  Eliminar la Tarea?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.ionList.closeSlidingItems();
          console.log(id);
          this.delete(id);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          this.ionList.closeSlidingItems();
        }
      }]
    });
    await actionSheet.present();
  }

  addTask(){
    this.task = {} as Task;
    this.task.start = new Date().toISOString();
    this.task.hour = new Date().toISOString();
    this.action = "Nueva Tarea";
    this.showTaskForm(this.task);
  }

  getTaskList (){
    this.tasklistService.getTaskList().subscribe((data)=>{       
      this.taskListArray = data.map(e => {
        return {
          id: e.payload.doc.id,          
          title: e.payload.doc.data()['title'],
          description: e.payload.doc.data()['description'],
          start: e.payload.doc.data()['start'],
          hour: e.payload.doc.data()['hour'],
          status: e.payload.doc.data()['status']
        };
      })
    });
  }

  insertTask(_task: Task){     
    this.tasklistService.insertTask(_task).then(()=>{     
      this.task = {} as Task;
      this.presentToast("Registro Exitoso", "success");   
    }, (error) =>{
      this.presentToast(error, "danger");     
    });
  }

  updateTask(id: String, _task: Task){  
    this.tasklistService.updateTask(id, _task).then(()=>{   
      this.presentToast("Actualizacion Exitosa", "success");  
    }, (error) =>{
      this.presentToast(error, "danger");
    });
  }

  editTask(task){
    this.task =  task as Task;
    this.action = "Editar Tarea";
    this.showTaskForm(this.task);
    this.ionList.closeSlidingItems();
  }

  deleteTask(task){
    let taskId = task.id;
    this.presentActionSheet(taskId);
  }

  delete(id: string) {
    this.presentLoading();
    this.tasklistService.deleteTask(id).then(()=>{
      this.presentToast("Eliminacion Correcta", "success");
      this.getTaskList();
      this.loadingController.dismiss();
    },(error) =>{
      this.presentToast(error, "danger");
      this.loadingController.dismiss();
    })
  }

  done(task){
    this.task = task as Task;
    this.task.status = true;
    this.updateTask( this.task.id, this.task);
  }

  async showTaskForm(task: Task){
    const modal = await this.modalController.create({
      component: TaskFormComponent,
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      componentProps: {
        task: this.task,
        action: this.action
      }
    });
    
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if(!data){
      return;
    }
    if(data.id)
      this.updateTask(data.id, data);
    else
      this.insertTask(data);
  }

  onSearchChange(event){
    this.searchText = event.target.value;    
  }
}
