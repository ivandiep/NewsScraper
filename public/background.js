console.log("Background script is active");
var content_url;
var url_keys;

chrome.runtime.onMessage.addListener(getContentURL);
//chrome.runtime.onMessage.addListener(requestNewsJson);

//when the data is ready I need to send a message with key_data to news.js
//the news.js should recieve data, run it, and send a json file to background.js
/*function requestNewsJson(request, sender, sendResponse){

    //send the url_keys to the news.js file through the message object
    let msg = {txt: url_keys}
    //chrome.tabs.sendMessage(tab.id, msg)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg, function(response) {
          console.log(response.farewell);
        });
    });
}
*/

function parseURL(){
    //parse through the string to get key elements
    search_term = "?q";
    indexOfFirst = content_url.indexOf(search_term);
    search_term = "&rlz"
    indexOfLast = content_url.indexOf(search_term);

    var i;
    var key_terms = "";
    
    for (i = indexOfFirst+3; i <indexOfLast; i++) {
        if(content_url[i] != "+"){
            key_terms += content_url[i];
        }else{
            key_terms += " ";
        }
    }

    url_keys = key_terms;
    console.log("The Key Terms are: " + key_terms);
}

function getContentURL (request, sender, sendResponse) {
    //shows in background debugger
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

    content_url = sender.tab.url;
    console.log("content_url is a: " + typeof(content_url))
    
    parseURL();
    //shows in online console debugger
    if (request.status == "active")
      sendResponse({status: "message confirmed"});
  }


let search_key= ""
if (url_keys != null) {
    search_key = url_keys;
}

const fs = require('fs');
const NewsAPI = require('newsapi');

// registered an account in order to create api key
const headers = {'Authorization': '2cda21659a0c4f6e8086b9f874856c1a'}

// create the news_api object 
const news_api = new NewsAPI(headers.Authorization);

// need to decide on what sources we will reference,
// then i need to find their respective source codes for the API
const right_sources = "fox-news";
const moderate_sources = "bloomberg,cbs-news,the-wall-street-journal,the-washington-post,business-insider,the-hill,associated-press";
const left_sources = "cnn,nbc-news,engadget,google-news,the-verge";

// fetching articles with the API -- will gather most popular news articles related to
// stored into promises
let right_data = news_api.v2.everything({
    q: search_key,
    qintitle: search_key,
    language: "en",
    sources: right_sources,
    domains: "dailymail.co.uk,nypost.com,thefederalist.com",
    sort_by: "relevancy"
});

const moderate_data = news_api.v2.everything({
    q: search_key,
    qintitle: search_key,
    language: "en",
    sources: moderate_sources,
    domains: "apnews.com,bbc.com,forbes.com,wsj.com,usatoday.com",
    sort_by: "relevancy"
});
const left_data = news_api.v2.everything({
    q: search_key,
    qintitle: search_key,
    language: "en",
    sources: left_sources,
    domains: "vox.com",
    sort_by: "relevancy"
});

// Function to check news data and store relevant articles into json file
async function noPromises() {
    let right = await right_data;
    let left = await left_data;
    let moderate = await moderate_data;

    let top_right_articles = "";
    let top_left_articles = "";
    let top_moderate_articles = "";

    // place top 3 most popular article from each perspective in list
    if (right.status == "ok" && left.status == "ok" && moderate.status == "ok") {
        top_right_articles = right.articles.slice(0,10);
        top_left_articles = left.articles.slice(0,10);
        top_moderate_articles = moderate.articles.slice(0,10);
    }

    top_articles = {"right": top_right_articles,
                    "moderate": top_moderate_articles,
                    "left": top_left_articles};

    let data = JSON.stringify(top_articles);
    fs.writeFileSync('/src/links.json', data);
}

noPromises();
