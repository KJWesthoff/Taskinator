
var pageContentEl = document.querySelector("#page-content");

var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;




var taskFormHandler = function(event){
    event.preventDefault();
    //console.log(event);

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    if(!taskNameInput || !taskTypeInput){
        alert("Need to fill out the task form")
        return false;
    }

    formEl.reset();

    // package up data as an object
    var dataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to create task El
    createTaskEl(dataObj);
}

var createTaskEl = function(dataObj){
     // build a list item 
     var listItemEl = document.createElement("li");
     listItemEl.className = "task-item";
     
     // add a data-* is to the task element
     listItemEl.setAttribute("data-task-id", taskIdCounter);   

     //put the content in div
     var taskInfoEl = document.createElement("div");
     taskInfoEl.className = "task-info";
     taskInfoEl.innerHTML = "<h3 class='task-name'>" + dataObj.name + "</h3><span class='task-type'>" + dataObj.type + "</span>";
     
     // put the package in the li item
     listItemEl.appendChild(taskInfoEl);
     
     // build the task element and append to list element
     var taskActionsEl = createTaskActions(taskIdCounter);
     listItemEl.appendChild(taskActionsEl);
     // add the whole schabang as a child
     tasksToDoEl.appendChild(listItemEl);

     // add one to the task counter each time the function runs
     taskIdCounter += 1;
}

var createTaskActions = function(taskId){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //edit button
    var editbuttonEl = document.createElement("button");
    editbuttonEl.textContent = "Edit";
    editbuttonEl.className = "btn edit-btn";
    editbuttonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editbuttonEl);

    //delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);
    
    // dropdown for staus
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);     
    
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for(choice of statusChoices){
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = choice;
        statusOptionEl.setAttribute("value", choice);
        // put the choises in the select element
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;

};


formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event){
    console.log(event.target);

    // if the edit button is clicked
    if (event.target.matches(".edit-btn")){
        
        var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    }

    // if the delete button is clicked
    if (event.target.matches(".delete-btn")){
        // get the element id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

// edit task by sending task name and type to the form in the header
var editTask = function(taskId){
    console.log("editing task #" + taskId);

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    console.log(taskSelected);

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save-Task";
    formEl.setAttribute("data-task-id", taskId);
}

var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler)
