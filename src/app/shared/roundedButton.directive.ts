import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[roundedButton]',
})
export class RoundedButtonDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Liste des classes à appliquer
    const classes = [
      'cursor-pointer',
      'px-3',
      'py-2',
      'border',
      'border-purple-800',
      'text-purple-800',
      'dark:bg-slate-900',
      'rounded-md',
      'hover:bg-purple-100',
      'dark:hover:bg-purple-500/25',
      'dark:text-slate-300'
    ];

    // Ajouter chaque classe à l'élément
    classes.forEach((className) => {
      this.renderer.addClass(this.el.nativeElement, className);
    });
  }
}
