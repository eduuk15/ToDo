<template>

<div class="relative">
    <form
        @submit.stop.prevent="addTodo"
        class="flex items-center px-4 bg-gray-900 h-15 rounded-sm border-l-2 border-green-400 mb-3">
                <input
                    v-model="title"
                    placeholder="Adicione um novo item ..."
                    type="text"
                    class="bg-gray-900 placeholder-gray-500 text-gray-500 font-light focus:outline-none block w-full appearance-none leading-normal py-3 pr-3"
                >



                <button
                    class="text-green-400 text-xs font-semibold focus:outline-none"
                    type="submit"
                >
                    ADICIONAR
                </button>
    </form>


    <div class="absolute w-full">
        <TodoAlertSuccess
            id="alert"
            v-if="adicionado"
        />
    </div>
</div>


</template>

<script>
import TodoAlertSuccess from './TodoAlertSuccess.vue'
export default {
    components: {
        TodoAlertSuccess,
    },
    data() {
        return {
            title: '',
            adicionado: false,
            id: 1
        }
    },
    methods: {
        addTodo() {
            const todos = JSON.parse(localStorage.getItem('todos') ?? '[]')
            console.log(todos);
            if (todos.length === 0) {
                this.id = 1;
            } else {
                const aIds = []
                todos.forEach(element => {
                    aIds.push(element.id)
                });

                this.id = aIds.reduce((prev, cur) => {
                    return prev > cur ? prev : cur;
                }) + 1
            }
            if (!this.title) {
                return false;
            }
            this.$store.dispatch('addTodo', {
                title: this.title,
                completed: false,
                id: this.id
            }).finally(() => {
                this.title = ''
                this.adicionado = true
            })

            if (this.adicionado) {
                return
            }
            setTimeout(() => {
                this.adicionado = false
            }, 1500)
        },
    }
}
</script>
