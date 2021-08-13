<template>
    <div class="form-group">
        <label>
            {{ label }}

            <transition name='fade'>
                <span v-if="activated">
                    <transition name="rotate" mode="out-in">
                        <font-awesome-icon  
                            :key="icon"
                            v-bind:icon="icon"
                            v-bind:class="iconClass"
                        />
                    </transition>
                </span>
            </transition>
        </label>

        <input
            type="text"
            class="form-control"
            v-bind:value="value"
            v-on:input="onInput"
        />
        
    </div>
</template>

<style>

/* fade */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: rotateY(-90deg);
}


/*rotate*/
.rotate-enter-from,
.rotate-leave-to {
    transform: rotateY(-90deg);
}

.rotate-enter-active,
.rotate-leave-active  {
    transition: all 0.5s ease-in-out;
}

.rotate-leave-from,
.rotate-enter-to {
    transform: rotateY(0deg);
}


</style>

<script>
export default {
    emits: [
        {
            input: null,
        },
        "fieldChanged",
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
        }
    },
    computed: {
        validClass() {
            return {
                "fa-check-circle text-success": this.valid,
                "fa-exclamation-circle text-danger": !this.valid,
            };
        },
        icon() {
            return this.valid ? "check-circle" : "exclamation-circle";
        },
        iconClass() {
            return {
                "text-success": this.valid,
                "text-danger": !this.valid,
            };
        },
    },
    created(){
        if(this.value !== ""){
            const _data = {
                value: this.value.trim(),
                activated: true,
            };
            this.$emit("fieldChanged", _data);
        }
    }
};
</script>

<style>
</style>