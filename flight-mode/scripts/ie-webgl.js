(function () {
    // copyright Mr Doob - http://www.mrdoob.com/lab/javascript/webgl/ie/

    // https://plus.google.com/113862800338869870683/posts/JQhbjTPvptp

    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    var scene, camera, light, logo, renderer;
    var start = Date.now();

    init();
    animate();

    function init() {

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 100 );
        camera.position.z = 20;
        scene.add( camera );

        light = new THREE.PointLight( 0xffffff, 0.25 );
        light.position.set( 0, - 3, - 6 );
        scene.add( light );

        light = new THREE.PointLight( 0xffffff );
        light.position.set( 0, 3, 6 );
        scene.add( light );

        logo = new THREE.Object3D();
        scene.add( logo );

        var loader = new THREE.SceneLoader();
        loader.load( 'scripts/ie.js', function ( data ) {

            var object = data.objects.BezierCurve;
            object.position.x = 0.5;
            object.rotation.x = 0;
            object.material = new THREE.MeshPhongMaterial( { color: 0x178cd6, emissive: 0x135fab, specular: 0x202020, shininess: 75 } );
            logo.add( object );

            var object = data.objects.Cylinder;
            object.position.y = 0.25;
            object.position.z = - 1;
            object.rotation.x = Math.PI / 3;
            object.rotation.y = Math.PI / 4;
            object.rotation.z = 0;
            object.scale.z = 0.1;
            object.material = new THREE.MeshPhongMaterial( { color: 0xffbb2b, emissive: 0xffbb2b, specular: 0x404040, shininess: 100, opacity: 0.75, transparent: true } );
            logo.add( object );


        } );

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById('start').appendChild( renderer.domElement );

    }

    function animate() {

        requestAnimationFrame( animate );

        logo.rotation.y = ( start - Date.now() )  / 2000;

        renderer.render( scene, camera );

    }

})();