var globalObj = null;
var mainData = null;

if (typeof(Storage) !== "undefined") {
    console.log("Code for localStorage/sessionStorage.");
    localStorage.setItem("mainData", data);
//    localStorage.setItem("mainData", JSON.stringify(data));
    mainData = localStorage.getItem('mainData');
    var mainDataObj = JSON.parse(mainData);
    console.log("mainDataObj: ",mainDataObj);
    console.log("mainDataObj length: ",mainDataObj.length);
} else {
    console.log("Sorry! No Web Storage support..");
}

function createPage(){
    console.log("createPage");
    var newRow = document.createElement("div");
    newRow.className = "row";
    for(var i=0; i<mainDataObj.length; i++){
        console.log(mainDataObj[i]);
        newRow.innerHTML = '<div class="col-xs-4"><input type="checkbox" name="chkbox" value=""></div><div class="col-xs-4">'+mainDataObj[i].listname+'</div><div class="col-xs-2"><a href="editList.html"><span class="glyphicon glyphicon-edit" data-toggle="modal"></span></a></div><div class="col-xs-2"><span class="glyphicon glyphicon-remove" onclick="selectedItem(event)" data-toggle="modal" data-target="#deleteListModal"></span></div>';
        console.log(newRow);
        document.getElementById("listGroup").appendChild(newRow);
        newRow = document.createElement("div");
        newRow.className = "row";
    }
}
function createTaskPage(){
    console.log("createTaskPage");
    var newTaskRow = document.createElement("div");
    newTaskRow.className = "row";
    for(var i=0; i<mainDataObj.length; i++){
        for(var j=0; j<mainDataObj[i].tasks.length; j++){
            console.log(mainDataObj[i].tasks[j].task);
            newTaskRow.innerHTML = '<div class="col-xs-6" contenteditable="true">'+mainDataObj[i].tasks[j].task+'</div><div class="col-xs-3"><span class="glyphicon glyphicon-new-window" data-toggle="modal" data-target="#moveTaskModal"></span></div><div class="col-xs-3"><span class="glyphicon glyphicon-remove" onclick="selectedItem(event)" data-toggle="modal" data-target="#deleteTaskModal"></span></div>' ;
            console.log(newTaskRow);
            document.getElementById("taskGroup").appendChild(newTaskRow);
            newTaskRow = document.createElement("div");
            newTaskRow.className = "row";

        }


    }

}
function selectedItem(event){
    console.log("Inside chk");
    console.log(event.target.parentNode);
    globalObj = event.target.parentNode.parentNode;
}
function deleteItem(){
    var doc = document.getElementsByClassName("row");
    console.log(doc);
    console.log(doc.length);
//    console.log(el);
    if(globalObj) {
        globalObj.remove();
    }
}
// Pass the checkbox name to the function
function getCheckedBoxes(chkboxName) {
  var checkboxes = document.getElementsByName(chkboxName);
  var checkboxesChecked = [];
  var selectedRows = [];
  for (var i=0; i<checkboxes.length; i++) {
     if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i]);
        selectedRows.push(checkboxes[i].parentNode.parentNode)
     }
  }
  // Return the array if it is non-empty, or null
  return checkboxesChecked.length > 0 ? selectedRows : null;
}

function deleteMultipleLists(){
    var selectedRows = getCheckedBoxes("chkbox");
    console.log("selectedRows");
    console.log(selectedRows);
    if(selectedRows){
        for(var j=0; j<selectedRows.length; j++){
            selectedRows[j].remove();
        }
    }else{
        alert("Please select the list to be deleted");
    }
}

function addList(newListName){
    console.log(newListName);
    if(newListName){
        var newRow = document.createElement("div");
        newRow.className = "row";
//        newRow.appendChild(document.createElement("p"));
        newRow.innerHTML = '<div class="col-xs-4"><input type="checkbox" name="chkbox" value=""></div><div class="col-xs-4">'+newListName+'</div><div class="col-xs-2"><a href="editList.html"><span class="glyphicon glyphicon-edit" data-toggle="modal"></span></a></div><div class="col-xs-2"><span class="glyphicon glyphicon-remove" onclick="selectedItem(event)" data-toggle="modal" data-target="#deleteListModal"></span></div>';
        console.log(newRow);
        document.getElementById("listGroup").appendChild(newRow);
        dataObj.push({
            listname: newListName
        });
        data = JSON.stringify(dataObj);
        console.log(JSON.parse(data));
   }else{
       alert("You have not entered the list name!");
   }
}

function mergeList(newListName){
    console.log("Inside merge");
    var selectedRows = getCheckedBoxes("chkbox");
    console.log("selectedRows For Merging");
    console.log(selectedRows);
    if(selectedRows){
        if(!newListName){
            alert("Please enter the merge list name!");
        }
        if(selectedRows.length<2){
            alert("Please select the list to be merged with the checked list!");
        }else{
            addList(newListName);
            for(var j=0; j<selectedRows.length; j++){
            // CODE FOR MERGING THE LISTS --- MISSING
                selectedRows[j].remove();
            }
        }
    }else{
        alert("Please select the lists to be merged");
    }
}

function addTask(newTask){
    console.log(newTask);
    if(newTask){
        var newRow = document.createElement("div");
        newRow.className = "row";
        newRow.innerHTML = '<div class="col-xs-6" contenteditable="true">'+newTask+'</div><div class="col-xs-2"><span class="glyphicon glyphicon-new-window" data-toggle="modal" data-target="#moveTaskModal"></span></div><div class="col-xs-2"><span class="glyphicon glyphicon-remove" onclick="selectedItem(event)" data-toggle="modal" data-target="#deleteTaskModal"></span></div></div>';
        document.getElementById("taskGroup").appendChild(newRow);
    }else{
        alert("You have not entered the task!");    // not  required
    }
}
