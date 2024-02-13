import { Component } from '@angular/core';

@Component({
  selector: 'app-sidetapright',
  templateUrl: './sidetapright.component.html',
  styleUrl: './sidetapright.component.css'
})
export class SidetaprightComponent {

  names = [
    {imgUrl:'https://github.com/mdo.png', name:'Alex Novana'},
    {imgUrl:'https://placekitten.com/200/300', name:'Asura Naruto'},
    {imgUrl:'https://github.com/mdo.png', name:'Choco Pie'},
    {imgUrl:'https://placekitten.com/200/300', name:'Jang Wangyoung'}
  ];
}
