<template>
    <div class='container-fluid'>
        <h1>bar表示セレクタブル</h1>
        <div class='row'>
            <div class='col-sm-6'>
                <colorSet 
                    v-on:colorChange='colorChange'
                />
            </div>
            <div class='col-sm-6'>
                <stateTime 
                    ref='stateTime'
                    v-on:timeChange='timeChange'
                />
            </div>
        </div>
        <hr />
        <step1min 
            :simTime='simTime'
            :simColor='simColor'
        />
    </div>
</template>

<script>
/**
 * state 帯表示
 * 
 * カラー、時間をパラメタ設定できるようにする。
 * 
 * 
 * 
 * 
 * 
 */
import colorSet from '@/components/colorSet.vue'
import step1min from '@/components/step1min.vue'
import stateTime from '@/components/stateTime.vue'
/**
 * 
 */
export default {
    components:{
        colorSet,
        step1min,
        stateTime
    },
    data: () => ({
        simTime:{},
        simColor:{}
    }),
    beforeMount(){
        //this.simTime = {errStart:'12:00', errStop:'13:00',emgStart:'15:00',emgStop:'16:00'}
    },
    methods:{
        timeChange(simTime){
            this.simTime = simTime
            console.log('simtime-new', this.simTime)
        },
        colorChange(simColor){
            console.log('color-change')
            this.simColor = simColor
        }
    }
}
</script>

<style>

</style>