import {add} from './helpers';
import { merge, interval, fromEvent} from 'rxjs';
import {take, map} from 'rxjs/operators';

const button = document.getElementById('submit');
const streamOne = interval(1000).pipe(take(10));
const streamTwo = fromEvent(button, 'click').pipe(
    map(
        (e)=> 'clicked'
    )
);


merge(streamOne, streamTwo).subscribe(add.li);