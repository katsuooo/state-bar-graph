/**
 * 
 * 1min毎データ表示用のデータ作成
 * 
 * 
 * 
 */
import moment from 'moment'
/**
 * 1時間ごとにトグルするデータ
 * state = 0,1
 * 偶数時間 dnum/60 >>>奇数のとき、偶数時間データ作成中
 * 
 * 
 */
//eslint-disable-next-line
function alternative1h(){
    var x = []
    for(let h=0; h<24; h++){
        for(let m=0; m<60; m++){
            if(h%2 === 0){
                x.push(0)
            }else{
                x.push(1)
            }
        }
    }
    return x
}
/**
 * 3値サンプル
 */
function threeVal(){
    var x = []
    for(let h=0; h<24; h++){
        for(let m=0; m<60; m++){
            if(h === 12){
                x.push(1)
            }else if(h === 15){
                x.push(2)
            }else{
                x.push(0)
            }
        }
    }
    console.log('d-length', x.length)
    return x
}
function genMoment(h, m){
    var x = moment()
    x.hour(h)
    x.minute(m)
    return x
}

function convMoment(simTime){
    var x1 = moment()
    var x2 = moment()
    var x3 = moment()
    var x4 = moment()
    const time1 = simTime.errStart.split(':')
    const time2 = simTime.errStop.split(':')
    const time3 = simTime.emgStart.split(':')
    const time4 = simTime.emgStop.split(':')
    x1.hour(time1[0])
    x1.minute(time1[1])
    x2.hour(time2[0])
    x2.minute(time2[1])
    x3.hour(time3[0])
    x3.minute(time3[1])
    x4.hour(time4[0])
    x4.minute(time4[1])
    return {errStart:x1,errStop:x2,emgStart:x3,emgStop:x4}
}
/**
 * 3値サンプル
 */
function threeValWithTime(simTime){
    var x = []
    for(let h=0; h<24; h++){
        for(let m=0; m<60; m++){
            var time = genMoment(h, m)
            var mt = convMoment(simTime)
            if(time.isSameOrAfter(mt.emgStart)&&time.isBefore(mt.emgStop)){
                x.push(2)
            }else if(time.isSameOrAfter(mt.errStart)&&time.isBefore(mt.errStop)){
                x.push(1)
            }else{
                x.push(0)
            }
        }
    }
    return x
}
/**
 * 
 * 24h分のデータをつくる。
 * 
 * 
 */
function gen24h(){
    //return alternative1h()
    return threeVal()
}
/**
 * 
 */
function gen24hWithTime(simTime){
    return threeValWithTime(simTime)
}
/**
 * 
 */
export default {
    gen24h: gen24h,
    gen24hWithTime: gen24hWithTime
}

