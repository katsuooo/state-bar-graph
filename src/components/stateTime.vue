<template>
    <div>
        <h3>time-select</h3>
        <div class='row'>
        <div class='col-sm-4'>
            <span>運転時間(固定)</span>
        <form>
            <fieldset disabled>
            <div class='mb-3'>
                <label for='errInput' class='form-label' style='display:inline;'>start-time</label>
                <input type='time' class='form-control sim-input' id='errInput' area-discribedby='' style='display:inline;' value='00:00'>
                <br />
                <label for='errInput' class='form-label' style='display:inline;'>stop-time</label>
                <input type='time' class='form-control sim-input' id='errInput' area-discribedby='errTimeHelp' style='display:inline;' value='23:59'>
                <div id='errTimeHelp' class='form-text'>運転状態時間を表示しています</div>
            </div>
            </fieldset>
        </form>
        </div>
            <div class='col-sm-4'>
                <span>異常時間</span>
        <form>
            <div class='mb-3'>
                <label for='errInput' class='form-label' style='display:inline;'>start-time</label>
                <input type='time' class='form-control sim-input' id='errInput' area-discribedby='' style='display:inline;' v-model=simTime.errStart>
                <br />
                <label for='errInput' class='form-label' style='display:inline;'>stop-time</label>
                <input type='time' class='form-control sim-input' id='errInput' area-discribedby='errTimeHelp' style='display:inline;' v-model=simTime.errStop>
                <div id='errTimeHelp' class='form-text'>異常状態時間を入力してください</div>
            </div>
        </form>
            </div>
            <div class='col-sm-4'>        
                <span>警報時間</span>
        <form>
            <div class='mb-3'>
                <label for='errInput' class='form-label' style='display:inline;'>start-time</label>
                <input type='time' class='form-control sim-input' id='errInput' area-discribedby='' style='display:inline;' v-model=simTime.emgStart>
                <br />
                <label for='errInput' class='form-label' style='display:inline;'>stop-time</label>
                <input type='time' class='form-control sim-input' id='errInput' area-discribedby='emgTimeHelp' style='display:inline;' v-model=simTime.emgStop>
                <div id='emgTimeHelp' class='form-text'>警報状態時間を入力してください</div>
            </div>
        </form>
            </div>
        </div><!--end of row-->
    </div>
</template>

<script>
export default {
    data: () => ({
        simTime:{}
    }),
    beforeMount(){
        this.simTime = {errStart:'12:00',errStop:'13:00',emgStart:'15:00',emgStop:'16:00'}
    },
    watch:{
        simTime:{
            //eslint-disable-next-line
            handler: function(newValue, oldValue){
                //console.log('sim-time', newValue)
                this.$emit('timeChange',newValue)
            },
            deep:true
        }
    }
}
</script>

<style scoped>
.sim-input{
    width: 120px;
}
</style>