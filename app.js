var globalObj = null;
function selectedList(event){
    console.log("Inside chk");
    console.log(event.target.parentNode);
    globalObj = event.target.parentNode.parentNode;
}
function deleteList(el){
    var doc = document.getElementsByClassName("row");
    console.log(doc);
    console.log(doc.length);
    console.log(el);
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
    var newRow = document.createElement("div");
    newRow.className = "row";
    newRow.appendChild(document.createElement("p"));
    newRow.innerHTML = '<div class="col-xs-4"><input type="checkbox" name="chkbox" value=""></div><div class="col-xs-4">'+newListName+'</div><div class="col-xs-2"><a href="editList.html"><span class="glyphicon glyphicon-edit" data-toggle="modal"></span></a></div><div class="col-xs-2"><span class="glyphicon glyphicon-remove" onclick="selectedList(event)" data-toggle="modal" data-target="#deleteListModal"></span></div>';
    console.log(newRow);
    document.getElementById("listGroup").appendChild(newRow);
}

function mergeList(newListName){
    addList(newListName);
}
