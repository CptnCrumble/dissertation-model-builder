function getValidData() {
    var xhttp = new XMLHttpRequest();            
    xhttp.open("GET","/preprocessing/validData",true);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send();
}