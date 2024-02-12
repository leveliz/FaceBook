import { Component } from '@angular/core';

@Component({
  selector: 'app-storys',
  templateUrl: './storys.component.html',
  styleUrl: './storys.component.css'
})
export class StorysComponent {

  items = [
    {imgUrl:'https://placekitten.com/200/300', name:'img1'},
    {imgUrl:'https://placekitten.com/200/300', name:'img2'},
    {imgUrl:'https://placekitten.com/200/300', name:'img3'},
    {imgUrl:'https://placekitten.com/200/300', name:'img4'}
  ];

}
