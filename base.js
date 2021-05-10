let imgCounter = 0;
let pressedNext = 0;

let searched = false;

async function populateImages() {

    let searchText = document.getElementById("searchText").value;

    if (searchText == "") {
        alert("Du måste söka på något först");

    } else {

        if (searched == false) {

            //Create nästa- och föregåendeknappar
            let nextBtn = document.createElement("button");
            nextBtn.textContent = "Nästa bild"
            nextBtn.onclick = function () {

                pressedNext++;

                // document.getElementById("searchBtn").removeAttribute("onclick");

                let img = document.createElement("img");
                img.src = imgArray[imgCounter];
                img.id = "createdImg" + imgCounter;
                document.getElementById("galImgs").appendChild(img);
                // console.log(imgCounter);

                if (imgCounter > 0 && (imgCounter - 1 < pressedNext) && imgCounter < imgArray.length) {
                    document.getElementById("createdImg" + imgCounter).remove();
                    document.getElementById("createdImg0").src = imgArray[imgCounter];

                } else if (imgCounter >= galImgs.length) {
                    document.getElementById("createdImg" + imgCounter).remove();
                    document.getElementById("createdImg0").src = imgArray[imgCounter];
                }

                imgCounter++;

                if (imgCounter >= imgArray.length) {
                    imgCounter = 0;
                    pressedNext = 1;
                    document.getElementById("createdImg" + imgCounter).remove();
                }
            };

            let previousBtn = document.createElement("button");
            previousBtn.textContent = "Föregående bild"
            previousBtn.onclick = function () {

                // document.getElementById("searchBtn").removeAttribute("onclick");

                if(pressedNext > 0 && pressedNext < 6 && imgCounter > 0) {

                    imgCounter--;
                console.log("Img counter: " + imgCounter);
                let img = document.createElement("img");
                img.src = imgArray[imgCounter];
                img.id = "createdImg" + imgCounter;
                document.getElementById("galImgs").appendChild(img);
                }
                // console.log(imgCounter);

                if (imgCounter > 0 && imgCounter < imgArray.length) {
                    document.getElementById("createdImg" + imgCounter).remove();
                    document.getElementById("createdImg0").src = imgArray[imgCounter - 1];

                } else if (imgCounter >= galImgs.length) {
                    document.getElementById("createdImg" + imgCounter).remove();
                    document.getElementById("createdImg0").src = imgArray[imgCounter - 1];
                }

                
            };

            document.getElementById("galImgs").appendChild(previousBtn);
            document.getElementById("galImgs").appendChild(nextBtn);

            searched = true;
        }

        let perPage = 6;

        console.log(searchText)

        let baseURL = "https://api.flickr.com/services/rest";

        let key = "647df3a17289ea959496802874c9915b";
        // let secret = "6909062be24ee8dd";

        //Starting as the base query and then it will be concatinated
        //to the final query
        let query = "?method=flickr.photos.search&api_key=" + key;
        query += "&text=" + searchText; //What we search for
        query += "&per_page=" + perPage;
        query += "&format=json" //The result will be in json
        query += "&nojsoncallback=1" //Needed to know that it's json

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
        img.src = imgArray[imgCounter];
        img.id = "createdImg" + imgCounter;
        document.getElementById("galImgs").appendChild(img);
        // console.log(imgCounter);

        if (imgCounter > 0 && imgCounter < imgArray.length) {
            document.getElementById("createdImg" + imgCounter).remove();
            document.getElementById("createdImg0").src = imgArray[imgCounter];

        } else if (imgCounter >= galImgs.length) {
            document.getElementById("createdImg" + imgCounter).remove();
            document.getElementById("createdImg0").src = imgArray[imgCounter];
        }

        imgCounter++;

        if (imgCounter >= imgArray.length) {
            imgCounter = 0;
            document.getElementById("createdImg" + imgCounter).remove();
        }
    }
}




