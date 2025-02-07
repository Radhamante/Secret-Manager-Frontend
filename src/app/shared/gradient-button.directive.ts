import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[gradient]',
})
export class GradientDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Liste des classes à appliquer
    const classes = [
      'bg-gradient-to-br',
      'from-pink-500',
      'to-purple-500',
      'hover:from-pink-700',
      'hover:to-purple-700',
      'text-white',
      'font-bold',
      'py-2',
      'px-4',
      'rounded',
    ];

    // Ajouter chaque classe à l'élément
    classes.forEach((className) => {
      this.renderer.addClass(this.el.nativeElement, className);
    });
  }
}
