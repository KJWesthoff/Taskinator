
var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");




var createTaskHandler = function(event){
    event.preventDefault();
    //console.log(event);

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //console.log(taskNameInput)
    //console.log(taskTypeInput)

    // build a list item 
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    
    //put the content in div
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    
    // put the package in the li item
    listItemEl.appendChild(taskInfoEl);
    

    // add the whole schabang as a child
    tasksToDoEl.appendChild(listItemEl);
}


formEl.addEventListener("submit", createTaskHandler);

