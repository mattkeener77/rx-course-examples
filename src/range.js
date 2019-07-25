import {add} from './helpers';
import {range, of} from 'rxjs';
import {delay, concatMap} from 'rxjs/operators';



const numbers = range(50, 51);


numbers.pipe(
    concatMap(
        (value) => of(value).pipe(delay(1000))
    )
).subscribe(add.li);