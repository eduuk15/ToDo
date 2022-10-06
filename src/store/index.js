import axios from 'axios'
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
      return axios.get('https://my-json-server.typicode.com/eduuk15/ToDo/todos')
        .then((response) => {
          commit('storeTodos', response.data)
        })
    },
    addTodo({ commit }, data) {
      return axios.post('https://my-json-server.typicode.com/eduuk15/ToDo/todos', data).then((response) => {
        commit('storeTodo', response.data);
      })
    },
    updateTodo({ commit }, { id, data}) {
      return axios.put(`https://my-json-server.typicode.com/eduuk15/ToDo/todos/${id}`, data).then((response) => {
      commit('storeTodo', response.data)
      })
    },
    deleteTodo({ commit }, id) {
      return axios.delete(`https://my-json-server.typicode.com/eduuk15/ToDo/todos/${id}`).then(() => {
        commit('deleteTodo', id)
      })
    }
  },
  modules: {
  }
})
