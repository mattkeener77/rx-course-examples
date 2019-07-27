import {add} from "./helpers";
import {interval} from "rxjs";
import {tap, map, take } from "rxjs/operators";

const counter = interval(1000);

counter.pipe(
    take(10),  
    map(x=>Math.pow(x, 2)),
    tap(
        (value)=> add.li('value from line 11: ' + value)
    ),
    map(x=>Math.sqrt(x))
).subscribe(add.li)