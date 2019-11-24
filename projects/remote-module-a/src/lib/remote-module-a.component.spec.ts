import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteModuleAComponent } from './remote-module-a.component';

describe('RemoteModuleAComponent', () => {
  let component: RemoteModuleAComponent;
  let fixture: ComponentFixture<RemoteModuleAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteModuleAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteModuleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
