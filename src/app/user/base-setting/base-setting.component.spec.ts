import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSettingComponent } from './base-setting.component';

describe('BaseSettingComponent', () => {
  let component: BaseSettingComponent;
  let fixture: ComponentFixture<BaseSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
