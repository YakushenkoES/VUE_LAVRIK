<template>
	<div v-if="hasProduct">
		<h1>{{title}}</h1>
		<hr>
		<div class="alert alert-success">
			{{price}}
			
		</div>
	</div>
    <app-404 v-else/>
</template>

<script>
    import {mapGetters} from 'vuex';
    import App404 from './E404.vue';
	export default {
        components:{
            App404
        },
        data:()=>({
            product:undefined,
        }),
        computed:{
            ...mapGetters('products', {getProd:'getProduct',all:'all'}),
            title(){
                const {product:pr} = this;
                return pr?pr.title:"";
            },
            price(){
                const {product:pr} = this;
                return pr?pr.price:"";
            },
            baseID(){
                return this.$route.params.id;
            },
            isValidID(){return this.baseID  ===(+this.baseID).toString();
            },
            hasProduct(){
                return this.product !== undefined;
            }

        },
        created() {
            if(!this.isValidID){
                 this.product = undefined;
                 return;
            }

            const prod = this.getProd(+this.baseID);
            if(!prod){
                this.product = undefined;
                 return;
            }
            this.product = prod;
        },
	}

</script>