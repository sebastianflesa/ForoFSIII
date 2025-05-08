import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthLayoutComponent } from './auth-layout.component';
import { Renderer2 } from '@angular/core';

describe('AuthLayoutComponent', () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;
  let renderer2: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthLayoutComponent],
      providers: [Renderer2]
    });

    fixture = TestBed.createComponent(AuthLayoutComponent);
    component = fixture.componentInstance;
    renderer2 = fixture.componentRef.injector.get(Renderer2);

    spyOn(renderer2, 'addClass').and.callThrough();
    spyOn(renderer2, 'removeClass').and.callThrough();

    (component as any).renderer = renderer2;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add classes to body on ngOnInit', () => {
    component.ngOnInit();
    expect(renderer2.addClass).toHaveBeenCalledWith(document.body, 'login-page');
    expect(renderer2.addClass).toHaveBeenCalledWith(document.body, 'bg-body-secondary');
  });

  it('should remove classes from body on ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(renderer2.removeClass).toHaveBeenCalledWith(document.body, 'login-page');
    expect(renderer2.removeClass).toHaveBeenCalledWith(document.body, 'bg-body-secondary');
  });
});
