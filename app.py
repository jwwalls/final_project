from flask import Flask, render_template, request
from flask_session import Session
# Configure application
app = Flask(__name__)
Session(app)


@app.route("/", methods=["GET", "POST"])
def index():  
    return render_template("index.html")

    
@app.route("/array", methods=["GET", "POST"])
def array():
    if request.method == "GET":        
        return render_template("array.html", array=[1,2,3])
    
    else:
        array = request.form.get("table")
        csv_split = array.split(",")        
        return_array = []
        for row in csv_split:            
            return_array.append(row)   
        return render_template("array.html", array=return_array)
    
@app.route("/linked_list", methods=["GET", "POST"])
def linked_list():
    if request.method == "GET":        
        return render_template("linked_list.html", array=[2,1,3])
    
    else:
        array = request.form.get("table")
        csv_split = array.split(",")        
        return_array = []
        
        for row in csv_split:            
            return_array.append(row)   
        return render_template("linked_list.html", array=return_array)
    

@app.route("/grid", methods=["GET", "POST"])
def grid():
    if request.method == "GET":
        
        return render_template("grid.html", grid=[{1,2},{3, 4}])
    else:
        array = request.form.get("table")
        csv_split = array.split("\r\n")
        return_array = []

        for row in csv_split: 
            row = row.split(",")
            return_array.append(row)
   
        return render_template("grid.html", grid=return_array)

@app.route("/binary_tree", methods=["GET", "POST"])
def binary_tree():
    if request.method == "GET":        
        return render_template("binary_tree.html",array = [1,2,3],connections=[[0,1],[0,2]])
    
    else:
        array = request.form.get("table")
        csv_split = array.split("\r\n")    
        return_array = []
       
        for row in csv_split:            
            return_array.append(row.split(",")) 
        
        unique_vals = []
        indices_dict = {}
        
        for connection in return_array:
            for val in connection:
                if val not in unique_vals:
                    unique_vals.append(val)
                    indices_dict[val] = len(unique_vals) - 1  
        
        connections_index = [[indices_dict[node] for node in connection] for connection in return_array]              

        return render_template("binary_tree.html", array=unique_vals, connections=connections_index)

@app.route("/graph", methods=["GET", "POST"])
def graph():
    if request.method == "GET":        
        return render_template("graph.html",array = [1,2,3],connections=[[0,1],[1,2],[2,0]])
    else:
        array = request.form.get("table")
        csv_split = array.split("\r\n")            
        
        return_array = []
        for row in csv_split:            
            return_array.append(row.split(",")) 
        
        unique_vals = []
        indices_dict = {}
        
        for connection in return_array:
            for val in connection:
                if val not in unique_vals:
                    unique_vals.append(val)
                    indices_dict[val] = len(unique_vals) - 1  
        
        connections_index = [[indices_dict[node] for node in connection] for connection in return_array]              

        return render_template("graph.html", array=unique_vals, connections=connections_index)





        




