import { Component } from '@angular/core';

@Component({
  selector: 'app-sidetapleft',
  templateUrl: './sidetapleft.component.html',
  styleUrl: './sidetapleft.component.css'
})
export class SidetapleftComponent {

  games = [
    {imgUrl:'/assets/images/Featured-image.png', name:'Hero Wars'},
    {imgUrl:'/assets/images/Featured-image1.png', name:'Hobo Game'},
    {imgUrl:'/assets/images/Featured-image2.png', name:'Monster Legends'},
    {imgUrl:'/assets/images/Featured-image3.png', name:'Pirate Kings'},
    {imgUrl:'/assets/images/Featured-image4.png', name:'SAO Legend'},
    {imgUrl:'/assets/images/Featured-image.png', name:'Hero Wars'},
    {imgUrl:'/assets/images/Featured-image1.png', name:'Hobo Game'},
    {imgUrl:'/assets/images/Featured-image2.png', name:'Monster Legends'},
    {imgUrl:'/assets/images/Featured-image3.png', name:'Pirate Kings'},
    {imgUrl:'/assets/images/Featured-image4.png', name:'SAO Legend'},
  ];
}
