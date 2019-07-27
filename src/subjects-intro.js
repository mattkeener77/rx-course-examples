import {add} from './helpers';
import {Subject, Observable} from 'rxjs';

const sub = new Subject();
//Hot || Multicast

setTimeout(
    ()=>{
        sub.subscribe(x => add.li('S: ' + x))
    },1000
)
setTimeout(
    ()=>{
        sub.subscribe(x => add.li('S: ' + x))
    },1000
)
setTimeout(
    ()=>{
        sub.subscribe(x => add.li('S: ' + x))
    },1000
)

setTimeout(
    ()=>{
        sub.next(new Date() )
    },1005
)

//Cold Unicast

const obs = new Observable(
    (sub) => sub.next( new Date() )
)

setTimeout(
    ()=>{
        obs.subscribe(add.li)
    },1000
)
setTimeout(
    ()=>{
        obs.subscribe(add.li)
    }, 2001
)
setTimeout(
    ()=>{
        obs.subscribe(add.li)
    }, 3001
)



