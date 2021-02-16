import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Task } from '../../../interfaces/task';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-taskform',
  templateUrl: './taskform.component.html',
  styleUrls: ['./taskform.component.scss'],
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task;
  @Input() action: String; 
  
  customPickerOptions: any;
  customTimeOptions: any;

  validations_form: FormGroup;

  constructor(private modalController: ModalController, public formBuilder: FormBuilder) {
    this.customPickerOptions = {
      buttons: [{
        text: 'OK',
        handler: () => {
         
        }
      }, {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {          
          return false;
        }
      }]
    }

    this.customTimeOptions = {
      buttons: [{
        text: 'OK',
        handler: () => {
        
        }
      }, {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {          
          return false;
        }
      }]
    }
  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      title: new FormControl(this.task.title, Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.required
      ])),
      description: new FormControl(this.task.description, Validators.compose([
        Validators.maxLength(250),
        Validators.minLength(3),
        Validators.required
      ])),
      start: new FormControl(this.task.start, Validators.required),     
      hour: new FormControl(this.task.hour, Validators.required)
    });
  }

  dismissModal(){
    this.modalController.dismiss();
  }

  onSubmit(values) {  
    console.log(values);
    this.task.title = values.title;
    this.task.description = values.description;
    this.task.start = values.start;
    this.task.hour = values.hour;
    this.task.status = values.status || false;
    this.modalController.dismiss(this.task);
  }

  validation_messages = {
    'title': [
      { type: 'required', message: 'Titulo es requerido.' },
      { type: 'minlength', message: 'Titulo debe ser mayor a 3 caracteres.' },
      { type: 'maxlength', message: 'Titulo no pude ser mayor a 25 caracteres.' }
    ],
    'description': [
      { type: 'required', message: 'Descripcion es requerido.' },
      { type: 'minlength', message: 'Descripcion debe ser mayor a 3 caracteres.' },
      { type: 'maxlength', message: 'Descripcion no pude ser mayor a 250 caracteres.' }
    ],
    'start': [
      { type: 'required', message: 'Fecha de Inicio es requerido.' }
    ],
    'hour': [
      { type: 'required', message: 'Hora es requerido.' }
    ]
  };
  
}
