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
		async add({ commit, getters, dispatch }, { id }){
			if(!getters.inCart(id)){
                dispatch("products/addInProgress",id,{root:true});
                await new Promise(resolve=>{
                    commit('add', { id, cnt: 1 });
                    setTimeout(()=>{
                        resolve();
                    },1000);
                });
                dispatch("products/removeInProgress",id,{root:true});
			}
		},
		async remove({ commit, getters, dispatch  }, { id }){
			if(getters.inCart(id)){
                dispatch("products/addInProgress",id,{root:true});
                await new Promise(resolve=>{
                    commit('remove', id);
                    setTimeout(()=>{
                        resolve();
                    },1000);
			    });
                dispatch("products/removeInProgress",id,{root:true});
            }
		},
		async setCnt({ commit, getters , dispatch }, { id, cnt }){
			if(getters.inCart(id)){
                dispatch("products/addInProgress",id,{root:true});
                await new Promise(resolve=>{
                    commit('setCnt', { id, cnt });
                    setTimeout(()=>{
                        resolve();
                            },1000);
                });
                dispatch("products/removeInProgress",id,{root:true});
			}
		}
	}
}