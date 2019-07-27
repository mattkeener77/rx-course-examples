import {interval, animationFrameScheduler, Subject} from "rxjs";
import { take } from "rxjs/operators";
import * as d3 from "d3";

const waveData = new Subject();


//Make sure to add and audio file of your choice in the /dist folder.
//Then reference it in the audio element in /dist/index.html
const audioCtx = new AudioContext();
const audioElement = document.getElementById('audioElement');

//Canvas setup
const canvas = document.querySelector('canvas');
const canvasCtx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;


//Web Audio API setup
const audioSrc = audioCtx.createMediaElementSource(audioElement);
const analyser = audioCtx.createAnalyser();

analyser.fftSize = 1024;
const bufferLength = analyser.frequencyBinCount;

audioCtx.resume().then(() => {
    console.log('Playback resumed successfully');
});

audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);

const dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);


// D3 Setup to draw the line
const x = d3.scaleLinear()
    .domain([0, analyser.frequencyBinCount])
    .range([0, width]);

const y = d3.scaleLinear()
    .domain([-175, 175])
    .range([height, 175]);


const line = d3.line()
    .x(function (d, i) { return x(i); })
    .y(function (d) { return y(d); })
    .context(canvasCtx);


function renderFullLine(d) {
    canvasCtx.strokeStyle = "rgb(255, 0, 100)";
    canvasCtx.beginPath();
    line(d);
    canvasCtx.stroke();
}

function renderLoop() {
    analyser.getByteTimeDomainData(dataArray);
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    waveData.next(dataArray)
}


waveData.subscribe(
    (d) =>{
        return renderFullLine(d);
    }
)


const loop = interval(0, animationFrameScheduler).pipe(
    //take(2000)
).subscribe(renderLoop);



