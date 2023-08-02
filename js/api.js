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

    // removing cookies.
    localStorage.clear();
    
  
    const response = await fetch("http://192.168.7.68:8080/api/getPlaceByLocation", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    console.log(data);

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

        anchor.addEventListener("click", (event) => {
            localStorage.setItem("place", JSON.stringify(data[i]));
        });
        anchor.append(img);
        figure.appendChild(anchor);
        childCard.appendChild(figure);
        card.appendChild(childCard);
        card.appendChild(cardContent);

        column.appendChild(card);
        t.appendChild(column);
    }    
}

async function getDataForPlaces() {
    const response = await fetch("http://192.168.7.68:8080/api/postPropertyFromPlaceId", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({placeId: 1})
    });

    const propertyData =await response.json();
    
    
    const data = JSON.parse(localStorage.getItem("place"));
    const title = document.getElementById("placeName");
    title.innerHTML = data.placeName;
    const acres = document.getElementById("noOfAcres");
    acres.innerHTML = data.acres + " acres";
    const sites = document.getElementById("ites");
    sites.innerHTML = data.noOfSites + " sites";


   
    const propertyContainer = document.getElementById("propertyContainer");
    
    const row = document.createElement("div");
    row.className = "col-md-12";
    row.style="padding: 25px 0;";

    const propertyWrapBox = document.createElement("div");
    propertyWrapBox.className="viewproperty-wrap-box";

    const propertyWrapBoxChild = document.createElement("div");
    propertyWrapBoxChild.className="row align-items-center";

    const col = document.createElement("div");
    col.className = "col-md-3";

    const pic_wrap = document.createElement("div");
    pic_wrap.className= "pic_wrap";

    const img = document.createElement("img");
    img.src ="images/g1.png";
    img.alt = "camp1";

    pic_wrap.appendChild(img);
    col.appendChild(pic_wrap);
    
    const colMd7 = document.createElement("div");
    colMd7.className = "col-md-7";

    const desWrap = document.createElement("div");
    desWrap.className = "des-wrap";

    const propertyName = document.createElement("h6");
    propertyName.innerHTML ="Property name: "

    const spanEle = document.createElement("span");
    spanEle.innerHTML="Baskervilles";
    
    const ptagt1 = document.createElement("p");
    ptagt1.className = "t1";
    ptagt1.innerHTML = "Property Type:";

    const ptagt2 = document.createElement("p");
    ptagt2.className = "t2";
    ptagt2.innerHTML = "Area:";

    const ptagt3 = document.createElement("p");
    ptagt3.className = "t3";
    ptagt3.innerHTML = "Description:";

    const ptagt4 = document.createElement("p");
    ptagt4.className = "t4";
    ptagt4.innerHTML = "Location:";

    const siTaxiOp = document.createElement("span");
    siTaxiOp.className = "siTaxiOp"

    propertyName.appendChild(spanEle)
    
    spanEle.innerHTML="Tiny Cottage";
    ptagt1.appendChild(spanEle);

    spanEle.innerHTML = "400 sq-ft";
    ptagt2.appendChild(spanEle);

    spanEle.innerHTML = "Entire studio";
    ptagt3.appendChild(spanEle);

    spanEle.innerHTML = "Mumbai";
    ptagt4.appendChild(spanEle);

    desWrap.appendChild(propertyName);
    desWrap.appendChild(ptagt1);
    desWrap.appendChild(ptagt2);
    desWrap.appendChild(ptagt3);
    desWrap.appendChild(ptagt4);
    colMd7.appendChild(desWrap);

    const colMd2 = document.createElement("div");
    colMd2.className = "col-md-2";

    const updateWrap = document.createElement("div");
    updateWrap.className= "update-wrap";

    const siDetials= document.createElement("div")
    siDetials.className ="siDetails";

    const siRating = document.createElement("div");
    siRating.className="siRating";

    const excelSpan = document.createElement("span");
    excelSpan.innerHTML ="Excellent";

    const button = document.createElement("button");
    button.innerHTML = "8.9"

    siRating.appendChild(excelSpan);
    siRating.appendChild(button);

    const siDetailsTexts = document.createElement("div");
    siDetailsTexts.classList = "siDetailsTexts";

    const siPrice = document.createElement("span");
    siPrice.className = "siPrice";
    siPrice.innerHTML = "$112";

    const anch = document.createElement("a");
    anch.href = "checkoutrule.html";
    anch.className="btn btn-primary btn-sm";
    anch.innerHTML="Reserve";

    siDetailsTexts.appendChild(siPrice);
    siTaxiOp.innerHTML="Includes taxes and fees";
    siDetailsTexts.appendChild(siTaxiOp);
    siDetailsTexts.appendChild(anch);

    siDetials.appendChild(siRating);
    siDetials.append(siDetailsTexts);
    updateWrap.appendChild(siDetials);
    colMd2.appendChild(updateWrap);

    propertyWrapBoxChild.appendChild(col);
    propertyWrapBoxChild.appendChild(colMd7);
    propertyWrapBoxChild.appendChild(colMd2);

    propertyWrapBox.appendChild(propertyWrapBoxChild);
    row.appendChild(propertyWrapBox);
    propertyContainer.appendChild(row)    

}