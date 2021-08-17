<template>
	<div>
		<hr>
		<h2>{{title}}</h2>
		<div class="price">{{ price }}</div>
		<button class="btn btn-warning" @click="decrease(id)" :disabled="!canDecrease">-1</button>
        <input class="form-control" v-bind:value="cnt" v-on:change="onChange"/>
		<button class="btn btn-success" @click="increase(id)">+1</button>
	</div>
</template>
<script>
	import { mapActions, mapGetters } from 'vuex';

	export default {
        props:{
            title: {
                type: String
            },
            price:{
                type: Number
            },
            cnt:{
                type: Number
            },

            id:{
                type: Number
            }
        },
		computed: {
            ...mapGetters(["product"]),
            canDecrease(){
				return this.product(this.id).cnt > 1;
			}
		},
		methods: {
            ...mapActions(['decrease', 'increase', 'setCount']),
            onChange(e){
                this.setCount({cnt:e.target.value, id: this.id});
                
                if(e.target.value !== this.cnt.toString()){
                    this.$forceUpdate();
                }

            }
		}
	}

</script>

<style>
input.form-control{
    display: inline-block;
    max-width: 100px;
}
</style>