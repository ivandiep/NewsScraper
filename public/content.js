//as specified in the manifest.json, this script only runs
//on a google search results webpage
console.log("Chrome extension go!");

//because this scripts only runs under those conditions
//we immediately send a message to the background script we are on the desired page
// i.e. i'm trying to use the very instance of this script
let response = {
    status : "active"
}

chrome.runtime.sendMessage({status: "active"}, function(response) {
    console.log(response.status);
  });