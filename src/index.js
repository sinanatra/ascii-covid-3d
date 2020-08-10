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
let i = random();
let j = random();

init();
animate();

function init() {
    var width = window.innerWidth || 2;
    var height = window.innerHeight || 2;
    container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    camera.position.y = 50;
    camera.position.z = 500;
    controls = new TrackballControls(camera);
    controls.enabled = false;
    scene = new THREE.Scene();

    var light = new THREE.PointLight(0xffffff, 10);
    light.position.set(500, 500, 500);
    scene.add(light);

    var light = new THREE.PointLight(0xffffff, 15);
    light.position.set(1500, 1500, 1500);
    scene.add(light);

    covid = ''

    loader.load('./src/assets/covid.glb', gltf => {
        covid = gltf.scene, new THREE.MeshPhongMaterial({ flatShading: true });
        scene.add(covid);
        covid.scale.set(200, 200, 200)
    });

    // Plane
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xf0f0f0);
    renderer.setSize(width, height);

    // container.appendChild( renderer.domElement, ); 

    let random_boolean = Math.random() >= 0.5;

    let ascii = '|/^+—•-_,.';
    let ascii1 = ' ▁▂▃▄▅▆▇█';
    let ascii2 = ' .:-=+*#/';
    let ascii3 = '/|•¬—–- ';

    effect = new AsciiEffect(renderer, eval('ascii' + j), { invert: random_boolean });
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

    function animation1() {
        covid.rotation.x = timer * 0.0002;
    }

    function animation2() {
        covid.position.z = Math.abs(Math.sin(timer * 0.0002)) * 400;
        camera.position.z = Math.abs(Math.sin(timer * 0.0002)) * 1200;

    }

    function animation3() {
        covid.position.y = timer * 0.0003;
        covid.rotation.x = timer * 0.0003;
        covid.rotation.z = timer * 0.0002;
        camera.position.z = Math.abs(Math.sin(timer * 0.0002)) * 300;
    }

    eval('animation'+i+'()');
    controls.update();
    effect.render(scene, camera);

}

function random() {
    var i = Math.floor(Math.random() * 20) % 4;
    if (i <= 0) return random();
    return i;
}