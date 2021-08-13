<template>
    <div>
        <p>In Cart: {{ cnt }}</p>
        <p>Total: {{ total }}</p>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["cnt", "total"])
    },
};
</script>