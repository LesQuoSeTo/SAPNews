// variables
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const technologyBtn = document.getElementById("technology");
const sapBtn = document.getElementById("sap");
const searchBtn = document.getElementById("searchBtn");
const inputElement = document.getElementById('country');

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");



// Array
var newsDataArr = [];
let country = "us";

// apis 
const API_KEY = "0a019f35aa2842f1aefc29b7466b1db2";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?";
const SAP_NEWS = 'https://newsapi.org/v2/everything?q=SAP&';
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload = function() {
    newsType.innerHTML="<h4>Headlines</h4>";
    fetchHeadlines(country, API_KEY);
};

inputElement.addEventListener("change", () => {
    country = inputElement.value;
    if (newsType.innerHTML=="<h4>Headlines</h4>") {
        fetchHeadlines(country, API_KEY);
    }
    if (newsType.innerHTML=="<h4>General News</h4>") {
        fetchGeneralNews(country, API_KEY);
    }
    if (newsType.innerHTML=="<h4>Business News</h4>") {
        fetchBusinessNews(country, API_KEY);
    }
    if (newsType.innerHTML=="<h4>Technology News</h4>") {
        fetchTechnologyNews(country, API_KEY);
    }
    if (newsType.innerHTML=="<h4>SAP News</h4>") {
        fetchSAPNews(API_KEY);
    }
    if (newsType.innerHTML=="<h4>Search</h4>") {
        fetchQueryNews(country, API_KEY);
    }
})

generalBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>General News</h4>";
    fetchGeneralNews(country, API_KEY);
});

businessBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Business News</h4>";
    fetchBusinessNews(country, API_KEY);
});

technologyBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Technology News</h4>";
    fetchTechnologyNews(country, API_KEY);
});

sapBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>SAP News</h4>";
    fetchSAPNews(API_KEY);
});

searchBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Search : "+newsQuery.value+"</h4>";
    fetchQueryNews(country, API_KEY);
});

const fetchHeadlines = async (country, apiKey) => {
    console.log(HEADLINES_NEWS+new URLSearchParams({
        country,
        apiKey,
    }))
    const response = await fetch(HEADLINES_NEWS+new URLSearchParams({
        country,
        apiKey,
    }));
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchGeneralNews = async (country, apiKey) => {
    console.log(GENERAL_NEWS+new URLSearchParams({
        country,
        category: "general",
        apiKey,
    }))
    const response = await fetch(GENERAL_NEWS+new URLSearchParams({
        country,
        category: "general",
        apiKey,
    }));
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchBusinessNews = async (country, apiKey) => {
    console.log(BUSINESS_NEWS+new URLSearchParams({
        country,
        category: "business",
        apiKey,
    }))
    const response = await fetch(BUSINESS_NEWS+new URLSearchParams({
        country,
        category: "business",
        apiKey,
    }));
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchTechnologyNews = async (country, apiKey) => {
    console.log(TECHNOLOGY_NEWS+new URLSearchParams({
        country,
        category: "technology",
        apiKey,
    }))
    const response = await fetch(TECHNOLOGY_NEWS+new URLSearchParams({
        country,
        category: "technology",
        apiKey,
    }));
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}


const fetchSAPNews = async (apiKey) => {
    console.log(SAP_NEWS+new URLSearchParams({
        apiKey,
    }))
    const response = await fetch(SAP_NEWS+new URLSearchParams({
        apiKey,
    }));
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}




const fetchQueryNews = async () => {

    if(newsQuery.value == null)
        return;

    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //error handle
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

function displayNews() {

    newsdetails.innerHTML = "";

    // if(newsDataArr.length == 0) {
    //     newsdetails.innerHTML = "<h5>No data found.</h5>"
    //     return;
    // }

    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");
        
        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height","matchparent");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');
        
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });

}

