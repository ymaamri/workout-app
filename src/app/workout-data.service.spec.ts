import { TestBed } from '@angular/core/testing';
import { WorkoutDataService } from './workout-data.service';
import { User } from './workout.model';

describe('WorkoutDataService', () => {
  let service: WorkoutDataService;
  let mockData: User[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutDataService);
    mockData = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [{ type: 'Swimming', minutes: 60 }],
      },
    ];
    localStorage.setItem('userData', JSON.stringify(mockData));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load data from localStorage', () => {
    const loadedData = service.loadData();
    expect(loadedData).toEqual(mockData);
  });

  it('should save data to localStorage and update BehaviorSubject', () => {
    const newData = [
      {
        id: 3,
        name: 'Mike Johnson',
        workouts: [{ type: 'Yoga', minutes: 50 }],
      },
    ];
    service.saveData(newData);

    const savedData = JSON.parse(localStorage.getItem('userData')!);
    expect(savedData).toEqual(newData);
  });
});
