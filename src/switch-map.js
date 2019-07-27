import { fromEvent } from 'rxjs';
import { 
    map, 
    switchMap, 
    takeUntil,
    tap 
} from 'rxjs/operators';

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");


function brush (coords){
    context.lineWidth = 5;
    context.lineTo(coords.x, coords.y);
    context.stroke();
}

