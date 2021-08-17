<template>
	<div>
		<header>
			<div class="container">
				<div class="row">
					<div class="col col-sm-9">
						<h1>Site</h1>
					</div>
					<div class="col col-sm-3">
						<div class="alert alert-default">
							<div>In Cart: {{ cartCnt }}</div>
							<div>Total: {{total}}</div>
						</div>
					</div>
				</div>
				<hr>
			</div>
		</header>
		<section>
			<div class="container">
				<div class="row">
					<div class="col col-sm-3 menu">
						<ul class="list-group">
							<li class="list-group-item" v-for="item in leftMenu" :key="item.route">
								<router-link :to="{ name: item.route }">{{ item.title }}</router-link>
							</li>
						</ul>
					</div>
					<div class="col col-sm-9">
						<router-view></router-view>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	
	import { mapGetters } from 'vuex';

	export default {
		components: {
			
		},
		data: () => ({
			leftMenu: [
				{ route: 'home', title: 'Catalog' },
				{ route: 'cart', title: 'Cart' },
				{ route: 'order', title: 'Checkout' }
			]
		}),
		computed: {
			...mapGetters('cart', { cartCnt: 'cnt', total: "total" })
		}
	}
</script>

<style>
	.menu{
		border-right: 1px solid #ddd;
	}

	.list-group-item{
		transition: background 0.3s, color 0.3s;
	}

	.list-group-item a{
		text-decoration: none;
	}

	.list-group-item.active a{
		color: inherit;
	}
</style>