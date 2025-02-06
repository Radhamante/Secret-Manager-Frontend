import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-doc',
  imports: [TranslocoModule],
  templateUrl: './doc.component.html',
  styleUrl: './doc.component.scss',
  host: {
    class: 'max-w-3/4 lg:max-w-1/3 flex flex-col gap-4 justify-center',
  }
})
export class DocComponent {

}
