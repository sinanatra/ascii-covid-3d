import './main.css';
import * as THREE from 'three';
import AsciiEffect from 'three-asciieffect';
import GLTFLoader from 'three-gltf-loader';
const loader = new GLTFLoader();

const TrackballControls = require('three-trackballcontrols');

var container;
var camera, controls, scene, renderer;
var sphere, plane, effect;
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
    var light = new THREE.PointLight(0xffffff);
    light.position.set(500, 500, 500);
    scene.add(light);
   
    
    sphere = ''

    loader.load('./src/models/covid.glb', gltf => {
        sphere = gltf.scene, new THREE.MeshLambertMaterial()
        scene.add(sphere);
        sphere.scale.set(200, 200, 200) // scale here
    });

    // Plane
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xf0f0f0);
    renderer.setSize(width, height);


    // container.appendChild( renderer.domElement );
    effect = new AsciiEffect(renderer);
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
    sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 150;
    sphere.rotation.x = timer * 0.0003;
    sphere.rotation.z = timer * 0.0002;
    camera.position.z = Math.abs(Math.sin(timer * 0.0002)) * 500;;
    controls.update();
    effect.render(scene, camera);

}
