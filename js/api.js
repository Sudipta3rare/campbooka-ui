async function getDataFromBackend() {
    const response = await fetch("http://192.168.7.68:8080/api/searchLocation/UK");
    return response.json();
    
}

async function putDataInDropdown() {
    const data = await getDataFromBackend();

    const item1 = document.createElement("a");
    item1.innerHTML = data[0].locationName + "," + data[0].countryName;

    const item2 = document.createElement("a");
    item2.innerHTML = data[1].locationName + "," + data[1].countryName;

    const item3 = document.createElement("a");
    item3.innerHTML = data[2].locationName + "," + data[2].countryName;


    const dropdown = document.getElementById("searchDropdown");

    console.log(dropdown.childNodes);

    while (dropdown.childNodes.length > 0 ) {
        console.log("Removed last elements...");
        dropdown.removeChild(dropdown.childNodes[0]);
    }
    
    if(dropdown.children.length == 0 || dropdown.children[0].value.length != 0) {
        dropdown.appendChild(item1);
        dropdown.appendChild(item2);
        dropdown.appendChild(item3);
    }

    item1.addEventListener("click", event => {
        document.getElementById("destinationSearchBox").value = event.target.innerHTML;
        while(dropdown.childNodes.length > 0)
            dropdown.removeChild(dropdown.firstChild);
    });

    item2.addEventListener("click", event => {
        document.getElementById("destinationSearchBox").value = event.target.innerHTML;
        while(dropdown.childNodes.length > 0)
            dropdown.removeChild(dropdown.firstChild);
    });

    item3.addEventListener("click", event => {
        document.getElementById("destinationSearchBox").value = event.target.innerHTML;
        while(dropdown.childNodes.length > 0)
            dropdown.removeChild(dropdown.firstChild);
    });

    const submitBtn = document.getElementById("submit_btn");
    submitBtn.addEventListener("click", (event) => {
        localStorage.setItem("locationName", document.getElementById("destinationSearchBox").value);
        localStorage.setItem("dateRange", document.getElementById("calender").value);
        localStorage.setItem("noOfAdult", document.getElementById("guests-count-adults").innerHTML);
        localStorage.setItem("noOfChildern", document.getElementById("guests-count-children").innerHTML);
    })
}


async function putDataInPlacesCards() {

    const response = await fetch("http://192.168.7.68:8080/api/getPlaceByLocation");
    const data = await response.json();

    const card = document.createElement("div");
    card.appendChild(document.createElement("div"));
    
}

