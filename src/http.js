import {add} from './helpers';
import {fromFetch} from 'rxjs/fetch';
import {ajax} from 'rxjs/ajax';
import {of, pipe} from 'rxjs';
import { switchMap, mergeMap, concatMap, delay, retry} from 'rxjs/operators';

//Custom Operators
function getJSON(){
    return  switchMap(
        response =>{
            return response.json()
        }
    )
}

function emitEach(d){
    return pipe(
        switchMap( response => of(...response)),
        concatMap(
            response => {
                return of(response).pipe(delay(d) )
            }
        )
    )
}

const users = fromFetch("https://jsonplaceholder.typicode.com/users")
.pipe(
   getJSON(),
   emitEach(2000)
)
.subscribe(   
    user =>{
        add.li(user.name);
    }
)

// const users = ajax.getJSON("https://jsonplaceholder.typicode.com/users")
// .pipe(
//     retry(3)
// )
// .subscribe(
//     response => {
//         response.forEach(
//             user => add.li(user.name)
//         )
//     }
  
// )
