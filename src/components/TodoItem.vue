<template>

        <div class="absolute w-full" v-if="completo" >
            <TodoAlertCompleted id="alert"/>
        </div>
        <div class="absolute w-full" v-if="incompleto" >
            <TodoAlertIncompleted id="alert"/>
        </div>
        <div class="absolute w-full" v-if="editado" >
            <TodoAlertEdit id="alert" />
        </div>
        <div :class="{
            'bg-green-200 rounded-sm' : isCompleted,
            'bg-gray-300 rounded-sm' : !isCompleted
            }">
            <div class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0">
                <div class="flex items-center justify-center mr-2">
                    <button
                        :class="{
                            'text-green-600 hover:text-gray-400': isCompleted,
                            'text-gray-400 hover:text-green-600': !isCompleted,
                        }"
                        @click="onCheckClick"
                    >
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 13l4 4L19 7">
                            </path>
                          </svg>
                    </button>
                </div>

                <div class="w-full">
                    <input
                        v-model="title"
                        type="text"
                        placeholder="Digite a sua tarefa"
                        :class="{
                            'line-through bg-green-200 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3': isCompleted,
                            'bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3': !isCompleted,
                        }"
                        @keyup.enter="onTitleChange"
                    >
                </div>

                <div class="ml-auto flex items-center justify-center">
                    <button
                        class="focus:outline-none text-gray-500 hover:text-red-500"
                        @click="onDelete"
                    >
                        <svg
                            class="ml-3 h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
</template>

<script>
import TodoAlertEdit from './TodoAlertEdit.vue'
import TodoAlertCompleted from './TodoAlertCompleted.vue'
import TodoAlertIncompleted from './TodoAlertIncompleted.vue'

export default {
    components: {
        TodoAlertEdit,
        TodoAlertCompleted,
        TodoAlertIncompleted
    },
    props: {
        todo: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            title: this.todo.title,
            isCompleted: this.todo.completed,
            editado: false,
            completoAux: false,
            completo: false,
            incompletoAux: false,
            incompleto: false
        }
    },
    methods: {
        onTitleChange() {
            if(!this.title) {
                return false;
            }

            this.updateTodo()
        },

        updateTodo() {
            const payload = {
                id: this.todo.id,
                data: {
                    title: this.title,
                    completed: this.isCompleted
                }
            }
            this.$store.dispatch('updateTodo', payload)
            if (!this.completoAux) {
                if (!this.incompletoAux) {
                    this.editado = true
                    setTimeout(() => {
                        this.editado = false
                    }, 1500)
                } else {
                    this.incompleto = true
                    setTimeout(() => {
                        this.incompleto = false
                    }, 1500)
                }
            } else {
                this.completo = true
                setTimeout(() => {
                    this.completo = false
                }, 1500)
            }
        },

        onCheckClick() {
            this.isCompleted = !this.isCompleted
            if (!this.isCompleted) {
                this.completoAux = false
                this.incompletoAux = true
            } else {
                this.completoAux = true
            }
            this.updateTodo()

            this.incompletoAux = false
            this.completoAux = !this.completoAux
        },

        onDelete() {
            this.$store.dispatch('deleteTodo', this.todo.id)
        }
    },
}
</script>
