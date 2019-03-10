function Todo(toDo, valueOfTodoItem) {
    this.ToDo = toDo;
    this.Done = valueOfTodoItem;
}

// Should create todo
function createToDo(todo){ 
    var todos = listToDo(); //Assigns the value of listToDo to the variable todos

    var newTodoItem = new Todo(todo, false);

    todos.push(newTodoItem); //Adds the value in todos

    localStorage.setItem("todo", JSON.stringify(todos)); //Saves string in localstorage
    displayTodos(todos); //Calls display todos function
}

// Should return an array of todos
function listToDo(){ //
    var allToDos = JSON.parse(localStorage.getItem("todo")); //Gets the value of todo from localstorage
    if (!(allToDos instanceof Array)) { //Checks if the value in alltodos is not an array
        return []; //Returns an empty array
    }

    return allToDos; // Returns alltodos 
    
}

//Should show all todos
function displayTodos(allToDos){ //Based on the value from allToDos

    document.getElementById("theList").innerHTML ="";
    document.getElementById("doneList").innerHTML =""; //Clears the list
    
    for(var i = 0; i < allToDos.length; i++) { //For loop based on length of allTodos array
        if(allToDos[i].Done === false){ 
            document.getElementById("theList").innerHTML += '<li class="list-group-item">' + allToDos[i].ToDo + 
            '<input class="todoCheckbox" type="checkbox" onChange="updateTodo(' + i + ')" ></input>' + '<button class="btn btn-danger btn-sm " onClick="deleteToDo(' + i + ')">Delete</button>' + "</li>"; //Every loop prints the value of alltodos and assigns checkbox and button with it. Prints it to different lists based on boolean. 
        }
        else {
            document.getElementById("doneList").innerHTML += '<li class="list-group-item">' + allToDos[i].ToDo + 
            '<input class="todoCheckbox" type="checkbox" onChange="updateTodo(' + i + ')" checked></input>' + '<button class="btn btn-danger btn-sm " onClick="deleteToDo(' + i + ')">Delete</button>' +  "</li>"; 

        }
    }
}


// Should update todo
function updateTodo(index){
    // console.log("Updating at index: ", index); //Just to check that i am updating the index i want

    var todos = listToDo(); //Assigns the value of listToDo to the variable todos

    todos[index].Done = !todos[index].Done; //Checks to the value of done is the opposite of done

    localStorage.setItem("todo", JSON.stringify(todos)); //Saves as string in localstorage
    
    displayTodos(todos); //Calls the displayTodos function
}

// Should delete todo
function deleteToDo(index){
    // console.log("Removing at index: ", index);
    
    var todos = listToDo()
    
    todos.splice(index, 1);

    localStorage.setItem("todo", JSON.stringify(todos));

    displayTodos(todos);

}

//should sort todolist
function sort() {
    var allToDos = JSON.parse(localStorage.getItem("todo"));

    allToDos.sort(function(a,b) {
        var x = a.ToDo.toLowerCase();
        var y = b.ToDo.toLowerCase();

        if(x < y) {
            return -1; //
        }
        if (x > y) {
            return 1;
        }
        return 0;

        //return x < y ? -1 : x > y ? 1 : 0; //Cleaner way of writing the if statement above
    });


    //console.log("Sorted: ", allToDos);
    localStorage.setItem("todo", JSON.stringify(allToDos));
    displayTodos(allToDos);
}



