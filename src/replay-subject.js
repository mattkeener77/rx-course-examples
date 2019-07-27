import {add} from "./helpers";
import {ReplaySubject, interval} from "rxjs";
import {take} from "rxjs/operators";


const nums = new ReplaySubject(1);

interval(1000).subscribe(
    (value)=>{
        nums.next(value)
    }
    
);

setTimeout(
    ()=>{
        nums.pipe(take(5)).subscribe(
            (value)=>{
                add.li(`first: ${value}`)
            }
        );
    }, 5000
)


nums.pipe(take(5)).subscribe(
    (value)=>{
        add.li(`second: ${value}`)
    }
);