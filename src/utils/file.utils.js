//This function gets the base64 from a file
export function getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result.split(',')[1]));
    reader.readAsDataURL(file);
}
  

//This function gets the base64 from a URL
export function getBase64FromUrl(path, callback){
    var blob = null;
    var xhr = new XMLHttpRequest(); 
    xhr.open("GET", path); 
    xhr.responseType = "blob";
    xhr.onload = function() 
    {
        blob = xhr.response;
        getBase64(blob, callback)
    }
    xhr.send();
}