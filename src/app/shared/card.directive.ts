import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[card]',
})
export class CardDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Liste des classes à appliquer
    const classes = [
      'bg-white',
      'rounded-lg',
      'shadow-lg',
      'p-6',
      'h-min',
      'dark:bg-slate-900',
      "dark:text-slate-300",
    ];

    // Ajouter chaque classe à l'élément
    classes.forEach((className) => {
      this.renderer.addClass(this.el.nativeElement, className);
    });
  }
}
