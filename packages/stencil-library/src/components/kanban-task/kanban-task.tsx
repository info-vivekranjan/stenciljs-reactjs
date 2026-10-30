import { Component, h, Prop, State } from '@stencil/core';

enum DIRECTION_ENUM {
  FORWARD = 'forward',
  BACKWARD = 'backward',
}

enum STATUS_ENUM {
  TO_DO = 'todo',
  IN_PROGRESS = 'inprogress',
  DONE = 'done',
}

interface KanbanTaskType {
  id: number;
  title: string;
  date: string;
  status: STATUS_ENUM;
}

@Component({
  tag: 'kanban-task',
  styleUrl: 'kanban-task.css',
  shadow: true,
})
export class KanbanTask {
  @State() isEditTask: boolean;
  @State() editTaskTitle: string;
  @Prop() handleDeleteTask: (id: number) => void;
  @Prop() handleChangeStatus: (id: number, status: STATUS_ENUM, direction: DIRECTION_ENUM) => void;
  @Prop() handleEditTask: (id: number, title: string) => void;
  @Prop() task: KanbanTaskType;

  componentWillLoad() {
    this.editTaskTitle = this.task.title;
  }

  handleChangeEditTaskTitle = (e: any) => {
    this.editTaskTitle = e.target.value;
  };

  handleSaveEditTask = () => {
    this.handleEditTask(this.task.id, this.editTaskTitle);
    this.isEditTask = false;
  };

  render() {
    return (
      <section class="task-wrapper">
        <div class="task-header">
          <div>
            {this.isEditTask ? (
              <div>
                <input type="text" name="title" value={this.editTaskTitle} onChange={this.handleChangeEditTaskTitle} />
                <button onClick={this.handleSaveEditTask}>Save</button>
              </div>
            ) : (
              <h4 class="margin-top-0">{this.task.title}</h4>
            )}

            <p>Date: {this.task.date}</p>
          </div>
          <div class="task-header-actions">
            <button onClick={() => (this.isEditTask = true)}>✏️</button>
            <button onClick={() => this.handleDeleteTask(this.task.id)}>❌</button>
          </div>
        </div>
        <div class="task-footer">
          {this.task.status !== STATUS_ENUM.TO_DO && <button onClick={() => this.handleChangeStatus(this.task.id, this.task.status, DIRECTION_ENUM.BACKWARD)}>⬅️</button>}
          <div></div>
          {this.task.status !== STATUS_ENUM.DONE && <button onClick={() => this.handleChangeStatus(this.task.id, this.task.status, DIRECTION_ENUM.FORWARD)}>➡️</button>}
        </div>
      </section>
    );
  }
}
