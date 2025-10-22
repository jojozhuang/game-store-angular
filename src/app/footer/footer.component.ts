import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: false
})
export class FooterComponent {
  currentYear = 2019;

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }
}
