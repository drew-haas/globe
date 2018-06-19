var scene = new THREE.Scene(),
	light = new THREE.AmbientLight(0xffffff),
	light2 = new THREE.PointLight(0xffffff),
	camera = new THREE.PerspectiveCamera(
		// fov, aspect, near, far
		35,
		window.innerWidth / window.innerHeight,
		1,
		1000
	),
	renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
	globe = new THREE.Mesh(
		new THREE.SphereGeometry( 5, 32, 32 ),
		new THREE.MeshBasicMaterial( {color: 0xf15922} )
	);

class main {
	constructor() {
		//
	}
	
	render() {
		renderer.render(scene, camera);
		requestAnimationFrame(this.render);
	}

	initScene() {
		// set up renderer
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.querySelector('#web-gl-container').appendChild(renderer.domElement);
		
		// add items to scene
		scene.add(light);
		scene.add(camera);
		scene.add(globe);

		// render
		this.render();
	}

	

	init() {
		this.initScene();

		// todo: create resize function
	}
}