import {add} from './helpers'
import {from, fromEvent, interval} from 'rxjs';
import {take, skip, skipWhile, skipLast, skipUntil} from 'rxjs/operators';


from(['apples', 'grapes', 'oranges', 'pears'])
.pipe(
    skipLast(2)
)

const button = document.getElementById('submit');
const buttonEvents = fromEvent(button, 'click');

interval(1000)
.pipe(
    skipUntil(buttonEvents)
)
.subscribe(add.li);