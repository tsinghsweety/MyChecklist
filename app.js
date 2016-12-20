var globalObj = null;
var mainData = null;
var selectedObj = null;
var selectedIndex = null;

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
        newRow.innerHTML = '<div class="col-xs-4"><input type="checkbox" name="chkbox" value=""></div><div class="col-xs-4">'+mainDataObj[i].listname+'</div><div class="col-xs-2"><a href="editList.html"><span class="glyphicon glyphicon-edit" onclick="selectedItem(event)" data-toggle="modal"></span></a></div><div class="col-xs-2"><span class="glyphicon glyphicon-remove" onclick="selectedItem(event)" data-toggle="modal" data-target="#deleteListModal"></span></div>';
        console.log(newRow);
        document.getElementById("listGroup").appendChild(newRow);
        newRow = document.createElement("div");
        newRow.className = "row";
    }
}
function createTaskPage(){
    console.log("createTaskPage");
    selectedIndex = localStorage.getItem("selectedIndex");
    console.log("selectedIndex:",selectedIndex);
    var newTaskRow = document.createElement("div");
    newTaskRow.className = "row";
//    for(var i=0; i<mainDataObj.length; i++){
        for(var j=0; j<mainDataObj[selectedIndex].tasks.length; j++){
            console.log(mainDataObj[selectedIndex].tasks[j].task);
            newTaskRow.innerHTML = '<div class="col-xs-6" contenteditable="true">'+mainDataObj[selectedIndex].tasks[j].task+'</div><div class="col-xs-3"><span class="glyphicon glyphicon-new-window" data-toggle="modal" data-target="#moveTaskModal"></span></div><div class="col-xs-3"><span class="glyphicon glyphicon-remove" onclick="selectedItem(event)" data-toggle="modal" data-target="#deleteTaskModal"></span></div>' ;
            console.log(newTaskRow);
            document.getElementById("taskGroup").appendChild(newTaskRow);
            newTaskRow = document.createElement("div");
            newTaskRow.className = "row";

        }


//    }

}

function searchParent(el, type, value){
    console.log("el:",el);
    console.log("type:",type);
    console.log("value:",value);
    var child = el;
    while(child.className !== value){
        child = child.parentNode;
    }

    return child;
}
function selectedItem(event){
    console.log("Inside chk");
    selectedObj = event.target;
    console.log("selectedObj: ",selectedObj);
    var count=0;
    while(selectedObj.className !== "row"){
        selectedObj = selectedObj.parentNode;
        count++;
    }
    console.log("Final count: ",count)
    console.log("Final selectedObj: ",selectedObj)

    var mainArr = document.getElementsByClassName("row");

//    globalObj = event.target.parentNode.parentNode;
    selectedIndex = getIndex(mainArr,selectedObj);

//    localStorage.setItem("globalObj",selectedObj);
//    console.log("Local:globalObj:  ",localStorage.getItem("globalObj"));
//    globalObj = localStorage.getItem("globalObj");
    localStorage.setItem("selectedIndex",selectedIndex);
    selectedIndex = localStorage.getItem("selectedIndex");
    console.log("selectedIndex:",selectedIndex);
}
function getIndex(nodeList, node){
    for(var i=0;i<nodeList.length;i++){
        if(node === nodeList[i]){
            return i;
        }
    }
}
function deleteItem(){
    var doc = document.getElementsByClassName("row");
    console.log(doc);
    console.log(doc.length);
    if(selectedObj) {
        selectedObj.remove();
        console.log("mainDataObj[selectedIndex]:",mainDataObj[selectedIndex]);
        console.log("mainDataObj:",mainDataObj);
        console.log(delete mainDataObj[selectedIndex]);
        console.log("mainDataObj after delete: ",mainDataObj);
//        clean(mainDataObj);
        data = JSON.stringify(mainDataObj);
//        console.log("data",data);
        localStorage.setItem("mainData",data);
        localStorage.setItem("data",data);
        data = cleanArray(data);
        console.log(localStorage.getItem("mainData"));
        console.log(localStorage.getItem("data"));
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
        mainDataObj.push({
            listname: newListName
        });
        data = JSON.stringify(mainDataObj);
        localStorage.setItem("mainData",data);
        console.log(data);
        console.log(localStorage.getItem("mainData"));
//        console.log(JSON.parse(data));
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

function cleanArray(actual) {
    console.log("actual:",actual);
    console.log("actual length:",actual.length);
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

