
var lList = [];
// var listen = false;



  // Add client
function addClickEvent(event){
  
  lList.push(event)
  console.log(event);
  // console.log(lList);
  
  document.querySelector(".event-num").innerHTML = lList.length
}


  // addClient event °change
chrome.storage.onChanged.addListener(function (changes) {
  console.log(changes);
  
  if(changes.code != undefined) return
  if ( changes.event != undefined && changes.event.newValue == "click") return 
  if(changes.tag != undefined && changes.tag == "cp") {
    
    console.log("cp");
    lList.push("cp")
  }
  if(changes.tag != undefined && changes.tag == "ls") {
    console.log("ls");
    lList.push("ls")
  }
  const data = JSON.parse(changes.event.newValue)
  console.log(data);
  
  switch (data.code) {
    
      case 2:
        addClickEvent(data)
        
        break;

      default:
        break;
    }
});


window.onload = () => {
  // document.querySelector(".begin").onclick = () => {

  //   console.log(
  //     lList
  //   );

  // getListEvent
  document.querySelector(".get-list-event").onclick = ()=>{

    console.log(lList);
    

  }

  const btnRecord = document.querySelector(".record");
    
  btnRecord.onclick = () => {
    if (!btnRecord.classList.contains("clicked")) {
      
      chrome.storage.local.set({ code: "begin" }, function () {
        listen = true;

        btnRecord.classList.toggle("clicked");
        btnRecord.innerHTML = "Terminar";
        console.log("recording");
      });
    } else {
     
      chrome.storage.local.set({ code: "end" }, function () {
        listen = false;
        btnRecord.classList.toggle("clicked");
        btnRecord.innerHTML = "Grabar Verificacion";
        console.log("ended");
        window.localStorage.setItem(eventList,
          JSON.stringify(lList)
        )
      });
    }
  };
  };



  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {

    console.log(tabs);
    
    // socket.emit(
    //   "ADDsession",
    //   JSON.stringify({
    //     sessionID: socket.id,
    //     tag: tabs[0].url,
    //     params: {
    //       event: [],
    //       couponIndex: 0,
    //     },
    //   })
    // );
  });
// };


// const con = document.querySelector(".con");
//   if (socket.connected) {
//     con.innerHTML = "OK";
//     con.style.color = "green";
//   } else {
//     con.innerHTML = "FAIL";
//     con.style.color = "red";
//   }

// const socket = io("http://localhost:3000");
// socket.on("connect", () => {
//   console.log(socket.connected); // true
  
//   const btnRecord = document.querySelector(".record");

//   btnRecord.onclick = (r) => {
//     if (!btnRecord.classList.contains("clicked")) {
      
//       chrome.storage.local.set({ code: "begin" }, function () {
//         listen = true;

//         btnRecord.classList.toggle("clicked");
//         btnRecord.innerHTML = "Terminar";
//         console.log("recording");
//       });
//     } else {
     
//       chrome.storage.local.set({ code: "end" }, function () {
//         listen = false;

//         btnRecord.classList.toggle("clicked");
//         btnRecord.innerHTML = "Grabar Verificacion";
//         console.log("ended");
//       });
//     }
//   };

//   chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
//     socket.emit(
//       "ADDsession",
//       JSON.stringify({
//         sessionID: socket.id,
//         tag: tabs[0].url,
//         params: {
//           event: [],
//           couponIndex: 0,
//         },
//       })
//     );
//   });
// });
