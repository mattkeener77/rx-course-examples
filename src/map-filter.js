import {add} from "./helpers"
import {interval} from "rxjs";
import {map, filter, take} from "rxjs/operators";


const numbers = ['zero', 'one', 'two', 'three', 'four'];
const counter = interval(1000).pipe( take(4) );

counter.pipe(
  filter(
      (value) => {
          return value % 2 === 0
      }
  ),
  map(
      (value)=>{
          return numbers[value]
      }
  )
).subscribe(
    add.li
)



