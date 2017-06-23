const DataActions = {

  sendRequest: (reqType, state, apiEndpoint, callback) => {
    const data = state;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        if(xhr.status === 200) {
          console.log(this.responseText);
          if(callback) {
            callback(this.responseText);
          };
        };
      };
    });

    xhr.open(reqType, apiEndpoint);
    xhr.setRequestHeader('content-type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader('cache-control', 'no-cache');

    xhr.send(JSON.stringify(data));
  },

  uploadImages: (data, apiEndpoint, callback) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    xhr.upload.addEventListener('progress', function(event) {
      console.log('progress: ', event.loaded);
    });

    xhr.upload.addEventListener('load', function(event) {
      callback;
      console.log('load: ', event);
    });

    xhr.upload.addEventListener('error', function(event) {
      console.log('error: ', event);
    });

    xhr.open('POST', apiEndpoint, true);
    xhr.send(data);
  }

};


module.exports = DataActions;