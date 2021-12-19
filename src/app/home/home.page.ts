import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { addToWhatsApp } from '../../../plugins/cordova-whatsapp-stickers/www/WhatsAppStickers';
import * as JSonData from '../../emojis/contents.json';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  prefersDark: boolean;

  sliderPosterContent=[
    {src:"1/21_Cuppy_hi.webp",background:"goldenrod",txtContent:"A Remix style audio world"},
    {src:"2/04_AirHighFive.webp",background:"bisque",txtContent:"A Paint style audio world"},
    {src:"3/01_Justice_Enforced.webp",background:"lavender",txtContent:"A Host style audio world"}
  ];
  constructor(private http:HttpClient) {  
      this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  ngOnInit(){
    this.modeChangeFinder();
    this.jsonCallViaHttp();
   
  }

  jsonCallViaHttp(){
    this.http.get("contents.json").subscribe((data:any) =>{
      console.log("JSON Publisher: ",data.sticker_packs[0].publisher);
      console.log("JSON CONTENT: ",data.sticker_packs);
    })
  }

  modeChangeFinder(){
    setInterval(() => {
      this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      //console.log("prefersDark: ",this.prefersDark)
    }, 3000);
  }
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
