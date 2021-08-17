export default {
	namespaced: true,
	state: {
		items: [],
        productsInProgress:[]
	},
	getters: {
		all: state => state.items,
        getProduct: state=>_id=>state.items.find(_p=>_p.id===_id),
        inProgress: state=> _id => state.productsInProgress.find(_i=>_i===_id)!==undefined
	},
    mutations:{
        ADD(state, id){
            if(id in state.productsInProgress){
                return;
            }
            state.productsInProgress.push(id);
        },
        REMOVE(state, id){
            state.productsInProgress=state.productsInProgress.filter(_id=> _id!==id);
        },
        LOAD(state, items){
            state.items = items;
        }
    },
    actions:{
        addInProgress(store, id){
            store.commit("ADD", id);
        },
        removeInProgress(store, id){
            store.commit("REMOVE", id);
        },
        async load(store){
            const items = await new Promise(resolve=>{
                setTimeout(()=>{
                    resolve(productsStub()) ;
                } ,1500)
            });
            store.commit("LOAD",items);
        }
    }
}

function productsStub(){
	return [
		{"id":100,"title":"Ipnone 200","price":12000},
		{"id":101,"title":"Samsung AAZ8","price":22000},
		{"id":103,"title":"Nokia 3310","price":5000},
		{"id":105,"title":"Huawei ZZ","price":15000}
	];
}