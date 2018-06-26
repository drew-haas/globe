var main = (function() {
    "use strict";

    // global THREE.js vars
    var scene = new THREE.Scene(),
        renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000),
        ambientLight = new THREE.AmbientLight({ color: 0x404040, intensity: 0 }),
        textureLoader = new THREE.TextureLoader(),
        directionalLight = new THREE.DirectionalLight( 0xffffff ),
        pointLight = new THREE.PointLight(0xff0000, 1.9);

    // globe specific elements
    var globe = new THREE.Group(),
    RADIUS = 70,
    SEGMENTS = 50,
    RINGS = 50,
    bmap =  new THREE.TextureLoader("./src/media/earth-bump.jpg", {}, function(){}),
    smap =  new THREE.TextureLoader("./src/media/earth.jpg", {}, function(){});

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

            directionalLight.position.z = 500;
            directionalLight.intensity = .1;
            
            camera.position.z = 400;
            
            ambientLight.position.set( 0, 0, 600 );
            
            pointLight.intensity = 1.9;
            pointLight.position.x = 0;
            pointLight.position.y = 500;
            pointLight.position.z = -132;
        }
    };

    // position adjustments
    directionalLight.position.z = 500;
    directionalLight.intensity = .1;
    
    camera.position.z = 400;
    
    ambientLight.position.set( 0, 0, 600 );
    
    pointLight.position.x = 0;
    pointLight.position.y = 500;
    pointLight.position.z = -132;


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

    var isDragging = false;
    var previousMousePosition = {
        x: 0,
        y: 0
    };
    $(renderer.domElement).on('mousedown', function(e) {
        isDragging = true;
    })
    .on('mousemove', function(e) {
        //console.log(e);
        var deltaMove = {
            x: e.offsetX-previousMousePosition.x,
            y: e.offsetY-previousMousePosition.y
        };

        if(isDragging) {
                
            var deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    toRadians(deltaMove.y * .1),
                    toRadians(deltaMove.x * .1),
                    0,
                    'XYZ'
                ));
            
            globe.quaternion.multiplyQuaternions(deltaRotationQuaternion, globe.quaternion);
        }
        
        previousMousePosition = {
            x: e.offsetX,
            y: e.offsetY
        };
    });

    function toRadians(angle) {
        return angle * (Math.PI / 180);
    }
    
    $(document).on('mouseup', function(e) {
        isDragging = false;
    });

    // Rendering Animation
    function render() {
        // globe animation
        if(!isDragging) {
            globe.rotation.y += animationOptions.rotationSpeedY;
            globe.rotation.x += animationOptions.rotationSpeedX;
        }
        
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    // Set Up Scene
    function initScene() {
        // set up renderer
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.querySelector('#web-gl-container').appendChild(renderer.domElement);

        // add items to scene
        scene.add(ambientLight, directionalLight, pointLight);
        scene.add(camera);
        scene.add(globe);
        scene.background = new THREE.Color( 0x292826 );

        // add items to gui
        f1.add(animationOptions, 'rotationSpeedY', -.07, .07).listen();
        f1.add(animationOptions, 'rotationSpeedX', -.07, .07).listen();

        f2.add(ambientLight, 'intensity', -5, 5).listen();
        f2.add(ambientLight.position, 'x', -600, 600).listen();
        f2.add(ambientLight.position, 'y', -600, 600).listen();
        f2.add(ambientLight.position, 'z', -600, 600).listen();
        f2.addColor(ambientLight, 'color');

        f3.add(directionalLight, 'intensity', -5, 5).listen();
        f3.add(directionalLight.position, 'x', -600, 600).listen();
        f3.add(directionalLight.position, 'y', -600, 600).listen();
        f3.add(directionalLight.position, 'z', -600, 600).listen();

        f4.add(pointLight, 'intensity', -5, 5).listen();
        f4.add(pointLight.position, 'x', -600, 600).listen();
        f4.add(pointLight.position, 'y', -600, 600).listen();
        f4.add(pointLight.position, 'z', -600, 600).listen();
        f4.addColor(pointLight, 'color');
        gui.add(options, 'reset');

        render();
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