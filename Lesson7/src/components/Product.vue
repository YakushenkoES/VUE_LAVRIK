<template>
	<div>
		<h1>{{title}}</h1>
		<hr>
		<div class="alert alert-success">
			{{price}}
			
		</div>
	</div>
</template>

<script>
    import {mapGetters} from 'vuex';
	export default {
        data:()=>({
            prodId:undefined,
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
            }
        },
        created() {
            const id = +this.$route.params.id;
            const prod = this.getProd(id);
            if(!prod){
                this.$router.push("/404");
            }
            this.product = prod;
        },
	}

</script>