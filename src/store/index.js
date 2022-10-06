
import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: []
  },
  getters: {
  },
  mutations: {
    storeTodos(state, payload) {
      state.todos = payload
    },
    storeTodo(state, payload) {
      const index = state.todos.findIndex(todo => todo.id === payload.id)
      if (index >= 0) {
        state.todos.splice(index, 1, payload)
      } else {
        state.todos.unshift(payload)
      }
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(todo => todo.id === id)

      if (index >= 0) {
        state.todos.splice(index, 1)
      }
    }
  },
  actions: {
    getTodos({ commit }) {
      const todos = JSON.parse(localStorage.getItem('todos') ?? '[]')
      commit('storeTodos', todos)
    },
    addTodo({ commit }, data) {
      const todos = JSON.parse(localStorage.getItem('todos') ?? '[]')
      localStorage.setItem('todos', JSON.stringify([...todos, data]))
      commit('storeTodos', todos)
    },
    updateTodo({ commit }, { id, data}) {
      const todos = JSON.parse(localStorage.getItem('todos') ?? '[]')
      const todoFiltrada = todos.filter((todo) => {
        return todo.id === id
      })[0]
      todoFiltrada.title = data.title
      todos.splice(todos.indexOf(todoFiltrada), 1, todoFiltrada);
      console.log(todos);
      localStorage.removeItem('todos')
      localStorage.setItem('todos', JSON.stringify(todos))
      console.log(localStorage);
      commit('storeTodo', todos)
    },
    deleteTodo({ commit }, id) {
      const todos = JSON.parse(localStorage.getItem('todos') ?? '[]')
      const todoFiltrada = todos.filter((todo) => {
        return todo.id === id
      })[0]
      todos.splice(todos.indexOf(todoFiltrada), 1);

      localStorage.removeItem('todos')
      localStorage.setItem('todos', JSON.stringify(todos))
      commit('storeTodos', todos)
    }
  },
  modules: {
  }
})
