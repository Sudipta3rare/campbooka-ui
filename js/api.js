async function getDataFromBackend() {
    const response = await fetch("http://192.168.7.68:8080/api/searchLocation/USA");
    
 
    return response.json();
}

async function putDataInDropdown() {
    const data = await getDataFromBackend();
    var locationIdList = []
     locationIdList.push(data[0].id);
     locationIdList.push(data[1].id);
     locationIdList.push(data[2].id);
     console.log(locationIdList);
     var selecetedLocationId;
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
       selecetedLocationId=1
        while(dropdown.childNodes.length > 0)
            dropdown.removeChild(dropdown.firstChild);
    });

    item2.addEventListener("click", event => {
        document.getElementById("destinationSearchBox").value = event.target.innerHTML;
        selecetedLocationId=2
        while(dropdown.childNodes.length > 0)
            dropdown.removeChild(dropdown.firstChild);
    });

    item3.addEventListener("click", event => {
        document.getElementById("destinationSearchBox").value = event.target.innerHTML;
        selecetedLocationId =3
        while(dropdown.childNodes.length > 0)
            dropdown.removeChild(dropdown.firstChild);
    });

    const submitBtn = document.getElementById("submit_btn");
    submitBtn.addEventListener("click", (event) => {
        localStorage.setItem("locationId", selecetedLocationId);
        localStorage.setItem("locationName", document.getElementById("destinationSearchBox").value);
        localStorage.setItem("dateRange", document.getElementById("calender").value);
        localStorage.setItem("noOfAdult", document.getElementById("guests-count-adults").innerHTML);
        localStorage.setItem("noOfChildern", document.getElementById("guests-count-children").innerHTML);
    })
}


async function putDataInPlacesCards() {

    const requestBody = {
        "placeId" : localStorage.getItem("locationId"),
        "fromDate" : "01-08-2023",
        "toDate" : "03-08-2023",
        "noOfAdults" : "3",
        "noOfChildren" : "1"
    }
  
    const response = await fetch("http://192.168.7.68:8080/api/getPlaceByLocation", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    console.log(data);

    // const card = document.createElement("div");
    // card.className = "card border-dlt";

    // const childCard = document.createElement("div");
    // childCard.className = "card-image";

    // const figure = document.createElement("figure");
    // figure.className = "image is-4by3";

    // const anchor = document.createElement("a");
    // anchor.href = "camperbook.html";

    // const img = document.createElement("img");
    // img.src = "images/place1.png";
    // img.alt = "";


    // const cardContent = document.createElement("div");
    // cardContent.className="card-content";
    // const contents = document.createElement("div");
    // contents.className="contents";
    // const smalltext = document.createElement("small");
    // smalltext.innerHTML = "11:09 PM - 1 Jan 2016";
    
    // const title = document.createElement("h4");
    // title.innerHTML = data[0].placeName;

    // contents.appendChild(title);
    // contents.appendChild(document.createTextNode(data[0].descrip));
    // contents.appendChild(document.createElement("br"));
    // contents.appendChild(smalltext);
    // cardContent.appendChild(contents);

    // anchor.append(img);
    // figure.appendChild(anchor);
    // childCard.appendChild(figure);
    // card.appendChild(childCard);
    // card.appendChild(cardContent);

    const t = document.getElementById("columnContainer");
    
    for(let i = 0; i < data.length; i++) {

        let column = document.createElement("div");
        column.className="column";

        let card = document.createElement("div");
        card.className = "card border-dlt";

        let childCard = document.createElement("div");
        childCard.className = "card-image";

        let figure = document.createElement("figure");
        figure.className = "image is-4by3";

        let anchor = document.createElement("a");
        anchor.href = "camperbook.html";

        let img = document.createElement("img");
        img.src = "images/place1.png";
        img.alt = "";        

        let cardContent = document.createElement("div");
        cardContent.className="card-content";
        let contents = document.createElement("div");
        contents.className="contents";
        let smalltext = document.createElement("small");
        smalltext.innerHTML = "11:09 PM - 1 Jan 2016";

        let title = document.createElement("h4");
        title.innerHTML = data[i].placeName;

        contents.appendChild(title);
        contents.appendChild(document.createTextNode(data[i].descrip));
        contents.appendChild(document.createElement("br"));
        contents.appendChild(smalltext);
        cardContent.appendChild(contents);

        anchor.append(img);
        figure.appendChild(anchor);
        childCard.appendChild(figure);
        card.appendChild(childCard);
        card.appendChild(cardContent);

        column.appendChild(card);
        t.appendChild(column);


    }
    
}

