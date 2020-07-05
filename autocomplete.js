class Autocomplete
{

    autocomplete(inputField, objectArray,inputFieldId) {
        inputField.addEventListener("input", function (event) {
            let dropDownParent, dropDownChild, searchVal = event.target.value;
            let { id, parentNode } = event.target
            closeAllLists();
            if (!searchVal) {
                return false;
            }
            dropDownParent = getDiv({ id: `${id}autocomplete-list`, className: `autocomplete-items` })
            parentNode.appendChild(dropDownParent);
            objectArray.forEach(object => {
                if (object.name.substr(0, searchVal.length).toUpperCase() == searchVal.toUpperCase()) {
                    dropDownChild = getDiv()
                    let strongTextNode = getStrong()
                    dropDownChild.appendChild(strongTextNode)
                    let strongText = document.createTextNode(object.name.substr(0, searchVal.length))
                    strongTextNode.appendChild(strongText)
                    dropDownChild.appendChild(document.createTextNode(object.name.substr(searchVal.length)))
                    let inputNode = getInput({ type: `hidden`, value: `${object.name}` })
                    dropDownChild.appendChild(inputNode)
                    dropDownChild.addEventListener("click", function (e) {
                        inputField.value = this.getElementsByTagName("input")[0].value;
                        document.getElementById(inputFieldId).value = `${object.id}`; // if we need to get id of selected field
                        closeAllLists();
                    });
                    dropDownParent.appendChild(dropDownChild);
                }
            })
    
        });

    
        function closeAllLists(elmnt) {
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inputField) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }
}
