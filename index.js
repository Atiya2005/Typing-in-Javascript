const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementsByClassName("quote-input")[0];

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

//Display random quotes
const renderNewQuote = async () => {
   //Fetch content from url
  const response = await fetch(quoteApiUrl);

  //Store responce
   let data   =   await response.json();

   //Access quote
    quote = data.content;
    console.log(data.content);

    let arr = quote.split("").map((value) => {
        return "<span class = 'quote-chars'>" + value + "</span>";
    });  

    quoteSection.innerHTML = quoteSection.innerHTML + arr.join("");  
};
    //Logic for comparing input of user with Quote
    userInput.addEventListener('input', () => {
    let quoteChars = document.querySelectorAll('.quote-chars');
    console.log(quoteChars);
    //Create an Array from recieved quote-chars
    quoteChars = Array.from(quoteChars);
    console.log(quoteChars);

    //user input characters
    let userInputChars = userInput.value.split("");

    //Loop thr each characters in quote
       quoteChars.forEach((char, index) => {
        if(char.innerText == userInputChars[index]){
            char.classList.add("success");
        }
        // if user hasnt entered anything or backspaced
        else if (userInputChars[index] == null){
            //remove class of color Green/Red
            if(char.classList.contains("success")){
                char.classList.remove("success")
            }
            else{
                char.classList.remove("fail");
            }
        }
        //If user enter wrong character
        else {
        //check add fail class RED
            if(!char.classList.contains("fail")){
                mistakes = mistakes + 1;
                char.classList.add("fail");
            }
            document.getElementById("mistakesID").innerHTML = mistakes;
        }

        let check = quoteChars.every((element) => {
            return element.classList.contains("success");
        });
        if(check){
            displayResult();
        }
    })
 
});

function updateTimer() {
    if (time == 0){
    //End test if timer reaches 0
        displayResult();
    }
    else {
        document.getElementById("timerID").innerHTML= --time + "s";
    }
}
const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer,1000);
}
//End Test
const displayResult = () => {
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    
    let timeTaken = 1;
    if(time != 0){
        timeTaken = (60 -time) / 100;
    }
        document.getElementById("speedID").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm";

        document.getElementById("accuracyID").innerText =  Math.round(
        ((userInput.value.length - mistakes)/ userInput.value.length) * 100
         )  + " %";
    
}

const startTest = () => {
timer = "";
mistakes = 0;
userInput.disabled = false;
timeReduce();
document.getElementById("start-test").style.display = "none"; 
document.getElementById("stop-test").style.display = "block";
}

window.onload = () => {
userInput.value = "";
document.getElementById("start-test").style.display = "block"; 
document.getElementById("stop-test").style.display = "none";
userInput.disabled = true;
renderNewQuote();
};