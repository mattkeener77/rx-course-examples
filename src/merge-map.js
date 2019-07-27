import { add, animate } from "./helpers";
import { fromEvent, interval } from "rxjs";
import { 
    exhaustMap, 
    switchMap, 
    mergeMap,
    map,
    take
} from "rxjs/operators";

// Projects each source value to an Observable which is merged
// in the output Observable only if the previous projected
// Observable has completed.

const startButton = document.getElementById("start");
const startClicked = fromEvent(startButton, "click");
const circle = document.getElementById("circle");



// startClicked
//     .pipe(
//         mergeMap(
//             () => {
//                 return animate(5000)
//             }
//         )
//     ).subscribe(
//         (t) => {
//             circle.style.marginLeft = `${t*450}px`
//         }
//     )


interval(2000)
    .pipe(
        take(3),
        map(
            value => `${value * 100}`
        ),
       mergeMap(
            x => {
                console.log(`Source: ${x}`) 
                // This generated Observable has to complete
                // Before any value to the source is listened to.
                // If the values from the source complete before the 
                // generated Observable, they will be ignored.
                return interval(1000).pipe(
                    take(5),
                    map(
                        value => `inner(${value}), outer(${x})`
                    )
                )
            }
        )
    )
    .subscribe(
        value => add.li(`Emitted Value: ${value}`)
    );