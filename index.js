	$(function() {
	    if (!Detector.webgl) Detector.addGetWebGLMessage();

	    var container, stats, clock, controls,raycaster,INTERSECTED;
	    var camera, scene, renderer, mixer,mouse;
	    var config = {
	        apiKey: "AIzaSyDo1Jz7FTyOxmkdw3B2IixfSNxQJiGpvnw",
	        authDomain: "test-eefa2.firebaseapp.com",
	        databaseURL: "https://test-eefa2.firebaseio.com",
	        projectId: "test-eefa2",
	        storageBucket: "test-eefa2.appspot.com",
	        messagingSenderId: "334050492647"
	    };
	    firebase.initializeApp(config);

	    const container1 = document.getElementById("object");
	    const dataref = firebase.database().ref().child('object');
	    console.log(dataref);

	    init();
	    setTimeout(animate, 1000);
	    container = document.getElementById('webglcontainer');
		var objects = [];

	    function init() {
			$(".popup").hide();
	        container = document.getElementById('webglcontainer');
	        camera = new THREE.PerspectiveCamera(25, 400 / 300, 1, 10000);
	        camera.position.set(15, 10, -15);
	        var color = new THREE.Color("rgb(17, 177, 238)");
	        scene = new THREE.Scene();
	        scene.background = color;


	        // collada

			var loader = new THREE.ObjectLoader();
			loader.load(
				// resource URL
				'model1.json',
				// called when resource is loaded
				function ( object ) {
			
					scene.add( object );
					scene.children[3].traverse(function(children){
						objects.push(children);
					});
			
				},
				// called when loading is in progresses
				function ( xhr ) {
			
					console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			
				},
				// called when loading has errors
				function ( error ) {
			
					console.log( 'An error happened' );
			
				}
			);
	        // loader.load('model1.json', function(object) {
	        //     var avatar = object;
	        //     scene.add(avatar);

	        // });


			//
	

	        var gridHelper = new THREE.GridHelper(10, 20);
	        scene.add(gridHelper);

	        //

	        var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	        scene.add(ambientLight);

	        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
	        //  directionalLight.position.set( 1, 1, - 1 );
	        scene.add(directionalLight);

	        //

	        renderer = new THREE.WebGLRenderer({ antialias: true });
	        renderer.setPixelRatio(window.devicePixelRatio);
	        renderer.setSize(1000, 600);
	        container.appendChild(renderer.domElement);

	        //

	        controls = new THREE.OrbitControls(camera, renderer.domElement);
	        controls.target.set(0, 2, 0);
	        controls.update();



                         
	        //

	        //FPS SHOW
	        //stats = new Stats();
	        //container.appendChild(stats.dom);

	        //
			//projector = new THREE.Projector();
			
			raycaster=new THREE.Raycaster();
			mouse=new THREE.Vector2();

	        document.addEventListener('mousedown', onDocumentMouseDown, false);

			window.addEventListener('resize', onWindowResize, false);
			document.addEventListener( 'touchstart', onDocumentTouchStart, false ); 

	    }

		function onDocumentTouchStart( event ) {

			event.preventDefault();
	
			event.clientX = event.touches[0].clientX;
			event.clientY = event.touches[0].clientY;
			onDocumentMouseDown( event );
	
		}
		

	    function onDocumentMouseDown(event) {

			event.preventDefault();

			mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 0.97;
			mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1.18;
	
			raycaster.setFromCamera( mouse, camera );
	
			var intersects = raycaster.intersectObjects( objects );
			
			var color = (Math.random() * 0xffffff);
	
			if ( intersects.length > 0 ) {
	
				
				intersects[ 0 ].object.material.color.setHex( color );
				if(intersects[0].object.name=="sensor1")
				clicked(intersects[0].object);
			
				
			}

	    }

	    function clicked(object) {
		//	alert("sensor 1 clicked");
	        	 $( ".text" ).empty();
				 $( ".popup" ).append( "<div class='text'><p>This is the color <strong>#hello </strong> and the name assigned in Blender is <strong>" + object.name  + "</strong></p></div>" );
				 $(".popup").show();
	    }



	    function onWindowResize() {

	        camera.aspect = 400 / 400;
	        camera.updateProjectionMatrix();

	        renderer.setSize(400, 400);

	    }


	    function animate() {

	        requestAnimationFrame(animate);

	        render();
	    

	    }

	    function render() {

			

			


	        // //console.log(scene);
		//	raycaster.setFromCamera( mouse, camera );
	        scene.children[3].scale.x = 8;
	        scene.children[3].scale.y = 8;
	        scene.children[3].scale.z = 8;
	        scene.children[3].rotation.y = 1.5;
	        // dataref.on('value', snap => {
	        //     scene.children[3].children[0].children[1].rotation.x = snap.val().angle1;
	        //     scene.children[3].children[0].children[1].children[0].rotation.z = snap.val().angle2;
	        //     scene.children[3].children[0].children[1].children[0].children[0].children[0].children[0].rotation.x = snap.val().angle3;
	        //     scene.children[3].children[0].rotation.y = snap.val().angle4;
	        // });
	        //       console.log(scene);

	        renderer.render(scene, camera);

	    }

	});