document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });
});
bot(`،يوم سعيد
مرحبا! بكم في سي أس مينا لتأجير السيارات
كيف يمكن أن أساعدك اليوم؟`)
function output(input) {
  let product;

  // Regex remove non word/space chars
  // Trim trailing whitespce
  // Remove digits - not sure if this is best
  // But solves problem of entering something like 'hi1'

  let text = input
  text = text
    .replace(/(\?|؟|!|!|\*|في |ال)/g, "")
    .replace(/ +/g, " ")
    .replace(/(كيفك|كيف الحال)/g, "كيف الحياة")
    .replace(/(أ|إ|آ)/g, "ا")
    .replace(/بدي/g, "اريد ان")
    .replace(/(شو|وش|مذا|ايش)/gi, "ماذا")
    .replace(/(عندكم|عندكو|لديكم|عندك)/g,"لديك")
    .replace(/(نتي)/g, "نت");
    console.log(text)
  if (compare(prompts, replies, text)) { 
    // Search for exact match in `prompts`
    product = compare(prompts, replies, text);
  } else if (text.match(/شكرا/gi)) {
    product = "العفو"
  } else if (text.match(/اريد ان استاجر/gi)) {
    let foundcar
    let filteredLength = arrayMatch(listNames(cars), text.split(/ +/g)).length
     if(filteredLength >= 1){


        if (cars.filter(x => x.name.includes(arrayMatch(listNames(cars), text.split(/ +/g))[0])).length == 1 ){
      foundcar = cars.filter(x => x.name.includes(arrayMatch(listNames(cars), text.split(/ +/g))[0]))
      product = `wewهل تريد أن تستأجر السياره ${foundcar[0].name}, مديل ${foundcar[0].model}, بسعر ${foundcar[0].cost} د.أ بليوم؟`

      } else if (arrayMatch(listModels(cars), text.split(/ +/g)).length >= 1){
       foundcar = cars.filter(x => x.name.includes(arrayMatch(listNames(cars), text.split(/ +/g))[0]))
       product = `هل تريد أن تستأجر السياره ${foundcar[0].name}, مديل ${foundcar[0].model}, بسعر ${foundcar[0].cost} د.أ بليوم؟`

      } else if (cars.filter(x => x.name.includes(arrayMatch(listNames(cars), text.split(/ +/g))[0])).length > 1){
        let carList = cars.filter(x => x.name.includes(arrayMatch(listNames(cars), text.split(/ +/g))[0]))
        console.log(carList)
        carList = carList.map(x => `    #${carList.indexOf(x)+1} ${x.name} مديل  ${x.model} سنت ${x.year}`)
        .join("\n")
        product = `:لدينا اكثر من سيارة لديها الإسم ${arrayMatch(listNames(cars), text.split(/ +/g))[0]} و هم
        ${carList}`
      }


    } 
  } else if (text.match(/ماذا لديك سيارات/g)){
    product = listCars(cars) 
  } else if (arrayMatch(listNames(cars), text.split(/ +/g)).length >= 1){
product = "console"
  } else {
    // If all else fails: random alternative
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }
  // Update DOM
  addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        // Stop inner loop when input value matches prompts
        break;
      }
    }
    if (replyFound) {
      // Stop outer loop when reply is found instead of interating through the entire array
      break;
    }
  }
  return reply;
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  // Keep messages at most recent
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  // Fake delay to seem "real"
  setTimeout(() => {
    botText.innerText = `${product}`;
  }, 1500
  )

}
function user(input) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
}
function bot(product) {
  const messagesContainer = document.getElementById("messages");
  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  setTimeout(() => {
    botText.innerText = `${product}`;
  }, 750
  )

}

function listCars(cars){
  let list = cars
  .map(row => `${row.name} مديل  ${row.model} سنت ${row.year}`)
  .join("\n")
  return list
}
function listNames(cars){
  let list = cars
  .map(row => row.name)
  return list
}
function listModels(cars){
  let list = cars
  .map(row => row.model)
  return list
}
function listYears(cars){
  let list = cars
  .map(row => row.year)
  return list
}
function resort(cars){
  let list = cars
  .map(row => Object.values(row))
  return list
}
function arrayMatch(arr1, arr2) {
  var arr = [];
  for(var i=0 ; i<arr1.length ; ++i) {
    for(var j=0 ; j<arr2.length ; ++j) {
      if(arr1[i] == arr2[j]) { 
        arr.push(arr1[i]);
      }
    }
  }
   
  return arr;  
}
