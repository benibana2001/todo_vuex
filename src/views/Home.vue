<template>
  <div class="home">
    <h2>タスク一覧</h2>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input type="checkbox" :checked="task.done" v-on:change="toggleTaskStatus(task)" />
        {{ task.name }}
        -
        <span v-for="id in task.labelIds" :key="id">
          {{ getLabelText(id) }}
        </span>
      </li>

      <form v-on:submit.prevent="addTask">
        <input type="text" v-model="newTaskName" placeholder="新しいタスク" />
      </form>
    </ul>

    <h2>ラベル一覧</h2>

    <ul>
      <li v-for="label in labels" :key="label.id">
        <input type="checkbox" :value="label.id" v-model="newTaskLabelIds" />
        {{ label.text }}
      </li>
    </ul>

    <form v-on:submit.prevent="addLabel">
      <input type="text" v-model="newLabelText" placeholder="新しいラベル" />
    </form>

    <h2>ラベルでフィルタ</h2>

    <ul>
      <li v-for="label in labels" :key="label.id">
        <input type="radio" :checked="label.id === filter" v-on:change="changeFilter(label.id)" />
        {{ label.text }}
      </li>

      <li>
        <input type="radio" :checked="filter === null" v-on:change="changeFilter(null)" />
        フィルタしない
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {},
  computed: {
    tasks() {
      return this.$store.getters.filteredTasks;
    },
    labels() {
      return this.$store.state.labels;
    },
    filter() {
      return this.$store.state.filter;
    },
  },

  data() {
    return {
      newTaskName: '',
      newTaskLabelIds: [],
      newLabelText: '',
    };
  },

  methods: {
    addTask() {
      this.$store.commit('addTask', {
        name: this.newTaskName,
        labelIds: this.newTaskLabelIds,
      });
      this.newTaskName = '';
      this.newTaskLabelIds = [];
    },

    addLabel() {
      this.$store.commit('addLabel', {
        text: this.newLabelText,
      });
      this.newLabelText = '';
    },

    getLabelText(id) {
      const label = this.labels.filter((eachLabel) => eachLabel.id === id)[0];
      return label ? label.text : '';
    },

    toggleTaskStatus(task) {
      this.$store.commit('toggleTaskStatus', {
        id: task.id,
      });
    },

    changeFilter(labelId) {
      this.$store.commit('changeFilter', {
        filter: labelId,
      });
    },
  },
};
</script>
