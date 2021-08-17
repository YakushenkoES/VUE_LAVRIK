<template>
    <div>
        <h1>Cart</h1>
        <hr />
        <table class="table table-bordered" v-if="prodsInCart.length">
            <thead>
                <tr>
                    <th>Товар</th>
                    <th>Цена</th>
                    <th>Кол-во</th>
                    <th>Итог</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="_pr in prodsInCart"
                    v-bind:key="_pr.id + '_' + _pr.cnt"
                >
                    <td>{{ _pr.title }}</td>
                    <td>{{ _pr.price }}</td>
                    <td>{{ _pr.cnt }}</td>
                    <td>{{ _pr.cnt *_pr.price}}</td>
                    <td>
                        <button :disabled="_pr.cnt <= 1 || inProgress(_pr.id) "  
                            class="btn btn-warning"
                            @click="setCnt({ id: _pr.id, cnt: _pr.cnt - 1 })"
                            
                        >
                            -1
                        </button>
                        <input  :disabled="inProgress(_pr.id)"
                            class="form-control"
                            v-bind:value="_pr.cnt"
                            v-on:change="onChange($event, _pr.id)"
                        />
                        <button  :disabled="inProgress(_pr.id)"
                            class="btn btn-success"
                            @click="setCnt({ id: _pr.id, cnt: _pr.cnt + 1 })"
                        >
                            +1
                        </button>
                        <button  :disabled="inProgress(_pr.id)"
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
        ...mapGetters("products", ["inProgress"]),
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