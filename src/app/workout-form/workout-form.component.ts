import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkoutDataService } from '../workout-data.service';
import { User } from '../workout.model';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
})
export class WorkoutFormComponent {
  userName: string = '';
  workoutType: string = 'Cycling';
  workoutMinutes: number = 0;

  constructor(private workoutDataService: WorkoutDataService) {}

  onSubmit() {
    const workout = {
      type: this.workoutType,
      minutes: this.workoutMinutes,
    };

    const userData = this.workoutDataService.loadData();
    const existingUser = userData.find((user) => user.name === this.userName);

    if (existingUser) {
      existingUser.workouts.push(workout);
    } else {
      const newUser = {
        id: userData.length + 1,
        name: this.userName,
        workouts: [workout],
      };
      userData.push(newUser);
    }

    this.workoutDataService.saveData(userData);
  }
}
