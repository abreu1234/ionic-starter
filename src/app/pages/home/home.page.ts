import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends BasePage implements OnInit {
  public folder: string;

  constructor(
    injector: Injector
  ) {
    super(injector);
   }

  enableMenuSwipe(): boolean {
    return false;
  }

  ngOnInit() {
    this.folder = this.getParams().id;
  }

}
