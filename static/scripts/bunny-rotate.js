import * as THREE from 'three';

const width = 300;
const height = 150;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer( { alpha: true } );
document.getElementById("threejs-canvas-container").appendChild(renderer.domElement);
//renderer.setSize( width, height, false );

var shapeGeometry = undefined;
const type = Math.floor(Math.random() * 4);
const detail = Math.random() > 0.75 ? 1 : 0;
if (type == 0) {
	shapeGeometry = new THREE.IcosahedronGeometry( 2.5, detail );
} else if (type == 1) {
	shapeGeometry = new THREE.DodecahedronGeometry( 2.5, detail );
} else if (type == 2) {
	shapeGeometry = new THREE.TetrahedronGeometry( 2.5, detail );
} else if (type == 3 ) {
	shapeGeometry = new THREE.OctahedronGeometry( 2.5, detail );
}
const geometry = new THREE.WireframeGeometry(shapeGeometry);

var vertices = geometry.getAttribute('position')

const vertexColors = [];
for (var i = 0; i < vertices.count; i++)
{
	if (i % 7 == 0) {
		vertexColors.push(182 / 255, 12 / 255, 68 / 255);
	} else if (i % 7 == 1) {
		vertexColors.push(253 / 255, 109 / 255, 2 / 255);
	} else if (i % 7 == 2) {
		vertexColors.push(211 / 255, 223 / 255, 44 / 255);
	} else if (i % 7 == 3) {
		vertexColors.push(85 / 255, 250 / 255, 165 / 255);
	} else if (i % 7 == 4) {
		vertexColors.push(6 / 255, 164 / 255, 249 / 255);
	} else if (i % 7 == 5) {
		vertexColors.push(28 / 255, 44 / 255, 225 / 255);
	} else if (i % 7 == 6) {
		vertexColors.push(145 / 255, 2 / 255, 110 / 255);
	}
}

geometry.setAttribute(
	'color',
	new THREE.BufferAttribute(new Float32Array(vertexColors), 3));

const lineMaterial = new THREE.LineBasicMaterial( {
	depthTest: true,
	opacity: 0.75,
	transparent: true,
	vertexColors: true,
} );

const line = new THREE.LineSegments( geometry, lineMaterial );

scene.add( line );

const outside = new THREE.DodecahedronGeometry(2.5, 2);
const outsideWire = new THREE.WireframeGeometry(outside);

const outsideLineMaterial = new THREE.LineBasicMaterial( {
	depthTest: true,
	opacity: 0.25,
	transparent: true,
	color: '#333333',
} );

const outsideLine = new THREE.LineSegments(outsideWire, outsideLineMaterial);
scene.add(outsideLine);

const texture = new THREE.TextureLoader().load('../images/buncake-transparent.webp'); 
const planeGeo = new THREE.PlaneGeometry( 2, 2 );
const material = new THREE.MeshBasicMaterial( {map: texture, transparent: true, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( planeGeo, material );
scene.add( plane );

camera.position.z = 5;

function resizeCanvasToDisplaySize() {
	const canvas = renderer.domElement;
	// look up the size the canvas is being displayed
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
  
	// adjust displayBuffer size to match
	if (canvas.width !== width || canvas.height !== height) {
	  // you must pass false here or three.js sadly fights the browser
	  renderer.setSize(width, height, false);
	  camera.aspect = width / height;
	  camera.updateProjectionMatrix();
  
	  // update any render target sizes here
	}
}

function animate() {

	requestAnimationFrame( animate );
	resizeCanvasToDisplaySize();

	line.rotation.x += 0.0005
	line.rotation.y += 0.005;
	outsideLine.rotation.x += 0.0005
	outsideLine.rotation.y += 0.005;
	plane.rotation.y -= 0.002;
	plane.rotation.x += 0.000002

	renderer.render( scene, camera );

}

animate();