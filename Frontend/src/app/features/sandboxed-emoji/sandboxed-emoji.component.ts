import { Component, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sandboxed-emoji',
  imports: [CommonModule],
  templateUrl: './sandboxed-emoji.component.html',
  styleUrl: './sandboxed-emoji.component.scss'
})
export class SandboxedEmojiComponent {
  @Input() coord: {i: number, j:number} = {i : 2, j:3};
  @Input() dim!: { x: number; y: number };

  constructor(){
    
  }

  getSpritePosition = (): string =>  {
    const size = this.dim.x; // Each emoji is 500x500px
    return `${-this.coord.j * size}px ${-this.coord.i * size}px`;
  }
}
