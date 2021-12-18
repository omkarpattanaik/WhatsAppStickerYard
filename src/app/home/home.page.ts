import { Component } from '@angular/core';
import { addToWhatsApp } from '../../../plugins/cordova-whatsapp-stickers/www/WhatsAppStickers';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    watchSlidesProgress: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    }
  };

  addStickerToWhatsApp(identifierData, nameData) {
    var jsonObject = { identifier: identifierData, name: nameData };
    console.log("jsonObject: ",jsonObject);
    var json = JSON.stringify(jsonObject);
    console.log("json: ",json)
    
    addToWhatsApp(json, 
    function() { alert(nameData + " Added to WhatsApp"); },
     function(e) { alert("Error. Message: " + e); });
  }

}
