# Data Structure Visualizer
#### Video Demo: https://youtu.be/kKr9-E7kS6M

By Jeremie Walls

A 3-D visualzation tool to make learning Data Strutures more fun and interactable.

## Technologies Used

* 3js
* Javascript
* Python
* Flask
* Bootstrap
* Css

## Description 

This browser application allows users to Visualize five different data structures Array, Linked List, 2-D Grid, Binary Tree and Graph.
There are 3 sample csv files included for each data type. These are located in /static/samples
Users are able to select from a dropdown menu the samples associated and also have the ability to upload their own csv files to pull data from.
Once a dataset is selected the dataset field will become editable.


## Controls

'Right Click: Drag'  
Left Click: Grab and Spin  



# Input Values

Each Data Structure takes a different format as follows in the dataset field

### Array
Accepts single line comma seperated values --1,2,3,4,5--
Will accept ints or strings.
Will not accept new line.

### Linked List
Accepts single line comma seperated values --1,2,3,4,5--
Will accept ints or strings.
Will not accept new line.

### 2-D Grid
Accepts multiple line comma sperated values --1,2,3,4,5--
Will accept ints or strings.
Will accept new line.

### Binary Tree
Accepts key value pairs --A,B-- --B,C--
Will accept ints or strings.
Will accept new line.

### Graph
Accepts key value pairs --A,B-- --B,C--
Will accept ints or strings.
Will accept new line.


## Return Values and Formating  

What happens in the flask post route for each data structure

### Array
Splits the data at every "," and appends all values to return_array 

### Linked List
Splits the data at every "," and appends all values to return_array

### 2-D Grid
Splits the data at every "\r\n"  and appends all vlaues to csv_split
Iterates through the csv_split and splits at every "," creating an array of arrays

### Binary Tree
Splits the data at every "\r\n"  and appends all vlaues to csv_split
Iterates through the csv_split and splits at every "," creating an array of key value pairs
Iterates through return_array searching for unique node ids
When an Id is found it is added to unique_vals array and also add to a dictonary that keeps track of which index that node was placed in the unique_vals array.
I then interate through return_array again using the indicies dictonary to replace all of the node names with their indexs in the unique_vals array
Unique_vals is then returned this will make sure there can only be one node.
Connections is the array of replaced indexs this will be used to gererate the arrows.

### Graph
Splits the data at every "\r\n"  and appends all vlaues to csv_split
Iterates through the csv_split and splits at every "," creating an array of key value pairs
Iterates through return_array searching for unique node ids
When an Id is found it is added to unique_vals array and also add to a dictonary that keeps track of which index that node was placed in the unique_vals array.
I then interate through return_array again using the indicies dictonary to replace all of node names with their indexs in the unique_vals array
Unique_vals is then returned this will make sure there can only be one node.
Connections is the array of replaced indexs this will be used to gererate the arrows.


## Cube and Sphere Generation and Placement

addNewCube and addNewSphere each take 5 parameters 
* Scene 
* Sprite Text
* Text on Object
* X value
* Y value

Once data is recieved from flask, jinja loops are used to generate the objects.
Each Data structure has a different placement algorithm as follows

### Array

{% for item in array %}
addNewCube(scene,"Array[{{loop.index - 1 }}]","{{item}}", x, 0);
x+= 1;
{%endfor%}

Simple x + 1 to move the cubes to the right


### Linked List

{% for item in array %}
addNewCube(scene,"Node{{loop.index - 1 }}","{{item}}", x, 0);
x+= 1.5;
{%endfor%}

Simple x + 1.5 to move cubes to the right and give space for lines


{% for num in range(array|length - 1)  %}
drawLines(cubes, [{{num}},{{num}} + 1]);
{% endfor %}

Connect every square in the array with a line.


### 2-D Grid

{% for row in grid %}    
  {% for col in row %}
        
    addNewCube(scene, "["+index_x+"]["+{{loop.index0}}+"]", "{{col}}", {{loop.index0}}, y)         
        
  {% endfor %}
  
  y-=2;
  index_x += 1;
{% endfor %}

Double for loop to generate grid y - 2 to move down 1 row 


### Binary Tree

var x = 0;  
var y =  0; 
var holder = Math.ceil(Math.sqrt({{array|length}}));
var level = holder / 2;
var left_corner = -holder;
var right_corner = holder;
var inital_node = true; 


{% for item in array %}

addNewSphere(scene,"{{item}}","{{item}}", x, y);
x+=holder* 2;

if(inital_node == true){
  x = left_corner;
  y -= 2;
  inital_node = false;
}
else if( x > right_corner){
  holder = holder/2;
  left_corner = left_corner - level;
  right_corner = right_corner + level;
  level = level / 2; 
  x = left_corner;
  y -=2;
}  
{% endfor %}


Initial node is placed at 0,0.

Holder represents how far out the second level of nodes will be placed.  
This is the squareroot of the number of items in the unique_vals array.  
This is nessacary to make sure there is enough room on the the bottom level for no overlap.  


Left_corner and Right_corner will be our edges. set to Holder value and Negative Holder value

Level Represents how far out the next left_corner or right_corner will be on the next level. This is half of holder value.

X+= holder*2    if node 2 is at -4 and node 3 is at +4 then it would take a +8 jump to make it from one to the other hence times 2. This is the main loop.

The if statement is checking if we have hit Right_corner.
Once this happens. Level gets added to our new edges. X is set to the new Left_corner and y - 2 to move it down. 

Holder and Level are both divided by half at each level.


{% for row in connections %}

  drawArrows(spheres,[{{ row[0] }},{{ row[1] }}]);
  
{% endfor %}

drawArrows takes 3 arguments
* the array of spheres
* index of orgin of arrow
* index of target of arrow


### Graph

var x = 0;
var y = 0;
var counter = 0;
var counter_2 = 0;
var counter_3 = 0;
var x_val = 0;
var y_val = -2;

// Loop through the array of items
{% for item in array %}
  
  addNewSphere(scene, "{{item}}", "{{item}}", x, y);
  x+= 2;
  counter +=1;
  if(counter == 2)
  {
     y -= 1;
     counter = 0;
     counter_2 += 1;
     
  }
  if(counter_2 == 2)
  {
    counter_2 = 0;
    x = x_val;
    x_val += 1;
    counter_3 += 1;
   
  }
  if(counter_3 == 2)
  {
    counter_3 = -100;
    x = 1;
    y = 5;
    
  } 
{% endfor %}


The main point of this algorithm is to evenly space out the nodes as best as possible. Its really just me playing around with numbers to get a pleasent effect.
It takes slow steps down and to the right then after about 16 nodes it gets reset above the intial graph and cuts through the middle again without overlapping. 