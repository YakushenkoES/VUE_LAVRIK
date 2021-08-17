import { createStore } from 'vuex';
import cart from './cart';
import products from './products';

const store = createStore({
	strict: process.env.NODE_ENV !== 'production',
	modules: {
		products,
		cart
	}
});

export default store;