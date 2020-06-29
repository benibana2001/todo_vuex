export interface Task {
  id: number;
  name: string;
  labelIds: number[];
  done: boolean;
}

export interface Label {
  id: number;
  text: string;
}

export interface TaskState {
  tasks: Task[];
  labels: Label[];
  nextTaskId: number;
  nextLabelId: number;
  filter: number;
}
