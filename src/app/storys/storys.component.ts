import { Component } from '@angular/core';

@Component({
  selector: 'app-storys',
  templateUrl: './storys.component.html',
  styleUrl: './storys.component.css'
})
export class StorysComponent {

  items = [
    {imgUrl:'https://i.pinimg.com/originals/ea/35/b8/ea35b8e18cdbfcc7de607d9a02b43fb1.jpg', name:'img1'},
    {imgUrl:'https://i.pinimg.com/originals/1f/6d/75/1f6d7563ab180b8ebc3a171821b36223.jpg', name:'img2'},
    {imgUrl:'https://i.pinimg.com/originals/ea/35/b8/ea35b8e18cdbfcc7de607d9a02b43fb1.jpg', name:'img3'},
    {imgUrl:'https://i.pinimg.com/originals/1f/6d/75/1f6d7563ab180b8ebc3a171821b36223.jpg', name:'img4'}
  ];

}
