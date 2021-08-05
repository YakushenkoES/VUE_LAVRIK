<template>
    <div class="container">
        <app-progress :value="complete_pc" :min="0" :max="100"></app-progress>
        <form v-if="!sent" v-on:submit.prevent="onSubmit">
            <div>
                <app-field
                    v-for="(_field, i) in info"
                    v-on:fieldChanged="onChanged(i, $event)"
                    v-bind:label="_field.label"
                    v-bind:value="_field.value"
                    v-bind:activated="_field.activated"
                    v-bind:valid="_field.valid"
                    :key="i"
                ></app-field>
            </div>
            <button class="btn btn-primary" v-bind:disabled="complete_pc < 100">
                Send Data
            </button>
        </form>

        <div v-else>
            <table class="table table-bordered">
                <tr v-for="_f,i in info" :key="i">
                    <td>{{ _f.label }}</td>
                    <td>{{ _f.value }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import AppField from "./components/AppField.vue";
import AppProgress from './components/AppProgress.vue';
export default {
    components: {
        AppField,
        AppProgress
    },
    data: () => ({
        info: [
            {
                label: "Name",
                value: "",
                pattern: /^[a-zA-Z ]{2,30}$/,
            },
            {
                label: "Phone",
                value: "",
                pattern: /^[0-9]{7,14}$/,
            },
            {
                label: "Email",
                value: "",
                pattern: /.+/,
            },
            {
                label: "Some Field 1",
                value: "",
                pattern: /.+/,
            },
            {
                label: "Some Field 2",
                value: "",
                pattern: /.+/,
            },
        ],
        sent: false,
    }),
    methods: {
        onChanged(i, data) {
            const f = this.info[i];
            f.value = data.value;
            f.activated = data.activated;
            f.valid = f.pattern.test(data.value);
        },
        onSubmit() {
            if (this.complete_pc >= 100) this.sent = true;
        },
    },
    computed: {
        progressStyle() {
            return {
                width: this.complete_pc + "%",
            };
        },
        complete_pc() {
            const qty = this.info.filter(
                (_i) => _i.activated && _i.valid
            ).length;
            const qtyTotal = this.info.length;
            return (qty / qtyTotal) * 100;
        },
    },
    created() {
        this.info.forEach((field) => {
            field.valid = false;
            field.activated = false;
            field.value = "";
        });
    },
};
</script>

<style lang="scss">
    .container{
        margin: 20px;
    }
</style>