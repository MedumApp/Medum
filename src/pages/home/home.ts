import { Component } from '@angular/core';

import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  houses: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, af: AngularFire, public actionSheetCtrl: ActionSheetController) {
    this.houses=af.database.list('/houses');
  }

  addHouse(){
  let prompt = this.alertCtrl.create({
    title: 'Nuevo anuncio',
    message: "Ingresa las descripciones de tu anuncio",
    inputs: [
      {
        name: 'title',
        placeholder: 'Titulo'
      },
      {
      	name: 'description',
      	placeholder: 'Descripcion'
      },
      {
      	name: 'price',
      	placeholder: 'Precio'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Guardar',
        handler: data => {
          this.houses.push({
            title: data.title,
            description: data.description,
            price:data.price
          });
        }
      }
    ]
  });
  prompt.present();
}

showOptions(houseId, houseTitle,houseDescription,housePrice) {
  let actionSheet = this.actionSheetCtrl.create({
    title: '¿Que quieres hacer?',
    buttons: [
      {
        text: 'Borrar casa',
        role: 'destructive',
        handler: () => {
          this.removeHouse(houseId);
        }
      },{
        text: 'Editar',
        handler: () => {
          this.updateHouse(houseId, houseTitle,houseDescription,housePrice);
        }
      },{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}

removeHouse(houseId: string){
  this.houses.remove(houseId);
}

updateHouse(houseId, houseTitle,houseDescription,housePrice){
  let prompt = this.alertCtrl.create({
    title: 'Editar Anuncio',
    message: "Edita",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title',
        value: houseTitle
      },
      {
      	name: 'description',
      	placeholder: 'Descripcion',
      	value:houseDescription
      },
      {
      	name: 'price',
      	placeholder: 'Precio',
      	value:housePrice
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Guardar',
        handler: data => {
          this.houses.update(houseId, {
            title: data.title,
            description: data.description,
            price:data.price
          });
        }
      }
    ]
  });
  prompt.present();
}



}
