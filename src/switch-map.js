import { fromEvent } from 'rxjs';
import { 
    map, 
    switchMap, 
    takeUntil,
    tap 
} from 'rxjs/operators';

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const moves = fromEvent(canvas, 'mousemove');
const down = fromEvent(canvas, 'mousedown');
const up = fromEvent(canvas, 'mouseup');

function brush (coords){
    context.lineWidth = 5;
    context.lineTo(coords.x, coords.y);
    context.stroke();
}

down.pipe(
    tap(
        (evt)=>{
            context.strokeStyle = "purple";
            context.beginPath();
            context.moveTo(evt.offsetX, evt.offsetY);
        }
    ),
    switchMap(
        (evt) => moves.pipe(
            map(
                evt=>{
                    return { x: evt.offsetX, y: evt.offsetY }
                }
            ),
            takeUntil(
                up
            )
        )
    )
).subscribe(
    (coords)=>{
        brush(coords);
    }
)
