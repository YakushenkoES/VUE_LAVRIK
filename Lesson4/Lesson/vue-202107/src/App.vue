<template>
    <div class="container">
        <div class="Todo">
            <h1>Your actions</h1>

            <app-action
                v-for="(action, i) in todoList"
                :title="action.title"
                :current="action.current"
                :max="action.max"
                :key="i"
                v-on:increase="makeStep(i)"
            ></app-action>

        </div>
    </div>
</template>

<script>
import AppAction from "./components/Action.vue";
export default {
    components: {
        AppAction,
    },
    data: () => ({
        todoList: [
            {
                title: "First action",
                current: 0,
                max: 5,
            },
            {
                title: "Other work",
                current: 0,
                max: 10,
            },
            {
                title: "Some fun",
                current: 0,
                max: 7,
            },
        ],
    }),
    methods: {
        makeStep(i) {
            let step = this.todoList[i];

            if (step.current < step.max) {
                step.current++;
            }
        },
    },
};
</script>