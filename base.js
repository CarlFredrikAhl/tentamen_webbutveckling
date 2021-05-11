let imgCounter = 0;
let pressedNext = 0;

let searched = false;

let searchType = document.getElementById("searchType");
let searchText = document.getElementById("searchText");

searchType.onclick = function() {
    console.log("click search type");
    console.log(searchText.placeholder);
    console.log(searchType.value);

    if(searchType.value == "searchText") {
        searchText.placeholder = "Sök med ord, tex 'Hund'";
    
    } else {
        searchText.placeholder = "Sök med taggar separerat med ','";
    }
};


console.log(searchType);

async function populateImages() {

    let searchText = document.getElementById("searchText").value;
    let searchResults = document.getElementById("searchResults").value;

    if (searchText == "" || searchResults == "") {
        alert("Du måste fylla i alla fält");

    } else {

        if (searched == false) {

            console.log("Search text: " + searchText);
            console.log("Search results: " + searchResults);

            //Change search button to restart button
            let searchBtn = document.getElementById("searchBtn");
            searchBtn.textContent = "Tryck för att börja om sökning"
            searchBtn.onclick = function () {
                location.reload();
            };

            //Create nästa- och föregåendeknappar
            let nextBtn = document.createElement("button");
            nextBtn.textContent = "Nästa bild"
            nextBtn.style.order = "3";
            nextBtn.className += "navBtns";

            //Disable next button when we reach the end
            if (imgCounter >= Number(searchResults) - Number(1)) {
                nextBtn.disabled = true;
            }

            //Next button onclick
            nextBtn.onclick = function () {

                imgCounter++;

                if (imgCounter > 0 && imgCounter <= searchResults) {
                    console.log(imgCounter);
                    img.src = imgArray[imgCounter];
                    curImgText.textContent = Number(imgCounter) + Number(1) + "/" + searchResults;
                    // imgCounter++;
                }

                //The last image
                if (imgCounter > Number(searchResults) - Number(1)) {
                    imgCounter = Number(searchResults) - Number(1);
                    console.log(imgCounter);
                    img.src = imgArray[imgCounter];
                    curImgText.textContent = Number(imgCounter) + Number(1) + "/" + searchResults;
                    // imgCounter++;
                }

                //Disable next button when we reach the end
                if (imgCounter >= Number(searchResults) - Number(1)) {
                    nextBtn.disabled = true;
                }

                //Reenable privious button
                if(imgCounter > 0) {
                    previousBtn.disabled = false;
                }
            };

            let previousBtn = document.createElement("button");
            previousBtn.textContent = "Föregående bild"
            previousBtn.style.order = "1";
            previousBtn.className += "navBtns";

            //Disable previous button
            if (imgCounter == 0) {
                previousBtn.disabled = true;
            }

            //Previous button onclick
            previousBtn.onclick = function () {

                if (imgCounter > 1 && imgCounter <= searchResults) {
                    imgCounter--;
                    console.log(imgCounter);
                    img.src = imgArray[imgCounter];
                    curImgText.textContent = Number(imgCounter) + Number(1) + "/" + searchResults;
                }

                if (imgCounter == 1) {
                    imgCounter--;
                    console.log(imgCounter);
                    img.src = imgArray[imgCounter];
                    curImgText.textContent = Number(imgCounter) + Number(1) + "/" + searchResults;
                }

                //Reenable next button when the end isn't reached anymore
                if (imgCounter != Number(searchResults) - Number(1)) {
                    nextBtn.disabled = false;
                }

                //Disable previous button
                if (imgCounter == 0) {
                    previousBtn.disabled = true;
                }
            };

            //Create p that will show which image your on
            let curImgText = document.createElement("p");
            curImgText.textContent = Number(imgCounter) + Number(1) + "/" + searchResults;
            curImgText.style.order = "2";
            document.getElementById("previousNextSection").appendChild(curImgText);

            document.getElementById("previousNextSection").appendChild(previousBtn);
            document.getElementById("previousNextSection").appendChild(nextBtn);

            searched = true;
        }

        let perPage = searchResults;

        console.log(searchText)

        let baseURL = "https://api.flickr.com/services/rest";

        let key = "647df3a17289ea959496802874c9915b";
        // let secret = "6909062be24ee8dd";

        //Starting as the base query and then it will be concatinated
        //to the final query
        let query = "?method=flickr.photos.search&api_key=" + key;
        
        if(searchType.value == "searchText") {
            query += "&text=" + searchText; //What we search for
            query += "&per_page=" + perPage;
            query += "&format=json" //The result will be in json
            query += "&nojsoncallback=1" //Needed to know that it's json
        
        } else {
            console.log("Searched with tags");
            query += "&tags=" + searchText; //What we search for
            query += "&per_page=" + perPage;
            query += "&format=json" //The result will be in json
            query += "&nojsoncallback=1" //Needed to know that it's json
        }

        let finalURl = baseURL + query;

        let response = await fetch(finalURl);

        let data = await response.json();

        console.log(data);

        let imgArray = [];

        //Loop through the data
        for (let photo of data.photos.photo) {
            console.log(photo.title);

            //Create the images here
            let farm = photo.farm;
            let id = photo.id;
            let serverId = photo.server;
            let secret = photo.secret;

            let imgURL = "https://live.staticflickr.com/" + serverId + "/" + id + "_" + secret + ".jpg"

            imgArray.push(imgURL);
        }

        let galImgs = document.getElementById("galImgs").getElementsByClassName("img");

        let img = document.createElement("img");
        console.log(imgCounter);
        img.src = imgArray[imgCounter];
        img.id = "createdImg" + imgCounter;
        // img.onmouseover = function () {
        //     resize(img);
        // };
        // img.onmouseout = function () {
        //     normalSize(img);
        // };
        document.getElementById("galImgs").appendChild(img);
        // console.log(imgCounter);

        if (imgCounter > 0 && imgCounter < imgArray.length) {
            document.getElementById("createdImg" + imgCounter).remove();
            document.getElementById("createdImg0").src = imgArray[imgCounter];

        }
        // else if (imgCounter >= galImgs.length) {
        //     document.getElementById("createdImg" + imgCounter).remove();
        //     document.getElementById("createdImg0").src = imgArray[imgCounter];
        // }

        if (imgCounter >= imgArray.length) {
            imgCounter = 0;
            document.getElementById("createdImg" + imgCounter).remove();
        }
    }
}

// function resize(obj) {
//     // obj.style.height = "800px";
//     var currWidth = obj.clientWidth;
//     obj.style.width = (currWidth + 200) + "px";
// }

// function normalSize(obj) {
//     // obj.style.height = "600px";
//     var currWidth = obj.clientWidth;
//     obj.style.width = (currWidth - 200) + "px";
// }




