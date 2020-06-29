import { TaskState } from './state';

interface MutationPayloads {
  addTask: {
    name: string;
    labelIds: number[];
  };

  addLabel: {
    text: string;
  };

  toggleTaskStatus: {
    id: number;
  };

  changeFilter: {
    filter: number;
  };

  restore: TaskState;
}

type MutationHandler<K extends keyof MutationPayloads> = (
  state: TaskState,
  payload: MutationPayloads[K]
) => void;

export type Mutations = {
  [K in keyof MutationPayloads]: MutationHandler<K>;
};
