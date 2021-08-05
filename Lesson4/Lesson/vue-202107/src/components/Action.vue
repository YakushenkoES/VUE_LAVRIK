<template>
    <div :class="$style.action">
        <div class="alert" :class="alertClasses">
            <h2>{{ title }}</h2>
            <div class="progress">
                <div :style="progressStyle" class="progress-bar"></div>
            </div>
            <hr />
            <h3 v-if="current === max">All done!</h3>
            <button
                v-else
                type="button"
                class="btn btn-primary"
                v-on:click="onClick"
            >
                I make step!
            </button>
            <pre>{{$style}}</pre>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        current: Number,
        max: Number,
    },
    computed: {
        rel() {
            return this.current / this.max;
        },
        progressStyle() {
            return {
                width: this.rel * 100 + "%",
            };
        },
        alertClasses() {
            const { rel } = this;
            return {
                "alert-danger": rel < 0.25,
                "alert-warning": rel >= 0.25 && rel < 0.75,
                "alert-success": rel >= 0.75,
            };
        },
    },
    methods: {
        onClick() {
            // console.log("clicked");
            this.$emit("increase");
        },
    },
};
</script>

<style module>
    .action{
        border: 1px solid red;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
    }
    input{
        background: #000;
    }
</style>