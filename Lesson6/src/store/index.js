import { createStore } from "vuex";

const ORDER_STATUSES = {
    base: 0,
    pending: 5,
    done: 10
};

const store = createStore({
    strict: process.env.NODE_ENV !== "production", // false for production mode
    state() {
        return {
            products: [
                {
                    id: 0,
                    title: "молоко",
                    price: 735,
                    cnt: 1
                },
                {
                    id: 1,
                    title: "хлеб",
                    price: 112,
                    cnt: 1
                },
                {
                    id: 2,
                    title: "сыр",
                    price: 689,
                    cnt: 1
                }
            ],
            status: ORDER_STATUSES.base
        };
    },
    getters: {
        products: (state) => state.products,
        product: (state) => (id) => state.products.find((_prod) => _prod.id === id),

        cnt: (state) => state.products.reduce((_cnt, _prod) => _cnt + _prod.cnt, 0),

        total: (state) => state.products.reduce((_price, _prod) => _price + _prod.price * _prod.cnt, 0),

        isOrderPending: (state) => state.status === ORDER_STATUSES.pending,
        isOrderDone: (state) => state.status === ORDER_STATUSES.done
    },
    mutations: {
        SET_COUNT(state, { cnt, id }) {

            const prod = this.getters.product(id);
            if (!prod) return;

            const _pre = prod.cnt;

            if (typeof cnt === "string") cnt = parseInt(cnt);

            if (cnt === undefined || cnt === null || isNaN(cnt)) cnt = _pre;

            if (cnt <= 1) cnt = 1;

            prod.cnt = cnt;
        },

        SET_STATUS(state, status) {
            state.status = status;
        }
    },
    actions: {
        //decrease(store, id) {
        decrease({getters:{product}, commit}, id) {
            const cnt = product(id).cnt - 1;
            commit("SET_COUNT", { cnt, id });
        },
        increase({getters:{product}, commit}, id) {
            const cnt = product(id).cnt + 1;
            commit("SET_COUNT", { cnt, id });
        },
        setCount({commit}, { cnt, id }) {
            
            commit("SET_COUNT", { cnt, id });
        },

        send({commit}) {
            commit("SET_STATUS", ORDER_STATUSES.pending);

            setTimeout(() => {
                commit("SET_STATUS", ORDER_STATUSES.done);
            }, 3000);
        }
    }
});

export default store;

/*
	get total
	total($store.state, $store.getters, rs, rg)

	commit('insrease', payload) -> $store.mutations.insrease($store.state, payload)

*/
