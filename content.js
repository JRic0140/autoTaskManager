
var recordingChapter = ""

var sendButtonEvent = (event)=>{
  console.log(event);
  
  var  _event = {
    "event":JSON.stringify(
      {
        "code":2,
        "element": event.target.className,
        "x": event.clientX,
        "y": event.clientY,
        
      }
    )
  }
  console.log(_event);

  if(recordingChapter == "cp"){
    _event.tag = "cp"
    chrome.storage.local.set(_event, function() {
      console.log('Data is stored and synced');
    });
  }
  recordingChapter = ""
  _event.tag = "click"
  chrome.storage.local.set(_event, function() {
    console.log('Data is stored and synced');
  });

}


chrome.storage.onChanged.addListener(function (changes,
  //  namespace
  ) {
    console.log(changes);
    
    if (changes.code != undefined ) switch (changes.code.newValue) {
      case "begin":
        console.log(changes.code.newValue);
        
        document.addEventListener('click', sendButtonEvent);
        break;
      case "end":
        console.log(changes.code.newValue);
        document.removeEventListener("click", sendButtonEvent)
    
      default:
        break;
    }
    

});

document.addEventListener("keydown",(e)=>{
  
  if (recordingChapter.length > 1)  recordingChapter = ""
  recordingChapter += e.key
  console.log(recordingChapter)


})