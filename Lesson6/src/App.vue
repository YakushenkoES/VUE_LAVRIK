<template>
	<div>
		<app-header></app-header>
		<app-content></app-content>
	</div>
</template>

<script>
	import AppHeader from './components/Header';
	import AppContent from './components/Content';

	export default {
		components: {
			AppHeader,
			AppContent
		},
		data: () => ({
			price: 1000,
			cnt: 1
		}),
		methods: {
			onDecrease(){
				if(this.cnt > 1){
					this.cnt--;
				}
			},
			onIncrease(){
				this.cnt++;
			}
		}
	}
</script>