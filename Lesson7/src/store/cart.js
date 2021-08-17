export default {
	namespaced: true,
	state: {
		products: []
	},
	getters: {
		inCart: state => id => state.products.some(pr => pr.id === id),
		cnt: state => state.products.length,
		total: (state, getters, rs, rootGetters) => {

            const getProduct = rootGetters["products/getProduct"];

            const ans = state.products.reduce((total, _pr) => {
                const prod = getProduct(_pr.id);
                return total + (prod?prod.price:0) * _pr.cnt;
            }, 0);

            return ans;
        },

        prodsInCart: (state,getters,rs, rootGetters) => {
            console.log('prodsInCart');
            const getProduct = rootGetters["products/getProduct"];

            const products = state.products.map(_pr => {

                let prod =  getProduct(_pr.id);
                if(prod){
                    prod = {
                        ...prod,
                        cnt:_pr.cnt
                    };
                }
                return prod;
            }).filter(_pr => (_pr !== undefined && _pr !== null));
            console.log('products :>> ', products);
            return products;
        }

	},
	mutations: {
		add(state, product){
			state.products.push(product);
		},
		remove(state, id){
			state.products = state.products.filter(pr => pr.id !== id);
		},

		setCnt(state, { id, cnt }){
            let index = state.products.findIndex(pr => pr.id === id);
            if(index ===-1){
                return;
            }
            const prod =  state.products[index];
            const _pre = prod.cnt;

            if (typeof cnt === "string") cnt = parseInt(cnt);

            if (cnt === undefined || cnt === null || isNaN(cnt)) cnt = _pre;

            if (cnt <= 1) cnt = 1;

            prod.cnt = cnt;

        }
	},
	actions: {
		add({ commit, getters }, { id }){
			if(!getters.inCart(id)){
				commit('add', { id, cnt: 1 });
			}
		},
		remove({ commit, getters }, { id }){
			if(getters.inCart(id)){
				commit('remove', id);
			}
		},
		setCnt({ commit, getters }, { id, cnt }){
			if(getters.inCart(id)){
				commit('setCnt', { id, cnt });
			}
		}
	}
}