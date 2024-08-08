import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutDataService } from '../workout-data.service';
import { User, Workout } from '../workout.model';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
  imports: [CommonModule, FormsModule],
})
export class WorkoutListComponent implements OnInit {
  userData: User[] = [];
  filteredData: User[] = [];
  searchName: string = '';
  selectedType: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private workoutDataService: WorkoutDataService) {}

  ngOnInit() {
    this.workoutDataService.userData$.subscribe((data) => {
      this.userData = data;
      this.filterData();
    });
  }

  filterData() {
    this.filteredData = this.userData
      .filter((user) =>
        user.name.toLowerCase().includes(this.searchName.toLowerCase())
      )
      .filter((user) =>
        this.selectedType
          ? user.workouts.some((workout) => workout.type === this.selectedType)
          : true
      );
  }

  onSearchChange() {
    this.filterData();
  }

  onFilterChange() {
    this.filterData();
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredData.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  getWorkoutNames(workouts: Workout[]): string {
    return workouts.map((workout) => workout.type).join(', ');
  }

  getWorkoutCount(workouts: Workout[]): number {
    return workouts.length;
  }

  getTotalMinutes(workouts: Workout[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
