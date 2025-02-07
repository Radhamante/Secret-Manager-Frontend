import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[roundedInput]',
})
export class RoundedInputDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Liste des classes à appliquer
    const classes = [
      'border',
      'border-gray-300',
      'rounded-md',
      'w-full',
      'px-3',
      'py-2',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-pink-400',
      'dark:border-purple-800',
    ];

    // Ajouter chaque classe à l'élément
    classes.forEach((className) => {
      this.renderer.addClass(this.el.nativeElement, className);
    });
  }
}
