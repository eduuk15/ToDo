<template>
    <div class="h-full px-3 py-10 md:px-10">
        <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
          <div class="flex justify-center text-green-400 font-semibold text-title">
              To Do List (Lista de Tarefas)
          </div>

          <TodoSpinner v-if="loading"/>

          <template v-else >
            <div class="relative">
            <TodoFormAdd />
            <div v-if="removido" class="fixed w-1/4 top-[90%] left-[38%]">
              <TodoAlertRemove
                id="alert"
              />
            </div>
            <TodoItems v-if="$store.state.todos.length" />
            <TodoEmpty v-else/>
            </div>
          </template>
        </div>
    </div>
</template>

<script>

import TodoSpinner from './components/TodoSpinner.vue'
import TodoFormAdd from './components/TodoFormAdd.vue'
import TodoItems from './components/TodoItems.vue'
import TodoEmpty from './components/TodoEmpty.vue'
import TodoAlertRemove from './components/TodoAlertRemove.vue'


export default {
  name: 'App',
  components: {
    TodoSpinner,
    TodoFormAdd,
    TodoItems,
    TodoEmpty,
    TodoAlertRemove
  },
  data() {
    return {
      loading: false,
      removido: false,
      todosLengthOriginal: '',
      todosLength: '',
      created: false
    }
  },
  created() {
    this.loading = true
    this.$store.dispatch('getTodos').finally(() => {
      this.loading = false
      this.todosLengthOriginal = this.$store.state.todos ? this.$store.state.todos.length : 0
    })
  },
  updated() {
    this.$store.dispatch('getTodos').finally(() => {
      this.loading = false
    })
    this.todosLength = this.$store.state.todos ? this.$store.state.todos.length : 0;
    if (this.todosLength < this.todosLengthOriginal) {
      if (this.removido) {
        return
      }
      this.removido = true
      setTimeout(() => {
        this.removido = false
      }, 1500)
    }
    this.todosLengthOriginal = this.todosLength
  }
}
</script>


<style>

   #alert {
    -webkit-animation: smooth 1.5s ease-in;
    -moz-animation: smooth 1.5s ease-in;
    -o-animation: smooth 1.5s ease-in;
    -ms-animation: smooth 1.5s ease-in;
    animation: smooth 1.5s ease-in;
}

@-webkit-keyframes smooth {
    0% { opacity: 1;}
    100% { opacity: 0;}
}
</style>
