import {add} from './helpers';
import {interval, fromEvent} from 'rxjs'
import {mergeAll, map, tap, take} from 'rxjs/operators';

const button = document.getElementById('submit');
const clicks = fromEvent(button, 'click');

const source = clicks.pipe(
    tap(
        (ev) => add.li('click')
    ),
    map(
        //Inner
        (ev) => {
            return interval(1000).pipe(take(3))
        } 
    )
);

source.pipe(
    mergeAll(1) // the same as concatAll()
).subscribe(add.li);