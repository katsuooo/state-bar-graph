<template>
    <div>
        <div class='row'>
        <div class='col-sm-4'>
            <h3>state-bar-graph</h3>
        </div>
        <div class='col-sm-4'>
            <span>運転状態:</span>
            <span>00:00-24:00</span>
            <div style='width:20px;height:20px;display:inline-block;' :style="{backgroundColor:simColor.c1}"></div>
            <br />
            <span>異常状態:</span>
            <span>{{simTime.errStart}}-{{simTime.errStop}}</span>
            <div style='width:20px;height:20px;display:inline-block;' :style="{backgroundColor:simColor.c2}"></div>
     
            <br />
            <span>警報状態:</span>
            <span>{{simTime.emgStart}}-{{simTime.emgStop}}</span>
            <div style='width:20px;height:20px;display:inline-block;' :style="{backgroundColor:simColor.c3}"></div>
        </div>
        <div class='col-sm-4'>
            <button @click='btnRestartFast' class='btn btn-sm btn-info'>restart (fast)</button>
            <button @click='btnRestart' class='btn btn-sm btn-warning'>restart (gradualy)</button>
        </div>
        </div><!--row-->
        <v-stage :config="configKonva">
            <v-layer>
                <div v-for='(c,index) in conf' :key=index>
                    <v-rect :config=c></v-rect>
                </div>
            </v-layer>
            <v-layer>
                <div v-for='(c,index) in xaConf' :key=index>
                    <v-text :config=c />
                </div>
                <v-text :config=xaUnitConfig />
            </v-layer>
        </v-stage>
    </div>
</template>
<script>
/**
 * 
 * timer control
 * 
 * 表示ステップを1minにする。
 * 
 * 
 */
import gen1min from './gen1min.js'

var myVar;
function myTimer(func){
    myVar = setInterval(func, 2)
    //myVar = setInterval(func, 1000)
}
//eslint-disable-next-line
function stopTimer(){
    console.log('stop-timer')
    clearInterval(myVar)
}
function clearConf(h, config){
    h.push(config)
}

/**
 * 
 */
export default {
    props:{
        simTime:{},
        simColor:{}
    },
    data() {
        return {
            configKonva: {
                width: 1000,
                height: 220
            },
            conf:[],
            //x_offset_end:50,
            //xAxisConfig: {x:0,y:150,text:'10',fontSize:15, fill:'green'},
            xaConf:[],
            xaUnitConfig:{x:220,y:170,text:'[h]',fontSize:15, fill:'green'},
            xa_offset:-5,
            //x_step_min_widht:0,
            x_step_width:0,
            x_step_num:24,
            x_offset:50,
            raw:[],
            raw_counter:0,
            //PuRd3 --- #e7e1ef,#c994c7,#dd1c77
            config_0:{
                x: 0,
                y: 50,
                width: 100,
                height: 100,
                fill: '#e7e1ef'
            },
            config_1:{
                x: 0,
                y: 50,
                width: 100,
                height: 100,
                fill: '#c994c7'
            },
            config_2:{
                x: 0,
                y: 50,
                width: 100,
                height: 100,
                fill: '#dd1c77'
            },
            config_null:{
                x: 0,
                y: 50,
                width: 1000,
                height: 100,
                fill: '#ffffff'
            },
            x_step_minute_width:0,
            last_val:{count:0, val:0},
            conf_conter:0
        }
    },
    beforeMount(){
        var width = window.innerWidth
        this.xaUnitConfig.x = width/2
        width = width - 100
        this.configKonva.width = width
        width = width - 70
        this.x_step_width = width/this.x_step_num
        this.x_step_min_width = width/(this.x_step_num * 60)
        myTimer(this.btnOn2)
        for(let i=0; i<=this.x_step_num; i++){
            // x-unit label
            var xa = {x:0,y:150,text:'10',fontSize:15, fill:'green'}
            xa.x = this.x_step_width * i + this.x_offset + this.xa_offset
            xa.text = i.toString()
            this.xaConf.push(JSON.parse(JSON.stringify(xa)))
        }
        // 24h/min データ作成
        this.raw = gen1min.gen24h()
        this.x_step_minute_width = width/(this.x_step_num * 60)
        this.conf_counter = 0
    },
    methods:{
        btnOn2(){
            /**
             * 分毎データにかえる。
             * データなしでつくりながらシーケンス表示。
             * データ先につくってあとは順送り
             * データ変化無時、conf[]の最終データのx値を変更
             * データ変化時、新しくconfデータを作成、追加
             */

            //console.log('conf-counter', this.conf_counter)
            if(this.raw === undefined){
                console.log('data-error, undefined')
                stopTimer()
            }
            if(this.raw[this.raw_counter] === 0){
                var newc = JSON.parse(JSON.stringify(this.config_0))
            }else if(this.raw[this.raw_counter] === 1){
                newc = JSON.parse(JSON.stringify(this.config_1))
            }else if(this.raw[this.raw_counter] === 2){
                newc = JSON.parse(JSON.stringify(this.config_2))                
            }else{
                //eslint-disable-next-line
                return
            }
            if(this.raw_counter === 0){
                //start data
                this.last_val = {val:this.raw[this.raw_counter], count:1}
                newc.x = this.x_offset
                newc.width = this.x_step_minute_width * this.last_val.count;
                this.conf.push(JSON.parse(JSON.stringify(newc)))
                this.conf_counter += 1
            }else if(this.raw[this.raw_counter] === this.last_val.val){
                this.last_val.count += 1
                this.conf[this.conf_counter-1].width = this.x_step_minute_width * this.last_val.count;
            }else{
                this.last_val = {val:this.raw[this.raw_counter], count:1}
                newc.x = this.conf[this.conf_counter-1].x + this.conf[this.conf_counter-1].width
                newc.width = this.x_step_minute_width * this.last_val.count
                this.conf.push(JSON.parse(JSON.stringify(newc)))
                this.conf_counter += 1
            }
            this.raw_counter += 1;
            if(this.raw_counter >= (24*60)){     //1440
                stopTimer()
            }
        },
        btnRestart(){
            //btn restart
            this.conf.lenght = 0
            clearConf(this.conf, this.config_null)
            this.config_0.fill = this.simColor.c1
            this.config_1.fill = this.simColor.c2
            this.config_2.fill = this.simColor.c3
            this.raw.length = 0
            this.raw = gen1min.gen24hWithTime(this.simTime)
            this.conf.length = 0
            this.conf_counter = 0
            this.raw_counter = 0
            this.conf.length = 0
            myTimer(this.btnOn2)
        },
        btnRestartFast(){
            //btn restart
            this.conf.lenght = 0
            clearConf(this.conf, this.config_null)
            this.config_0.fill = this.simColor.c1
            this.config_1.fill = this.simColor.c2
            this.config_2.fill = this.simColor.c3
            this.raw.length = 0
            this.raw = gen1min.gen24hWithTime(this.simTime)
            this.conf.length = 0
            this.conf_counter = 0
            this.raw_counter = 0
            this.conf.length = 0
            //myTimer(this.btnOn2)
            while(!(this.raw_counter >= (24*60))){
                this.btnOn2()
            }
        }
    }
};

</script>


<style>
/**
 * transition
 */
.list-complete-item {
  transition: all 1s;
  display: block;
  margin-bottom: 1px;
}
.list-complete-enter, .list-complete-leave-to{
  opacity: 0;
  transform: translateX(-100%);
}
.list-complete-leave-active {
  position: absolute;
}
</style>

