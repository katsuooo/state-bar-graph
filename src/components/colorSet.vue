<template>
    <div class='container'>
        <h3>color-set-3</h3>
        <div class='row'>
            <div class='col-sm-3' v-for='cs in colorSet3' :key='cs.name'>
                <span @click='nameOn(cs.name)'>{{cs.name}}:</span>
                <div style='width:20px;height:20px;display:inline-block;' :style="{backgroundColor:cs.color[0]}"></div>
                <div style='width:20px;height:20px;display:inline-block;' :style="{backgroundColor:cs.color[1]}"></div>
                <div style='width:20px;height:20px;display:inline-block;' :style="{backgroundColor:cs.color[2]}"></div>
            </div>
            <div class='col-sm-3' v-for='cs in colorSet3_2' :key='cs.name'>
                <span @click='nameOn(cs.name)'>{{cs.name}}:</span>
                <div style='width:20px;height:20px;display:inline-block;' :style="{backgroundColor:cs.color[0]}"></div>
                <div style='width:20px;height:20px;display:inline-block;' :style="{backgroundColor:cs.color[1]}"></div>
                <div style='width:20px;height:20px;display:inline-block;' :style="{backgroundColor:cs.color[2]}"></div>
            </div>
            <div class='col-sm-3' v-for='cs in colorSet3_3' :key='cs.name'>
                <span @click='nameOn(cs.name)'>{{cs.name}}:</span>
                <div style='width:20px;height:20px;display:inline-block;' :style="{backgroundColor:cs.color[0]}"></div>
                <div style='width:20px;height:20px;display:inline-block;' :style="{backgroundColor:cs.color[1]}"></div>
                <div style='width:20px;height:20px;display:inline-block;' :style="{backgroundColor:cs.color[2]}"></div>
            </div>
            <div class='col-sm-3' v-for='cs in colorSet3_4' :key='cs.name'>
                <span @click='nameOn(cs.name)'>{{cs.name}}:</span>
                <div style='width:20px;height:20px;display:inline-block;' :style="{backgroundColor:cs.color[0]}"></div>
                <div style='width:20px;height:20px;display:inline-block;' :style="{backgroundColor:cs.color[1]}"></div>
                <div style='width:20px;height:20px;display:inline-block;' :style="{backgroundColor:cs.color[2]}"></div>
            </div>
        </div>
        <span>色名クリックで色を選択できます</span><br />
        <span class='badge bg-danger'>selected:</span><span class='badge bg-info'>{{seled}}</span>
    </div>
</template>

<script>
/**
 * 
 */
//import * as brewer from './colorschemes.brewer'
//import colorschemes from 'chartjs-plugin-colorschemes'
//import * as brewer from '../../node_modules/chart/'
import * as brewer from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer.js'

export default {
    data: () => ({
        colorSet3:[],    // [{name:, colors:[]},...]
        colorSet3_2:[],
        colorSet3_3:[],
        colorSet3_4:[],
        seled:'',
        selColor:{}
    }),
    beforeMount(){
        //console.log('brewer', brewer)
        //console.log('.acc', brewer.Accent3)
        //console.log('length-', brewer.length, typeof(brewer))
        //const keyNum = Object.keys(brewer).length
        //console.log('key-num', keyNum)
        //var brewer = colorschemes.get(brewer)
        const keyList = Object.keys(brewer)
        keyList.forEach( (k) => {
            if(k.includes('3')){
                var x = {color: brewer[k]}
                x.name = k
                this.colorSet3.push(x)
            }
        })
        console.log('3s', this.colorSet3, this.colorSet3.length)
        const csLen = this.colorSet3.length

        var size = Math.floor(csLen / 4)

        this.colorSet3_2 = this.colorSet3.slice(size, size * 2)
        this.colorSet3_3 = this.colorSet3.slice(size*2, size * 3)        
        this.colorSet3_4 = this.colorSet3.slice(size*3)
        this.colorSet3 = this.colorSet3.slice(0, size)
    },
    mounted(){
        this.selColor = {c1:'#e7e1ef',c2:'#c994c7',c3:'#dd1c77'}
        this.$emit('colorChange', this.selColor)
    },
    methods:{
        nameOn(name){
            this.seled = name + ' --- ' + brewer[name]
            //SetThree3 --- #8dd3c7,#ffffb3,#bebada
            var x = brewer[name]
            //console.log('x', x)
            //var c = x.split(',')
            //this.selColor = {c1:c[0],c2:c[1],c3:c[2]}
            console.log('x', x)
            this.selColor = {c1:x[0],c2:x[1],c3:x[2]}
            this.$emit('colorChange', this.selColor)
        }
    }
    /*
    watch:{  
        selColor:{
            //eslint-disable-next-line
            handler:function(newd, oldd){
                this.$emit('colorChange', newd)
            },
            deep: true
        }
    }
    */
}
</script>

<style>

</style>