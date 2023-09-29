import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalFunctionsService {

  constructor() { }
  
  detectErrors(event: any, error: any): void{
    const clickedElement = event;
    clickedElement.style.borderColor = error? "#ff0000" : "#00ff00";
  }

  commitErrors(event: any, error: any): void{
    const clickedElement = event;
    clickedElement.style.borderColor = error? "#ff0000" : "#0075FF";
  }

  rippleEffect(event:any){
    console.log('ripple works')
    let x = event.clientX - event.target.offsetLeft;
    let y = event.clientY - event.target.offsetTop;

    let ripples = document.createElement('span');
    ripples.style.left = x + 'px';
    ripples.style.top = y + 'px';
    event.target.appendChild(ripples);

    setTimeout(() => {
      ripples.remove()
    }, 500)
  }

  scaleEffect(event: any){
    console.log('scale work')
    event.target.classList.add('clicked')

    setTimeout(() => {
      event.target.classList.remove('clicked')
    }, 500)
  }
}
