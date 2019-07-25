import {add} from './helpers';
import {timer, interval, range} from 'rxjs';
import { skip, take,delay,filter } from 'rxjs/operators';

// const counter = timer(3000, 1000).subscribe(add.li);

interval(1000).pipe(
    filter(
        (n)=> n % 2 === 0
    )
)



// const counter = interval(1000).pipe(
//     skip(3)
// ).subscribe(add.li);

// timer(6000).subscribe(
//     ()=>{
//         counter.unsubscribe();
//     }
// )

