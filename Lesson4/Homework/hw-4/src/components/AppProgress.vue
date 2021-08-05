<template>
    <div class="app-progress">
        <div class="app-progress__bar" v-bind:style="progrStyle" >
            <div class="app-progress__label">{{progrLabel}}</div>
        </div>
        
    </div>
</template>

<script>
export default {
    props: {
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        },
        value: {
            type: Number,
            default: 50,
        }
    },
    computed:{
        pc(){
            return this.value/(this.max-this.min)*100;
        },
        progrLabel(){
            return  this.pc + " %";
        },
        progrStyle(){
            return {
                width: this.pc + "%"
            };
        }
    }
};
</script>

<style lang="scss" scope>
    .app-progress {
        $height: 20px;
        $clr: #76cdff;

        position: relative;
        height: $height;
        overflow: hidden;

        border-radius: 5px;
        border: solid 1px adjust-color($clr, $lightness: -10%);

        &__bar{
            overflow: hidden;
            position: absolute;
            height: 100%;
            top:0;
            left:0;
            width: 20%;
            background-color: adjust-color($clr, $lightness: 10%);
            transition: width 0.5s;
        }

        &__label{
            display: inline-block;
            position: absolute;
            width: 100%;
            height: 100%;
            line-height: 1;
            text-align: center;
        }
    }
</style>