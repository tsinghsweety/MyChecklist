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
//    newRow=newRow.add("row");
    newRow.appendChild(document.createElement("p"));
    console.log(newRow);
}
