var main = (function() {
    "use strict";

    // global THREE.js vars
    var scene = new THREE.Scene(),
        renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000),
        light1 = new THREE.AmbientLight({ color: 0x404040, intensity: 0 }),
        textureLoader = new THREE.TextureLoader(),
        directionalLight = new THREE.DirectionalLight( 0xffffff ),
        pointLight = new THREE.PointLight( 0xffffff ),
        spotLight1 = createSpotlight( 0xFF7F00 );   

    // globe specific elements
    var globe = new THREE.Group(),
    RADIUS = 70,
    SEGMENTS = 50,
    RINGS = 50,
    bmap =  new THREE.TextureLoader("./src/media/earth-bump.jpg", {}, function(){}),
    smap =  new THREE.TextureLoader("./src/media/earth.jpg", {}, function(){});

    // needed to Rotate the globe on mousemove
    var targetRotationX = 0;
    var targetRotationOnMouseDownX = 0;
    var targetRotationY = 0;
    var targetRotationOnMouseDownY = 0;
    var targetRotation = 0;
	var targetRotationOnMouseDown = 0;
    var mouseX = 0;
	var mouseXOnMouseDown = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var slowingFactor = 0.4;

    // animation options for gui
    var animationOptions = {
        rotationSpeedY: 0.0007,
        rotationSpeedX: 0.0000
    };

    // dat gui options
    var gui = new dat.GUI();
    var f1 = gui.addFolder('Animations');
    var f2 = gui.addFolder('Ambient Light');
    var f3 = gui.addFolder('Directional Light');
    var f4 = gui.addFolder('Point Light');
    var options = {
        camera: {
            speed: 0.0001
        },
        reset: function() {
            globe.rotation.x = 0;
            animationOptions.rotationSpeedY = 0.0007;
            animationOptions.rotationSpeedX = 0;
        }
    };

    // position adjustments
    directionalLight.position.z = 500;
    camera.position.z = 400;
    light1.position.set( 0, 0, 600 );

    // Creating the Globe
    textureLoader.load( './src/media/earth.jpg', function ( texture ) {
        // Create the sphere
        var sphere = new THREE.SphereGeometry(RADIUS,SEGMENTS,RINGS);

        // Map the texture to the material. 
        var material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpMap: bmap,
            overdraw: 5,
            shininess:  20,
        });

        // Create a new mesh with sphere geometry.
        var mesh = new THREE.Mesh( sphere, material );

        // Add mesh to globe
        globe.add(mesh);
    });

    function createSpotlight( color ) {
        var newObj = new THREE.SpotLight( color, 2 );
        newObj.castShadow = true;
        newObj.angle = 0.3;
        newObj.penumbra = 0.2;
        newObj.decay = 2;
        newObj.distance = 50;
        newObj.shadow.mapSize.width = 1024;
        newObj.shadow.mapSize.height = 1024;
        return newObj;
    }

    // Rendering Animation
    function render() {
        globe.rotation.y += animationOptions.rotationSpeedY;
        globe.rotation.x += animationOptions.rotationSpeedX;
        
        /* rotateAroundWorldAxis(globe, new THREE.Vector3(0, 1, 0), targetRotationY);
        rotateAroundWorldAxis(globe, new THREE.Vector3(1, 0, 0), targetRotationX);
        targetRotationY = targetRotationY * (1 - slowingFactor);
        targetRotationX = targetRotationX * (1 - slowingFactor); */
        
        //controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    // Set Up Scene
    function initScene() {
        // set up renderer
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.querySelector('#web-gl-container').appendChild(renderer.domElement);

        // add items to scene
        scene.add(light1, directionalLight, pointLight);
        scene.add(camera);
        scene.add(globe);
        scene.background = new THREE.Color( 0x292826 );

        // add items to gui
        f1.add(animationOptions, 'rotationSpeedY', -.07, .07).listen();
        f1.add(animationOptions, 'rotationSpeedX', -.07, .07).listen();

        f2.add(light1, 'intensity', -5, 5).listen();
        f2.add(light1.position, 'x', -500, 500).listen();
        f2.add(light1.position, 'y', -500, 500).listen();
        f2.add(light1.position, 'z', -500, 500).listen();
        f2.addColor(light1, 'color');

        f3.add(directionalLight, 'intensity', -5, 5).listen();
        f3.add(directionalLight.position, 'x', -500, 500).listen();
        f3.add(directionalLight.position, 'y', -500, 500).listen();
        f3.add(directionalLight.position, 'z', -500, 500).listen();

        f4.add(pointLight, 'intensity', -5, 5).listen();
        f4.add(pointLight.position, 'x', -500, 500).listen();
        f4.add(pointLight.position, 'y', -500, 500).listen();
        f4.add(pointLight.position, 'z', -500, 500).listen();
        f4.addColor(pointLight, 'color');
        gui.add(options, 'reset');

        // Mouse Controls
        document.addEventListener( 'mousedown', onDocumentMouseDown, false );

        render();
    }

    // TODO: these aren't working as intended
    function onDocumentMouseDown( event ) {
        event.preventDefault();
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        document.addEventListener( 'mouseout', onDocumentMouseOut, false );
        mouseXOnMouseDown = event.clientX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;
    }
    function onDocumentMouseMove( event ) {
        mouseX = event.clientX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
    }
    function onDocumentMouseUp( event ) {
        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
    }
    function onDocumentMouseOut( event ) {
        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
    }
    function rotateAroundObjectAxis(object, axis, radians) {
        var rotationMatrix = new THREE.Matrix4();

        rotationMatrix.makeRotationAxis(axis.normalize(), radians);
        object.matrix.multiply(rotationMatrix);
        object.rotation.setFromRotationMatrix( object.matrix );
    }

    function rotateAroundWorldAxis( object, axis, radians ) {
        var rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationAxis( axis.normalize(), radians );
        rotationMatrix.multiply( object.matrix ); // pre-multiply
        object.matrix = rotationMatrix;
        object.rotation.setFromRotationMatrix( object.matrix );
    }

    // resize screen
    window.addEventListener('resize', onWindowResize, false );
    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    // Init
    window.onload = initScene;

    return {
        scene: scene
    }
    
  })();