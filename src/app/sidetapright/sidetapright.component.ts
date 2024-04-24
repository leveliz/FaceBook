import { Component } from '@angular/core';

@Component({
  selector: 'app-sidetapright',
  templateUrl: './sidetapright.component.html',
  styleUrl: './sidetapright.component.css'
})
export class SidetaprightComponent {

  names = [
    {imgUrl:'https://github.com/mdo.png', name:'Alex Novana'},
    {imgUrl:'https://i.pinimg.com/originals/94/7d/19/947d19bf7c5a48c5207fc6697efbfba0.jpg', name:'Asura Naruto'},
    {imgUrl:'https://github.com/mdo.png', name:'Choco Pie'},
    {imgUrl:'https://i.pinimg.com/originals/94/7d/19/947d19bf7c5a48c5207fc6697efbfba0.jpg', name:'Jang Wangyoung'}
  ];
}
