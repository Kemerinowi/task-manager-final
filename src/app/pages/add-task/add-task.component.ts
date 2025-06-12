import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
})
export class AddTaskComponent {
  title = '';
  description = '';
  category = 'genel';

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  async addTask() {
    const user = await this.authService.getCurrentUser();
    if (!user) return;

    const task = {
      title: this.title,
      description: this.description,
      category: this.category,
      completed: false,
      createdAt: new Date(),
      userId: user.uid,
    };

    this.taskService.addTask(task).then(() => {
      this.router.navigate(['/tasks']);
    });
  }
}
