<template>
    <div class="form-group">
        <label>
            {{ label }}
            <template v-if="activated">
                <font-awesome-icon v-if="valid" icon="check-circle" class="text-success"/>
                <font-awesome-icon v-else icon="exclamation-circle" class="text-danger" />
            </template>

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
    },
};
</script>

<style>
</style>