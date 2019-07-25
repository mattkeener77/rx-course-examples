import { add, update, buildArray, Clock, moveTime } from "./helpers";
import { of, from, interval, range } from "rxjs";
import { map } from "rxjs/operators";


/**
 *  Create an instance of the Clock Class
 *  This will create an SVG element, and attach it to the DOM
 *  Inside the SVG will be all the elements we will be manipulating
 */
const clock = new Clock("chart");

// const seconds = buildArray(60);
// const secondMarks = from(seconds);





// const hours = buildArray(12);
// const hourMarks = of(...hours);




const timeTick$ = interval(1000).pipe(
  map(() => {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    return {
      hours,
      minutes,
      seconds
    };
  })
);

const secondHand = document.getElementById("seconds");
const minuteHand = document.getElementById("minutes");
const hourHand = document.getElementById("hours");

timeTick$.pipe(moveTime(60, "minutes")).subscribe(angle => {
  update.line(minuteHand, angle, "minute");
});

timeTick$.pipe(moveTime(60, "seconds")).subscribe(angle => {
  update.line(secondHand, angle, "second");
});

timeTick$.pipe(moveTime(12, "hours")).subscribe(angle => {
  update.line(hourHand, angle, "hour");
});
