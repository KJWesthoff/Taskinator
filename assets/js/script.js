
var pageContentEl = document.querySelector("#page-content");

var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var taskIdCounter = 0;
var tasksArr = [];




var taskFormHandler = function(event){
    event.preventDefault();
    //console.log(event);

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //check if the form is being used to edit 
    var isEdit = formEl.hasAttribute("data-task-id");
    
    
    if(!taskNameInput || !taskTypeInput){
        alert("Need to fill out the task form")
        return false;
    }

    formEl.reset();

    

    // send it as an argument to create task El
    if(isEdit){
        var taskId = formEl.getAttribute("data-task-id");
        comepleteEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        // package up data as an object
        var dataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to-do"
        };

        createTaskEl(dataObj);
    }

    
}

var comepleteEditTask = function(taskName, taskType, taskId) {
    // find list item with task id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set values from the form in the header
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasksArr.length; i++) {
        if (tasksArr[i].id === parseInt(taskId)) {
            tasksArr[i].name = taskName;
            tasksArr[i].type = taskType;
        }
    };
    saveTasks();
    window.alert("Task " + taskId + " Updated!");

    formEl.removeAttribute("task-data-id");
    document.querySelector("#save-task").textContent = "Add Task";

};


var createTaskEl = function(dataObj){
     // build a list item 
     var listItemEl = document.createElement("li");
     listItemEl.className = "task-item";
     
     // add a data-* is to the task element
     listItemEl.setAttribute("data-task-id", taskIdCounter);   
     listItemEl.setAttribute("draggable", "true");
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

     dataObj.id = taskIdCounter;
     tasksArr.push(dataObj);
     saveTasks();

     // add one to the task counter each time the function runs
     taskIdCounter += 1;

     console.log(dataObj);
     console.log(dataObj.status);
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

    //create a new array to hold the tasks
    var updatedArr = [];

    //loop through current tasks 
    for (var i = 0; i < tasksArr.length; i++) {
        // if tasksArr[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasksArr[i].id !== parseInt(taskId)) {
          updatedArr.push(tasksArr[i]);
        }
      }
      
      // reassign tasks array to be the same as updatedTaskArr
      tasksArr = updatedArr;

}

var taskStatusChangeHandler = function(event){
    console.log("youve ghchaaainged -man")
    console.log(event.target);
    var taskId = event.target.getAttribute("data-task-id");
    var statusValue = event.target.value.toLowerCase();
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
      } 
      else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
      } 
      else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
      }

    // update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasksArr[i].id === parseInt(taskId)) {
            tasksArr[i].status = statusValue;
        }
    }
    saveTasks();
};

var dragTaskHandler = function(event){
    var taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId);
    var getId = event.dataTransfer.getData("text/plain");


    
    
}

var dropZoneDragHandler = function(event){
    var taskListEl = event.target.closest(".task-list");
    if(taskListEl){
        event.preventDefault();
        taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
    }

    
};

var dropTaskHandler = function(event){
    var id = event.dataTransfer.getData("text/plain");
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;
    // set task status from dropZone .tasklist
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']") 
    
    if (statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex = 0;
      } 
      else if (statusType === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
      } 
      else if (statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
      }
    dropZoneEl.removeAttribute("style");
    dropZoneEl.appendChild(draggableElement);

    // loop through tasks array to find and update the updated task's status
    for (var i = 0; i < tasksArr.length; i++) {
        if (tasksArr[i].id === parseInt(id)) {
        tasksArr[i].status = statusSelectEl.value.toLowerCase();
        }
    }
    saveTasks();
    console.log(tasksArr);
};

var dragLeaveHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        taskListEl.removeAttribute("style");
    }
    //console.dir(event.target);
  }

var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
}


formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);
pageContentEl.addEventListener("dragleave", dragLeaveHandler);