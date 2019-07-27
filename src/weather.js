import { ajax } from "rxjs/ajax";
import { fromEvent, BehaviorSubject, Subject, from, combineLatest } from "rxjs";
import {
  tap,
  debounce,
  debounceTime,
  switchMap,
  skipWhile,
  pluck
} from "rxjs/operators";
import { add } from "./helpers";

const lastSearch = localStorage.getItem("lastSearch");
const firstTerm = lastSearch !== undefined ? lastSearch : "";

// Handles to our Elements
const searchBox = document.getElementById("search");
const resultsBox = document.getElementById("results-container");
const spinner = document.getElementById("spinner");

// Event Handlers
const searchEvent = fromEvent(searchBox, "keyup");
const resultsEvent = fromEvent(resultsBox, "click");

// Subjects
const inputSubject = new BehaviorSubject(firstTerm);
const placeSubject = new Subject();
const weatherSubject = new Subject();

const inputData = inputSubject
  .pipe(
    skipWhile(value => value === null || value.length < 3),
    tap(() => {
      spinner.className = "spinner";
      resultsBox.innerHTML = "";
    }),
    debounceTime(1000),
    switchMap(searchTerm => {
      return ajax
        .getJSON(`http://localhost:3000/autocomplete/${searchTerm}`)
        .pipe(
          tap(() => {
            spinner.className = "";
          }),
          switchMap(results => {
            return from(results);
          })
        );
    })
  )
  .subscribe(result => {
    localStorage.setItem("lastSearch", searchBox.value);
    add.result(result.description, result.place_id);
  });

searchEvent.subscribe(ev => {
  inputSubject.next(searchBox.value);
});

const placeData = resultsEvent
  .pipe(
    switchMap(ev => {
      const id = ev.target.getAttribute("data");
      return ajax.getJSON(`http://localhost:3000/place/${id}`);
    })
  )
  .subscribe(place => {
    placeSubject.next(place);
  });

const weatherData = placeSubject.pipe(
  pluck("geometry", "location"),
  switchMap(coords => {
    return ajax
      .getJSON(`http://localhost:3000/weather/${coords.lat}/${coords.lng}`)
      .pipe(pluck("currently"));
  })
);

combineLatest(weatherData, placeSubject).subscribe(result => {
  const weather = result[0];
  const place = result[1];
  console.log(place);
  document.getElementById("image-container").innerHTML = "";
  if (place.photos !== undefined) {
    const photos = place.photos;
    const photoNum = Math.floor(Math.random() * photos.length);
    add.div(`
    <div class="row">
    <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
          <img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
            photos[photoNum].photo_reference
          }&key=AIzaSyC6nPv41GnWisxybjKzo4NG7szBfDvHT_s">
          <div class="bg-gradient"></div>
          <span class="card-title">Feels Like: ${Math.round(
            weather.apparentTemperature
          )}&deg;</span>
        </div>
        <div class="card-content">
        <p>Current Conditions: ${weather.summary}</p>
        <p>Chance of Rain: ${weather.precipProbability}%</p>
        </div>
        
      </div>
    </div>
  </div>
    `);
  } else {
    add.div(
      `
     <div class="row">
     <div class="col s12 m6">
       <div class="card pink darken-1">
         <div class="card-content white-text">
           <span class="card-title">Feels Like: ${Math.round(
             weather.apparentTemperature
           )}&deg;</span>
           <p>Current Conditions: ${weather.summary}</p>
           <p>Chance of Rain: ${weather.precipProbability}%</p>
         </div>
         
       </div>
     </div>
   </div> 
     `
    );
  }
});
