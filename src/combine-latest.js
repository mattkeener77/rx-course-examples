import {add} from './helpers';
import { of, interval, fromEvent} from 'rxjs';
import {take, map, combineAll, concatMap, delay} from 'rxjs/operators';

const button = document.getElementById('submit');
const streamOne = interval(1000).pipe(take(10));
const clicks = fromEvent(button, 'click');
const streamThree = interval(10).pipe(take(50),map(x=>x*100));
const streamFour = interval(2500).pipe(take(3), map(x=>x*10));


//combineLatest(streamOne, streamTwo, streamThree, streamFour)
const higherOrder = of(streamThree, streamFour, streamOne);
  const result = higherOrder.pipe(
    combineAll()
  );
   
  result.pipe(
      concatMap(
          streams => {
              return of(...streams).pipe(delay(1000))
          }
      )
  ).subscribe(add.li);
