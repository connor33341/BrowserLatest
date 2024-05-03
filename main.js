console.log("MainJS loaded")
function Main(){
    console.log("MainJS Init")
    const MainButton = document.getElementById("mainbutton")
    const Input = document.getElementById("input")
    const IFrame = document.getElementById("iframe")
    const Tag = document.getElementById("tag")
    const Progress = document.getElementById("progress")
    const ProgressInner = document.getElementById("progress-inner")
    const Alert = document.getElementById("alert")
    const AlertError = document.getElementById("alert-error")
    const AlertMessage = document.getElementById("alert-message")
    const AlertClose = document.getElementById("alert-close")

    // Cross Orgin Refrence Sharing limits our access to external system via GET and POST thus an actual server has to do our HTTP request for us
    const CORSProxy = "https://cors-bypasser.glitch.me/bypass/"
    const AltAllowed = true
    let SafeHandleData = []
    const SafeHandleDataLS = "SHD"
    MainButton.addEventListener("click", function(){
        console.log("MainJS Search Begin")
        Tag.hidden = true
        IFrame.hidden = true
        IFrame.style.opacity = 0
        Progress.hidden = false
        var InputData = Input.value
        let HandleNeeded = true
        ProgressBarHandle(25)
        for (let index in SafeHandleData){
            var Object = SafeHandleData[index]
            var ObjectInput = Object[0]
            var ObjectHandle = Object[1]
            if (ObjectInput == InputData){
                HandleNeeded = false
            }
        }
        if (HandleNeeded){
            console.log("MainJS Handle Needed")
            var HandleData = SafeHandle(InputData)
            SafeHandleData.push([InputData,HandleData])
        } else {
            console.log("MainJS Handled not Needed")
        }
        var SaveData = JSON.stringify(SafeHandleData)
        localStorage.setItem(SafeHandleDataLS,SaveData)
        ProgressBarHandle(50)
        console.log("MainJS Handle Completed")
        console.log("MainJS Searching IADB")
        var ResponseData = AvalibleHandle(InputData)
        if (ResponseData){
            var Response = ResponseData["archived_snapshots"]["closest"]
            var Avalible = Response["avalible"]
            var Url = Response["url"]
            ProgressBarHandle(75)
            if (Avalible){
                console.log("MainJS using dynamic display")
                IFrame.src = CORSProxy+Url
            } else {
                Message("Requested URL is not found; using normal",true)
                AltDisplay()
            }
        } else {
            Message("Failed to return URL Data; using normal", true)
            AltDisplay()
        }
        ProgressBarHandle(100)
        Progress.hidden = true
        IFrame.hidden = false
        IFrame.style.opacity = 1
    })
    function AltDisplay(){
        if (AltAllowed){
            Tag.hidden = false
            Tag.innerText = "Using Normal"
            IFrame.src = Input.value
            if (IFrameLoaded() != true){
                Tag.innerText = "Using Alt"
                IFrame.src = "about:blank"
                console.log("MainJS Using alt")
                try{
                    LoadWebpage(InputData)
                } catch {
                    Message("Failed to display content; the following backups have failed: Dynamic content; Static content; Embed content",true)
                    Tag.innerText = "Failed"
                }
            } else {
                console.log("MainJS Using normal")
            }
        } else {
            Message("AltDisplay is not allowed", false)
        }
    }
    AlertClose.addEventListener("click",function(){
        Alert.hidden = true
        AlertError.hidden = true
    })
    function IFrameLoaded(){
        try{
            var IFrameDoc = IFrame.contentDocument || IFrame.contentWindow.document
            if (IFrameDoc.readyState == "complete"){
                return true
            } else {
                return false
            }
        } catch {
            IFrame.addEventListener("load",function(){
                return true
            })
            
        }
    }
    function LoadWebpage(Url){
        var XMLHTTP = new XMLHttpRequest();
        XMLHTTP.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            IFrame.innerHTML = "#document (about:blank) \n"+this.responseText

        } else {
            if (this.status != 200){
                Message("ALT Failed; read console for traceback",true)
            }
        }
        };
        XMLHTTP.open("GET",Url, true);
        XMLHTTP.send();
    }
    function Message(Message,Error){
        Alert.hidden = false
        let InverseError = true
        if (Error){
            InverseError = false
        }
        AlertError.hidden = InverseError
        AlertMessage.innerText = Message
    }
    function AvalibleHandle(Url){
        var XMLHTTP = new XMLHttpRequest();
        XMLHTTP.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var ResponseData = this.responseJson;
            return ResponseData
        } else {
            if (this.status != 200){
                return null
            }
        }
        };
        XMLHTTP.open("GET", CORSProxy+"https://archive.org/wayback/available?url="+Url, true);
        XMLHTTP.send();
    }
    function ProgressBarHandle(Value){
        var Size = String(Value)+"%"
        ProgressInner.innerText = Size
        ProgressInner.style.width = Size
    }
    // Link Detection and XXS Inject Patch
    function SafeHandle(InputData){
        let ResponseData = null
        var XMLHTTP = new XMLHttpRequest();
        XMLHTTP.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            ResponseData = this.responseText;
            if (ResponseData){
                if (ResponseData != InputData){
                    return null
                } else {
                    return InputData
                }
            }
        } else {
            if (this.status != 200){
                return InputData
            }
        }
        };
        XMLHTTP.open("GET", "https://connor33341.github.io/browser/server.php?q=" + InputData + "&i=" + location.host, true);
        XMLHTTP.send();
    }
}