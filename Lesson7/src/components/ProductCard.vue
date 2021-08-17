<template>
    <div class="col col-sm-4 mb-3 mt-3">
        <div class="card">
            <div class="card-body">
                <h3>{{ title }}</h3>
                <div>{{ price }}</div>
                <router-link :to="{ name: 'product', params: { id } }"
                    >Read more</router-link
                >
            </div>
            <template v-if="inCart(id)">
                <div class="alert alert-light">Добавлено в корзину</div>
            </template>
            <button
                v-else
                type="button"
                class="btn btn-success"
                @click="add({id})"
            >
                Add to cart
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    props: {
        id: {
            type: Number,
        },
        title: {
            type: String,
        },
        price: {
            type: Number,
        },
    },
    computed:{
        ...mapGetters("cart",["inCart"])
    },
    methods: {
        ...mapActions("cart", ["add"])
    },
};
</script>