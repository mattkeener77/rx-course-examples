import {add} from "./helpers";
import {interval, animationFrameScheduler} from "rxjs";
import {throttle, take} from "rxjs/operators";

interval(0, animationFrameScheduler)
.pipe(
    throttle(
        ()=> interval(1000)
    ),
    take(10)
).subscribe(add.li)