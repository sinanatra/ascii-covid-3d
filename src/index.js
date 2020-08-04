import './main.css';
import * as THREE from 'three';
import AsciiEffect from 'three-asciieffect';
import GLTFLoader from 'three-gltf-loader';
const loader = new GLTFLoader();

const TrackballControls = require('three-trackballcontrols');

var container;
var camera, controls, scene, renderer;
var covid, plane, effect;
var start = Date.now();

init();
animate();

function init() {
    var width = window.innerWidth || 2;
    var height = window.innerHeight || 2;
    container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    camera.position.y = 150;
    camera.position.z = 500;
    controls = new TrackballControls(camera);
    scene = new THREE.Scene();

    var light = new THREE.PointLight( 0xffffff );
    light.position.set( 500, 500, 500 );
    scene.add( light );

    var light = new THREE.PointLight( 0xffffff, 0.25 );
    light.position.set( - 500, - 500, - 500 );
    scene.add( light );
    
    covid = ''

    loader.load('./src/models/covid.glb', gltf => {
        covid = gltf.scene,new THREE.MeshPhongMaterial( { flatShading: true } ) ;
        scene.add(covid);
        covid.scale.set(200, 200, 200) 
    });

    // Plane
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xf0f0f0);
    renderer.setSize(width, height);


    // container.appendChild( renderer.domElement );
    effect = new AsciiEffect( renderer, 'geo?!"’;:π*+•—-_,.  ', { invert: true } );
    effect.setSize(width, height);
    container.appendChild(effect.domElement);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    effect.setSize(window.innerWidth, window.innerHeight);
}
//
function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    var timer = Date.now() - start;
    covid.position.y =  timer * 0.0003;
    covid.rotation.x = timer * 0.0003;
    covid.rotation.z = timer * 0.0002;
    camera.position.z = Math.abs(Math.sin(timer * 0.0002)) * 500;;
    controls.update();
    effect.render(scene, camera);

}
