<template>
<div>
	<h1>Products</h1>
	<div class="row">
        <app-product-card v-for="pr in products" :key="pr.id"
            :id="pr.id"
            :title="pr.title"
            :price="pr.price"
        ></app-product-card>
		
	</div>
</div>
</template>
<script>
    import AppProductCard from './ProductCard.vue';
	import { mapGetters, mapActions } from 'vuex';

	export default {
        components:{
            AppProductCard
        },
		computed: {
			...mapGetters('products', { products: 'all' }),
			...mapGetters('cart', [ 'inCart' ])
		},
		methods: {
			...mapActions('cart', [ 'add'])
		}
	}
</script>