import {add} from "./helpers";
import {interval, from} from "rxjs";
import {scan,reduce, take, concatMap} from "rxjs/operators";



const FS = interval(100).pipe(
    take(20),
    scan(
        (acc,value)=>{
            const n = value + 1;
            const last = acc[n];
            const beforeLast = acc[n-1];

            return [...acc, last + beforeLast]
        }, [0,1]
    )
)

FS.pipe(
    concatMap(sequence => from(sequence))
)
.subscribe(add.li);
