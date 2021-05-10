let imgCounter = 0;

async function populateImages() {
    // let galImgs = document.getElementById("galImgs").getElementsByClassName("img");

    // let img = document.createElement("img");
    // img.src = galImgs[imgCounter].textContent;
    // img.id = "createdImg" + imgCounter;
    // document.getElementById("galImgs").appendChild(img);
    // // console.log(imgCounter);

    // if (imgCounter > 0 && imgCounter < galImgs.length) {
    //     document.getElementById("createdImg" + imgCounter).remove();
    //     document.getElementById("createdImg0").src = galImgs[imgCounter].textContent;

    // } else if (imgCounter >= galImgs.length) {
    //     document.getElementById("createdImg" + imgCounter).remove();
    //     document.getElementById("createdImg0").src = galImgs[imgCounter].textContent;
    // }

    // imgCounter++;

    // if (imgCounter >= galImgs.length) {
    //     imgCounter = 0;
    //     document.getElementById("createdImg" + imgCounter).remove();
    // }

    let searchText = document.getElementById("searchText").value;
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

    // console.log(finalURl);

    let response = await fetch(finalURl);

    let data = await response.json();

    console.log(data);

    //Loop through the data
    for (let photo of data.photos.photo) {
        console.log(photo.title);

        //Create the images here
        let farm = photo.farm;
        let id = photo.id;
        let serverId = photo.server;
        let secret = photo.secret;

        // let imgURL = "https://farm" + farm + ".staticflickr.com/" + serverId + "/" + id + "_" + secret + "_[mstzb].jpg"
        let imgURL = "https://live.staticflickr.com/" + serverId + "/" + id + "_" + secret + ".jpg"

        let galImgs = document.getElementById("galImgs").getElementsByClassName("img");

        //test
        let img = document.createElement("img");
        img.src = imgURL;
        // img.id = "createdImg" + imgCounter;
        document.getElementById("galImgs").appendChild(img);
        // console.log(imgCounter);

        // if (imgCounter > 0 && imgCounter < galImgs.length) {
        //     document.getElementById("createdImg" + imgCounter).remove();
        //     document.getElementById("createdImg0").src = galImgs[imgCounter].textContent;

        // } else if (imgCounter >= galImgs.length) {
        //     document.getElementById("createdImg" + imgCounter).remove();
        //     document.getElementById("createdImg0").src = galImgs[imgCounter].textContent;
        // }

        // imgCounter++;

        // if (imgCounter >= galImgs.length) {
        //     imgCounter = 0;
        //     document.getElementById("createdImg" + imgCounter).remove();
        // }
    }
}




