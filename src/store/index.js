
import { createStore } from 'vuex'
let entrou = 1

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
      entrou += 1
      if (entrou == 2) {
        const todos = JSON.parse(localStorage.getItem('todos') ?? '[]')
        commit('storeTodos', todos)
        entrou++
      } else {
        entrou = 1
      }
    },
    addTodo({ commit }, data) {
      const todos = JSON.parse(localStorage.getItem('todos') ?? '[]')
      localStorage.setItem('todos', JSON.stringify([data, ...todos]))
      commit('storeTodos', todos)
    },
    // eslint-disable-next-line no-empty-pattern
    updateTodo({}, {id, data}) {
      const todos = JSON.parse(localStorage.getItem('todos') ?? '[]')
      const newTodos = todos.map((todo) => {
        if (todo.id == id){
          todo = {id, ...data}
        }
        return todo
      })
      localStorage.setItem('todos', JSON.stringify(newTodos))
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
