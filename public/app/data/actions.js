const DataActions = {

  postRequest: (state, apiEndpoint, callback) => {
    const data = state;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        // console.log(this.responseText);
        if(xhr.status === 200) {
          callback;
        };
      }
    });

    xhr.open("POST", apiEndpoint);
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(JSON.stringify(data));
  }

};


module.exports = DataActions;