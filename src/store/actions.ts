import { ActionContext } from 'vuex';
import { TaskState } from './state';

interface ActionPayloads {
  save: null;
  restore: null;
}

type TaskActionContext = ActionContext<TaskState, TaskState>;

type TaskActionHandler<K extends keyof ActionPayloads> = (
  context: TaskActionContext,
  payload: ActionPayloads[K]
) => void;

export type TaskActions = {
  [K in keyof ActionPayloads]: TaskActionHandler<K>;
};
