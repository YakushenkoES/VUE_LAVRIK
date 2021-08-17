<template>
    <div>
        <h1>Cart</h1>
        <hr />
        <table class="table table-bordered" v-if="prodsInCart.length">
            <thead>
                <tr>
                    <th>Товар</th>
                    <th>Количество</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="_pr in prodsInCart"
                    v-bind:key="_pr.id + '_' + _pr.cnt"
                >
                    <td>{{ _pr.title }}</td>
                    <td>
                        <button
                            class="btn btn-warning"
                            @click="setCnt({ id: _pr.id, cnt: _pr.cnt - 1 })"
                            :disabled="_pr.cnt <= 1"
                        >
                            -1
                        </button>
                        <input
                            class="form-control"
                            v-bind:value="_pr.cnt"
                            v-on:change="onChange($event, _pr.id)"
                        />
                        <button
                            class="btn btn-success"
                            @click="setCnt({ id: _pr.id, cnt: _pr.cnt + 1 })"
                        >
                            +1
                        </button>
                        <button
                            type="button"
                            class="btn btn-danger"
                            @click="remove({ id: _pr.id })"
                        >
                            X
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else>
            <h3>Корзина пуста</h3>
        </div>
        <router-link :to="{ name: 'order' }" class="btn btn-success"
            >Order now</router-link
        >
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters("cart", ["prodsInCart"]),
    },
    methods: {
        ...mapActions("cart", ["setCnt", "remove"]),
        onChange(e, id) {
            const val = parseInt(e.target.value);
            this.setCnt(val);
        },
    },
};
</script>

<style>
input.form-control {
    display: inline-block;
    max-width: 50px;
}
</style>