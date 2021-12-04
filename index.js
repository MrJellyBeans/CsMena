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
let log = [];
bot(`،يوم سعيد
مرحبا! بكم في سي أس مينا لتأجير السيارات
كيف يمكن أن أساعدك اليوم؟`)
function output(input) {
  let product;
  let foundcar
  let otherStuff = ["2018","2019","2020"]
  let stuff = ["موقع","تاريخ","موعد"]
  // Regex remove non word/space chars
  // Trim trailing whitespce
  let text = input
  text = text
    .replace(/ايش في/g, "ماذا لديك")
    .replace(/(\?|؟|!|!|\*|في |ال|\,|،|\.)/g, "")
    .replace(/ +/g, " ")
    .replace(/(كيفك|كيف الحال)/g, "كيف الحياة")
    .replace(/(أ|إ|آ)/g, "ا")
    .replace(/(اه|يب|اها)/g, "نعم")
    .replace(/بدي/g, "اريد ان")
    .replace(/(شو|وش|مذا|ايش)/gi, "ماذا")
    .replace(/(عندكم|عندكو|لديكم|عندك)/g,"لديك")
    .replace(/(سياره|سيارة)/g, "سيارات")
    .replace(/(نتي)/g, "نت");
    let filteredLength = arrayMatch(listNames(cars), text.split(/ +/g)).length
    if(text.length < 5) text = text.replace(/(تمام|اها|اه)/g, "")
  if (compare(prompts, replies, text)) { 
    // Search for exact match in `prompts`
    product = compare(prompts, replies, text);
  } else if (text.match(/شكرا/gi)) {
    product = "العفو"
    // Renting phase
  } else if(arrayMatch(listModels(cars), text.split(/ +/g)).length >= 1){
      foundcar = cars.filter(x => x.model.includes(arrayMatch(listModels(cars), text.split(/ +/g))[0]))
      product = `هل تريد أن تستأجر السياره ${foundcar[0].name}, مديل ${foundcar[0].model}, بسعر ${foundcar[0].cost} د.أ بليوم؟`
    } else if(filteredLength >= 1){

        if (cars.filter(x => x.name.match(arrayMatch(listNames(cars), text.split(/ +/g))[0])).length == 1 ){
      foundcar = cars.filter(x => x.name.includes(arrayMatch(listNames(cars), text.split(/ +/g))[0]))
      product = `هل تريد أن تستأجر السياره ${foundcar[0].name}, مديل ${foundcar[0].model}, بسعر ${foundcar[0].cost} د.أ بليوم؟`

      } else if (arrayMatch(listModels(cars), text.split(/ +/g)).length >= 1){
       foundcar = cars.filter(x => x.model.includes(arrayMatch(listModels(cars), text.split(/ +/g))[0]))
       product = `هل تريد أن تستأجر السياره ${foundcar[0].name}, مديل ${foundcar[0].model}, بسعر ${foundcar[0].cost} د.أ بليوم؟`
       
      } else if (cars.filter(x => x.name.includes(arrayMatch(listNames(cars), text.split(/ +/g))[0])).length > 1){
        let carList = cars.filter(x => x.name.includes(arrayMatch(listNames(cars), text.split(/ +/g))[0]))
        carList = carList.map(x => `#${carList.indexOf(x)+1} ${x.name} مديل  ${x.model} سنت ${x.year}`)
        .join("\n")
        product = `:لدينا اكثر من سيارة لديها الإسم ${arrayMatch(listNames(cars), text.split(/ +/g))[0]} و هم
        ${carList}
        أرجو إرسال اسم المديل للإستفسار عن التاريخ و السعر
        `

        
      }
    } else if(cars.filter(x => x.year.includes(arrayMatch(listYears(cars), text.split(/ +/g))[0])).length == 1){
      foundcar = cars.filter(x => x.year.includes(arrayMatch(listYears(cars), text.split(/ +/g))[0]))
      product = `هل تريد أن تستأجر السياره ${foundcar[0].name}, مديل ${foundcar[0].model}, بسعر ${foundcar[0].cost} د.أ بليوم؟`
    } else if(cars.filter(x => x.year.includes(arrayMatch(listYears(cars), text.split(/ +/g))[0])).length > 1){
      let carList = cars.filter(x => x.year.includes(arrayMatch(listYears(cars), text.split(/ +/g))[0]))
      carList = carList.map(x => `#${carList.indexOf(x)+1} ${x.name} مديل  ${x.model} سنت ${x.year}`)
      .join("\n")
      product = `:لدينا اكثر من سيارة للعام ${arrayMatch(listYears(cars), text.split(/ +/g))[0]} و هم
      ${carList}
      أرجو إرسال اسم المديل للإستفسار عن التاريخ و السعر
      `
    } else if (text.match(/(اريد ان سيارات|ماذا لديك سيارات)/g)){
    product = `:حاليا السيارات المتوفره هي
    ${listCars(cars)}
    أرجو إرسال اسم المديل للإستفسار عن التاريخ و السعر
      `
  } else if (text.match(/نعم/g) && log[log.length - 1].startsWith("هل تريد أن تستأجر السياره")) {
    const logged = log[log.length - 1].replace(/(\?|؟|!|!|\*|في |ال|\,|،)/g, "").split(/ +/g)
    const carName = arrayMatch(listNames(cars), logged)[0]
    const carModel = arrayMatch(listModels(cars), logged)[0]
    product = "تم إرسال رابط للإميل الخاص بك لإتمام الدفع و معرفه المواعيد المناسبه لإستئجار السياره "+ carName +" "+carModel
    log = []
    
  } else if (arrayMatch(stuff, text.split(/ +/g)).length >= 1){
    product = "للإستفسار عن الموقع او المواعيد المتاحه أرجو زياره موقعنا الرأيسي\n :من خلال الرابط التالي"
  } else {
    // If all else fails: random alternative
    console.log(text)
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }
  // Update DOM

  log.push(product)
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
  .map(x => `    #${cars.indexOf(x)+1} ${x.name} مديل  ${x.model} سنت ${x.year}`)
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

       
