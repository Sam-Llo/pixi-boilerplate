import { Application,  Container,  Graphics, filters} from 'pixi.js'// Texture, Sprite,
import { Emitter } from 'pixi-particles' // , Particle

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0xFFFAF1,
	width: window.innerWidth/2,
	height: window.innerHeight/2
});

// const clampy: Sprite = Sprite.from("clampy.png");

// clampy.anchor.set(0.5);

// clampy.x = app.screen.width / 2;
// clampy.y = app.screen.height / 2;

// app.stage.addChild(clampy);

// let mousex: number;
// let mousey: number;
// document.addEventListener("mousemove", (event) => {
// 	mousex = event.clientX; // Gets Mouse X
// 	mousey = event.clientY; // Gets Mouse Y
//   });

const dust  = new Graphics();
dust.beginFill(0x808080);
dust.drawCircle(0, 0, 30);
dust.endFill();

// let topLayer= new Container();
// app.stage.addChild(topLayer);

const container = new Container();
app.stage.addChild(container);

const particles = new Container();

const texture = app.renderer.generateTexture(dust);

const emitter = new Emitter(

	// The PIXI.Container to put the emitter in
	// if using blend modes, it's important to put this
	// on top of a bitmap, and not use the root stage Container
	particles,

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
		  "start": 0.05,
		  "end": 0.01,
		  "minimumScaleMultiplier": 0.08
		},
		
		//Starting and Ending Color
		"color": {
		  "start": "#ffffff",
		  "end": "#ffffff"
		},
		
		//Starting and Ending Speed with random
		"speed": {
		  "start": 100,
		  "end": 3,
		  "minimumSpeedMultiplier": 0
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
		  "min": -45,
		  "max": 45
		},
		
		//Allows to disable auto rotation based on drift
		"noRotation": false,
		
		//Force Rotation Speed Randomness - Positive or Negative = direction
		"rotationSpeed": {
		  "min": 0,
		  "max": 0
		},
		
		//Lifetime of Particle Randomness
		"lifetime": {
		  "min": 10,
		  "max": 10
		},
		
		//Blending Mode
		"blendMode": "normal",
		"frequency": 0.01,
		"emitterLifetime": -1,
		"maxParticles": 2000,
		"pos": {
			"x": 0,
			"y": 0
		},
		"addAtBack": false,
		"spawnType": "ring",
		"spawnCircle": {
			"x": window.innerWidth/2,
			"y": window.innerHeight/2,
			"r": 50,
			"minR": 50
		}
});

let randX: number;
let randY: number;
let fxn = function() {
	randX = Math.floor(Math.random() * window.innerWidth);
	randY = Math.floor(Math.random() * window.innerHeight);
  }
setInterval(fxn, 600);


// const rectStrobe  = new Graphics();
// rectStrobe.beginFill(0x808080);
// rectStrobe.drawRect(0, (Math.random() * window.innerHeight),  window.innerWidth, (Math.random() * window.innerHeight));
// rectStrobe.endFill();

// app.stage.addChild(rectStrobe);



// Calculate the current time
var elapsed = Date.now();

// Update function every frame
let update = function(){
	// Update the next frame
	requestAnimationFrame(update);
	var now = Date.now();
	// The emitter requires the elapsed
	// number of seconds since the last update
	emitter.spawnCircle.x = randX;
	emitter.spawnCircle.y = randY;
	emitter.update((now - elapsed) * 0.001);
	elapsed = now;
	container.addChild(particles)
};

emitter.emit = true;

update();

let rectStrobe = new Graphics();

let strobe = () => {
	rectStrobe.clear(); // removes last graphic drawn
	rectStrobe.filters = [new filters.BlurFilter(30,10,1)];
	rectStrobe.beginFill(0xFFFFFF);
	rectStrobe.drawRect(0, (Math.random() * window.innerHeight),  window.innerWidth, (Math.random() * window.innerHeight));
	rectStrobe.endFill();
	app.stage.addChild(rectStrobe);
	setTimeout(removeStrobe, 100);
  }

let removeStrobe = () => {
	app.stage.removeChild(rectStrobe);
}

setInterval(strobe, Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500);