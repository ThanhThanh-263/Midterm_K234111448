import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VIP } from './vip';

describe('VIP', () => {
  let component: VIP;
  let fixture: ComponentFixture<VIP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VIP]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VIP);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
