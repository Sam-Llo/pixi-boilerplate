import { Application, Sprite, Container, Texture} from 'pixi.js'
import { Emitter, Particle } from 'pixi-particles'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});

// const clampy: Sprite = Sprite.from("clampy.png");

// clampy.anchor.set(0.5);

// clampy.x = app.screen.width / 2;
// clampy.y = app.screen.height / 2;

// app.stage.addChild(clampy);

document.addEventListener("mousemove", (event) => {
	let mousex = event.clientX; // Gets Mouse X
	let mousey = event.clientY; // Gets Mouse Y
	console.log([mousex, mousey]); // Prints data
  });

const container = new Container();
const texture = Texture.from('clampy.png')

const emitter = new Emitter(

	// The PIXI.Container to put the emitter in
	// if using blend modes, it's important to put this
	// on top of a bitmap, and not use the root stage Container
	container,

	// The collection of particle images to use
	[texture],

	// Emitter configuration, edit this to change the look
	// of the emitter
	{
      
		//Starting and End Alpha 0 - 1
		"alpha": {
		  "start": 1,
		  "end": 0.1
		},
		
		//Starting and Ending Size with randomness
		"scale": {
		  "start": 0.1,
		  "end": 0.5,
		  "minimumScaleMultiplier": 0
		},
		
		//Starting and Ending Color
		"color": {
		  "start": "#ffffff",
		  "end": "#ffffff"
		},
		
		//Starting and Ending Speed with random
		"speed": {
		  "start": 10,
		  "end": 10,
		  "minimumSpeedMultiplier": 50
		},
		
		//Directional Drift
		"acceleration": {
		  "x": 0,
		  "y": 0
		},
		
		//Maximum speed or Drift
		"maxSpeed": 0,
		
		//Direction of movement 0 360
		"startRotation": {
		  "min": 90,
		  "max": 90
		},
		
		//Allows to disable auto rotation based on drift
		"noRotation": false,
		
		//Force Rotation Speed Randomness - Positive or Negative = direction
		"rotationSpeed": {
		  "min": 0,
		  "max": 20
		},
		
		//Lifetime of Particle Randomness
		"lifetime": {
		  "min": 20,
		  "max": 20
		},
		
		//Blending Mode
		"blendMode": "normal",
		
		//How Quickly New Particles Are Generated
		"frequency": 0.1,
		
		//How Long the Particles Are Generated 
		"emitterLifetime": -1,
		
		//Maximum Paticles at a Time
		"maxParticles": 10000,
		
		//Starting Position of emitter
		"pos": {
		  "x": 0,
		  "y": 0
		},
		
		//If particles should be added to the back of the display
		"addAtBack": false,
		
		//Emitter Type with properties
		"spawnType": "rect",
		"spawnRect": {
		  "x":0 ,
		  "y":0,
		  "w": window.innerWidth/2,
		  "h": 0
		}
	  }
);

// Calculate the current time
var elapsed = Date.now();

// Update function every frame
let update = function(){
	// Update the next frame
	requestAnimationFrame(update);
	var now = Date.now();
	// The emitter requires the elapsed
	// number of seconds since the last update
	emitter.update((now - elapsed) * 0.001);
	elapsed = now;
	app.stage.addChild(container)
};

emitter.emit = true;

update();