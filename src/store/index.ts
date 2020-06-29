import Vue from 'vue';
import Vuex from 'vuex';
import { TaskState } from './state';
import { Mutations } from './mutation';
import { TaskActions } from './actions';

Vue.use(Vuex);

export const defaultState: TaskState = {
  tasks: [
    {
      id: 1,
      name: '牛乳を買う',
      labelIds: [1, 2],
      done: false,
    },
    {
      id: 2,
      name: 'Vue.jsの本を買う',
      labelIds: [1, 3],
      done: true,
    },
  ],

  labels: [
    {
      id: 1,
      text: '買い物',
    },
    {
      id: 2,
      text: '食料',
    },
    {
      id: 3,
      text: '本',
    },
  ],

  nextTaskId: 3,
  nextLabelId: 4,

  filter: 0,
};

const mutations: Mutations = {
  addTask(state, { name, labelIds }) {
    state.tasks.push({
      id: state.nextTaskId,
      name,
      labelIds,
      done: false,
    });

    state.nextTaskId += 1;
  },

  addLabel(state, { text }) {
    state.labels.push({
      id: state.nextLabelId,
      text,
    });

    state.nextLabelId += 1;
  },

  toggleTaskStatus(state, { id }) {
    state.tasks.forEach((task) => {
      if (task.id === id) {
        // eslint-disable-next-line no-param-reassign
        task.done = !task.done;
      }
    });
  },

  changeFilter(state, { filter }) {
    state.filter = filter;
  },

  // eslint-disable-next-line object-curly-newline
  restore(state, { tasks, labels, nextTaskId, nextLabelId }) {
    state.tasks = tasks;
    state.labels = labels;
    state.nextTaskId = nextTaskId;
    state.nextLabelId = nextLabelId;
  },
};

const actions: TaskActions = {
  save({ state }) {
    const data = {
      tasks: state.tasks,
      labels: state.labels,
      nextTaskId: state.nextTaskId,
      nextLabelId: state.nextLabelId,
    };

    localStorage.setItem('task-app-data', JSON.stringify(data));
  },

  restore({ commit }) {
    const data = localStorage.getItem('task-app-data');
    if (data) {
      commit('restore', JSON.parse(data));
    }
  },
};

const store = new Vuex.Store<TaskState>({
  state: defaultState,

  mutations,

  getters: {
    filteredTasks(state) {
      if (!state.filter) {
        return state.tasks;
      }

      return state.tasks.filter((task) => task.labelIds.includes(state.filter));
    },
  },

  actions,

  modules: {},
});

export default store;
