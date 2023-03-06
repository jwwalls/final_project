
function showUploadField(){
document.getElementById("uploadDiv").style.display = "block";
}

function showDataField(){
document.getElementById("dataDiv").style.display = "block";

}

function showStopField(){
document.getElementById("stopDiv").style.display = "block";
}

function hideGoButton(){
document.getElementById("goButton").style.display = "hidden";
}

function enableGoButton() {
goButton = document.getElementById("goButton");
goButton.disabled = false;
table = document.getElementById('table');
table.disabled = false;
}


//Load CSV data with dropdown
function loadCSV(file) {   
fetch('/static/samples/' + file)
.then(response => response.text())
.then(data => {document.getElementById('table').innerHTML = data; document.getElementById('about').innerHTML = "Dataset:";});
enableGoButton()
}

//load CSV data with upload
window.onload =() => {    
var reader = new FileReader(),
picker = document.getElementById("csvfile"),
table = document.getElementById("table");
title = document.getElementById("about");
picker.onchange = () => reader.readAsText(picker.files[0]);
reader.onloadend = () => {
let csv_data = reader.result;           
table.innerHTML  = csv_data;  
title.innerHTML = "Dataset:" ;   
enableGoButton()
}
}



function addNewCube(scene, item, cube_text, x_value, y_value) {
// Create cube geometry and outline
const geometry = new THREE.BoxGeometry(1, 1, 1);
const edgesGeometry = new THREE.EdgesGeometry(geometry);
const outlineMaterial = new THREE.LineBasicMaterial({color: 0x7dfdfe, linewidth: 10});
const outline = new THREE.LineSegments(edgesGeometry, outlineMaterial);


// Create canvas for sprite and set its properties
const canvas = document.createElement('canvas');
canvas.width = 256;
canvas.height = 64;


// Create canvas texture and sprite text
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#DF740C';
ctx.font = '24px sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText(item, canvas.width / 2, canvas.height / 2);
const texture = new THREE.CanvasTexture(canvas);
const spriteMaterial = new THREE.SpriteMaterial({map: texture});

// Create canvas for text on Cube
const canvasOnCube = document.createElement('canvas');
canvasOnCube.width = 128;
canvasOnCube.height = 32;

// Create canvas texture and cube text
const ctxOnCube = canvasOnCube.getContext('2d');
ctxOnCube.fillStyle = '#000000';
ctxOnCube.fillRect(0, 0, canvasOnCube.width, canvasOnCube.height);
ctxOnCube.fillStyle = '#FFFFFF';
ctxOnCube.font = '35px sans-serif';
ctxOnCube.textAlign = 'center';
ctxOnCube.textBaseline = 'middle';
ctxOnCube.fillText(cube_text, canvasOnCube.width / 2, canvasOnCube.height / 2);

const textureOnCube = new THREE.CanvasTexture(canvasOnCube);
const materialOnCube = new THREE.MeshBasicMaterial({ map: textureOnCube });

// Create cube mesh and sprite
const cube = new THREE.Mesh(geometry, materialOnCube);
const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(2, 0.5, 1);
sprite.position.set(0, 1, 0);
cube.add(sprite);
cube.add(outline);

// Position the cube and add it to the scene
cube.position.x = x_value;
cube.position.y = y_value;
cube.position.z = 0;
scene.add(cube);

cube.userData.isCube = true;
cubes.push(cube);
}

function addNewSphere(scene, item, sphere_text, x_value, y_value) {
// Create sphere geometry, material, and outline
const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const geometry2 = new THREE.SphereGeometry(0.5, 64, 34);
const edgesGeometry = new THREE.EdgesGeometry(geometry2);
const outlineMaterial = new THREE.LineBasicMaterial({color: 0x7dfdfe, linewidth: 10});
const outline = new THREE.LineSegments(edgesGeometry, outlineMaterial);

// Create canvas for sprite and set its properties
const canvas = document.createElement('canvas');
canvas.width = 256;
canvas.height = 64;  

// Create canvas texture and sprite text
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#DF740C';
ctx.font = '24px sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText(item, canvas.width / 2, canvas.height / 2);
const texture = new THREE.CanvasTexture(canvas);
const spriteMaterial = new THREE.SpriteMaterial({map: texture});

// Create canvas for text on sphere
const canvasOnSphere = document.createElement('canvas');
canvasOnSphere.width = 128;
canvasOnSphere.height = 32;

// Create canvas texture and sphere text
const ctxOnSphere = canvasOnSphere.getContext('2d');
ctxOnSphere.fillStyle = '#000000';
ctxOnSphere.fillRect(0, 0, canvasOnSphere.width, canvasOnSphere.height);
ctxOnSphere.fillStyle = '#FFFFFF';
ctxOnSphere.font = '35px sans-serif';
ctxOnSphere.textAlign = 'center';
ctxOnSphere.textBaseline = 'middle';
ctxOnSphere.fillText(sphere_text, canvasOnSphere.width / 2, canvasOnSphere.height / 2);

const textureOnSphere = new THREE.CanvasTexture(canvasOnSphere);
const materialOnSphere = new THREE.MeshBasicMaterial({ map: textureOnSphere });

// Create sphere mesh and sprite
const sphere = new THREE.Mesh(geometry, materialOnSphere);
const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(2, 0.5, 1);
sprite.position.set(0, 1, 0);
sphere.add(sprite);
sphere.add(outline);

// Position the sphere and add it to the scene
sphere.position.x = x_value;
sphere.position.y = y_value;
sphere.position.z = 0;
sphere.rotation.y = .45;
scene.add(sphere);
sphere.userData.isSphere = true;
spheres.push(sphere);
}

function drawArrows(mesh_array, indices) {
// Draw arrows for every connection
for (let i = 1; i < indices.length; i++) {
const prevMesh = mesh_array[indices[i - 1]];
const mesh = mesh_array[indices[i]];

// Get Direction and Create Arrow Geometry
const direction = new THREE.Vector3().subVectors(mesh.position, prevMesh.position);
const arrowGeometry = new THREE.CylinderGeometry(0, 0.05, 0.2, 12, 1);
const arrowMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });
const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
arrow.position.copy(prevMesh.position);
arrow.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
arrow.translateY(direction.length() / 2);

// Create line Geometry and Vectors
const lineGeometry = new THREE.BufferGeometry().setFromPoints([
new THREE.Vector3(prevMesh.position.x, prevMesh.position.y, prevMesh.position.z),
new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z)
]);

// Create Arrows and add to scene
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffa500 });
const line = new THREE.Line(lineGeometry, lineMaterial);

const group = new THREE.Group();
group.add(line);
group.add(arrow);
scene.add(group);}
}


function drawLines(mesh_array, indices) {
// Draw lines for every connection
for (let i = 1; i < indices.length; i++) {
const prevMesh = mesh_array[indices[i - 1]];
const mesh = mesh_array[indices[i]];

// Create line geometry
const lineGeometry = new THREE.BufferGeometry().setFromPoints([
new THREE.Vector3(prevMesh.position.x, prevMesh.position.y, prevMesh.position.z),
new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z)
]);

// Create lines and add to scene
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffa500 });
const line = new THREE.Line(lineGeometry, lineMaterial);
scene.add(line);
}
}