<template>
    <div class="container">
        <form v-if="!sent" v-on:submit.prevent="onSubmit" ref="form">
            <app-progress
                :value="complete_pc"
                :min="0"
                :max="100"
            ></app-progress>
            <div>
                <field
                    v-for="(_field, i) in info"
                    v-on:fieldChanged="onChanged(i, $event)"
                    v-bind:label="_field.label"
                    v-bind:value="_field.value"
                    v-bind:activated="_field.activated"
                    v-bind:valid="_field.valid"
                    :key="i"
                ></field>
            </div>
            <hr />
            <button
                type="button"
                class="btn btn-primary"
                v-on:click="onPreviewClick"
                v-bind:disabled="complete_pc < 100"
            >
                Send Data
            </button>

            <div class="form-group">
                <h4>Guests</h4>
                <div>
                    <input
                        type="button"
                        class="btn btn-primary"
                        value="+"
                        v-on:click="addGuest"
                    />
                </div>
            </div>

            <el-dialog
                v-model="preview"
                title="Check data"
                top="10vh"
                custom-class="dialog"
                v-bind:show-close="true"
                v-bind:open-delay="250"
                v-bind:close-delay="250"
            >
                <table class="table table-bordered">
                    <tr v-for="(_f, i) in info" :key="i">
                        <td>{{ _f.label }}</td>
                        <td>{{ _f.value }}</td>
                    </tr>
                </table>

                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="preview = false">Cancel</el-button>
                        <el-button type="primary" @click="onSubmitClick"
                            >Confirm</el-button
                        >
                    </span>
                </template>
            </el-dialog>

            <transition-group name="guests">
                <div
                    class="form-group guests-item"
                    v-for="(_g, i) in guests"
                    :key="_g.key"
                >
                    <label v-on:dblclick="removeGuest(i)"
                        >Guest {{ i + 1 }}</label
                    >
                    <input
                        type="text"
                        class="form-control"
                        v-model.trim="guests[i].title"
                    />
                </div>
            </transition-group>
        </form>

        <div v-else>
            <h2>Data Sent!</h2>
        </div>
    </div>
</template>

<style>
.guests-enter-active,
.guests-leave-active {
    transition: all 1s ease;
}

.guests-enter-from,
.guests-leave-to {
    opacity: 0;
    transform: translateX(150px);
}

/* Анимация плавного сдвига соседей*/
.guests-leave-active {
    position: absolute;
}
.guests-move {
    transition: transform 0.8s ease;
}

.dialog {
    background-color: white;
}
</style>

<script>
import Field from "./components/Field.vue";
import Progress from "./components/Progress.vue";
export default {
    components: {
        Field,
        AppProgress: Progress,
    },
    data: () => ({
        info: [
            {
                label: "Name",
                value: "sdfsdf",
                pattern: /^[a-zA-Z ]{2,30}$/,
            },
            {
                label: "Phone",
                value: "234234",
                pattern: /^[0-9]{7,14}$/,
            },
            {
                label: "Email",
                value: "asdasd",
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
        guests: [],
        sent: false,
        preview: false,
    }),
    methods: {
        onChanged(i, data) {
            const f = this.info[i];
            f.value = data.value;
            f.activated = data.activated;
            f.valid = f.pattern.test(data.value);
        },
        onSubmitClick() {
            //this.$refs.form.submit();
            this.onSubmit();
        },
        onSubmit() {
            if (this.complete_pc >= 100) this.sent = true;
        },
        addGuest() {
            this.guests.push({ title: "", key: Math.random() });
        },
        removeGuest(i) {
            this.guests.splice(i, 1);
        },
        onPreviewClick() {
            this.preview = true;
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
        });
    },
};
</script>

<style lang="scss">
.container {
    margin: 20px;
}
</style>