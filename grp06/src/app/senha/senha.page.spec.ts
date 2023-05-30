import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { SenhaPage } from './senha.page';

describe('SenhaPage', () => {
  let component: SenhaPage;
  let fixture: ComponentFixture<SenhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SenhaPage],
      imports: [IonicModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display current senha', () => {
    component.currentSenha = {
      type: 'EMERGÊNCIA',
      color: 'red',
      number: 'E001',
    };
    fixture.detectChanges();

    const senhaCard = fixture.debugElement.query(By.css('ion-card'));
    expect(senhaCard).toBeTruthy();

    const senhaType = senhaCard.query(By.css('ion-card-header ion-card-title'));
    expect(senhaType.nativeElement.innerText).toBe('EMERGÊNCIA');

    const senhaNumber = senhaCard.query(By.css('ion-card-content h1'));
    expect(senhaNumber.nativeElement.innerText).toBe('E001');
  });

  it('should call nextSenha method when next button is clicked', () => {
    spyOn(component, 'nextSenha');

    const nextButton = fixture.debugElement.query(By.css('ion-button'));
    nextButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.nextSenha).toHaveBeenCalled();
  });
});
