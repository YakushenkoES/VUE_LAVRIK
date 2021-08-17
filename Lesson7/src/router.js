import { createRouter, createWebHistory } from 'vue-router';

import Product from './components/Product';
import ProductsList from './components/ProductsList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import E404 from './components/E404';

let routes = [,
	{
		name: 'home',
		path: '/',
		component: ProductsList
	},
	{
		name: 'product',
		path: '/product/:id',
		component: Product
	},
	{
		name: 'cart',
		path: '/cart',
		component: Cart
	},
	{
		name: 'order',
		path: '/checkout',
		component: Checkout
	},
	{
		path: '/:any(.*)',
		component: E404
	}
];

let router = createRouter({
	routes, 
	history: createWebHistory()
});

export default router;