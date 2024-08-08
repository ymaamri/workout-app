import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutDataService {
  private initialData: User[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 },
      ],
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 },
      ],
    },
  ];

  private userDataSubject = new BehaviorSubject<User[]>(this.loadData());
  userData$ = this.userDataSubject.asObservable();

  public loadData(): User[] {
    const data = localStorage.getItem('userData');
    if (data) {
      return JSON.parse(data);
    } else {
      return this.initialData;
    }
  }

  saveData(userData: User[]) {
    localStorage.setItem('userData', JSON.stringify(userData));
    this.userDataSubject.next(userData);
  }
}
