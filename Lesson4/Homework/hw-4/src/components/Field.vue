<template>
    <div class="form-group">

        <label>
            {{ label }}
            <font-awesome-icon v-if="activated" v-bind:icon="icon" v-bind:class="iconClass"/>
        </label>
        
        <input
            type="text"
            class="form-control"
            :value="value"
            v-on:input="onInput"
        />
    </div>
</template>

<script>
export default {
    emits: [{
            input: null,
        },
        'fieldChanged'
    ],
    props: {
        label: String,
        value: String,
        valid: Boolean,
        activated: Boolean,
    },
    methods: {
        onInput(e) {
            const val = e.target.value;
            const _data = {
                value: val.trim(),
                activated: true,
            };
            this.$emit("fieldChanged", _data);
        },
    },
    computed: {
        validClass() {
            return {
                "fa-check-circle text-success": this.valid,
                "fa-exclamation-circle text-danger": !this.valid,
            };
        },
        icon(){
            return this.valid ? "check-circle" : "exclamation-circle";
        },
        iconClass(){
            return {
                "text-success": this.valid,
                "text-danger": !this.valid
            };
        }
    },
};
</script>

<style>
</style>