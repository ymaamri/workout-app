import { TestBed, ComponentFixture } from '@angular/core/testing';
import { WorkoutFormComponent } from './workout-form.component';
import { WorkoutDataService } from '../workout-data.service';
import { FormsModule } from '@angular/forms';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutDataServiceSpy: jasmine.SpyObj<WorkoutDataService>;

  beforeEach(() => {
    workoutDataServiceSpy = jasmine.createSpyObj('WorkoutDataService', [
      'loadData',
      'saveData',
    ]);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [WorkoutFormComponent],
      providers: [
        { provide: WorkoutDataService, useValue: workoutDataServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a workout for existing user', () => {
    workoutDataServiceSpy.loadData.and.returnValue([
      { id: 1, name: 'John Doe', workouts: [] },
    ]);
    component.userName = 'John Doe';
    component.workoutType = 'Running';
    component.workoutMinutes = 30;

    component.onSubmit();

    expect(workoutDataServiceSpy.saveData).toHaveBeenCalledWith([
      {
        id: 1,
        name: 'John Doe',
        workouts: [{ type: 'Running', minutes: 30 }],
      },
    ]);
  });

  it('should add a new user and workout if user does not exist', () => {
    workoutDataServiceSpy.loadData.and.returnValue([]);
    component.userName = 'Jane Smith';
    component.workoutType = 'Swimming';
    component.workoutMinutes = 60;

    component.onSubmit();

    expect(workoutDataServiceSpy.saveData).toHaveBeenCalledWith([
      {
        id: 1,
        name: 'Jane Smith',
        workouts: [{ type: 'Swimming', minutes: 60 }],
      },
    ]);
  });
});
