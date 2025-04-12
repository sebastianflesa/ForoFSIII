import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
  
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2) { }
  ngOnInit(): void {
    //login-page bg-body-secondary
    this.renderer.addClass(document.body, 'login-page');
    this.renderer.addClass(document.body, 'bg-body-secondary');
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'login-page');
    this.renderer.removeClass(document.body, 'bg-body-secondary');

  }


}
