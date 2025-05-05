import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectUsComponent } from './connect-us.component';
import { FormsModule } from '@angular/forms'; // For ngModel binding

describe('ConnectUsComponent', () => {
  let component: ConnectUsComponent;
  let fixture: ComponentFixture<ConnectUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectUsComponent], // Declare the component
      imports: [FormsModule] // Import FormsModule for ngModel to work
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
