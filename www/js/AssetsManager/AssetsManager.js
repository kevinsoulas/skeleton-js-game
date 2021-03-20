class AssetsManager {

    constructor(callback) {

        this._images = [];
        this._datas = [];
        this._contents = [];

        this.addAllAssets();
        this.loadAssets(callback);

    }

    addAllAssets() {

        //list assets path
        var paths = [];
        for (var key in ASSETS) {
            var v = ASSETS[key];
            if (!(ASSETS[key] instanceof Array)) {
                for (var key2 in ASSETS[key]) {
                    for (var i = 0; i < ASSETS[key][key2].length;i++) {
                        paths.push(key + "/" + key2 + "/" + ASSETS[key][key2][i]);
                    }
                }
            } else {
                for (var i = 0; i < ASSETS[key].length;i++) {
                    paths.push(key + "/" + ASSETS[key][i]);
                }
            }
        }
        
        //explore
        for (let i=0;i<paths.length;i++) {
            //images
            if ((paths[i].substr(-3,3)=="png")||(paths[i].substr(-3,3)=="jpg")) {
                this._images.push({
                    "key": paths[i],
                    "url": "/asset/" + paths[i],
                    "loaded": false,
                    "image": new Image()
                });
            }
            //datas
            if (paths[i].substr(-4,4)=="json") {
                this._datas.push({
                    "key": paths[i],
                    "url": "/asset/" + paths[i],
                    "data": null,
                    "loaded": false
                });
            }
            //contents
            if (paths[i].substr(-3,3)=="txt") {
                this._contents.push({
                    "key": paths[i],
                    "url": "/asset/" + paths[i],
                    "data": null,
                    "loaded": false
                });
            }
        }

    }

    loadAssets(callback) {

        var self = this;
        for (let index = 0; index < this._images.length; index++) {
            this._images[index].image.addEventListener("load", function (event) {
                self._images[index].loaded = true;
                self[self._images[index].key] = self._images[index];
                callback();
            }, { once: true });
            this._images[index].image.src = this._images[index].url;
        }
        for (let index = 0; index < this._datas.length; index++) {
            this.fetchJSONFile(this._datas[index].url, function (data) {
                self._datas[index].data = data;
                self._datas[index].loaded = true;
                self[self._datas[index].key] = self._datas[index];
                callback();
            });
        }
        for (let index = 0; index < this._contents.length; index++) {
            this.fetchTXTFile(this._contents[index].url, function (data) {
                self._contents[index].data = data;
                self._contents[index].loaded = true;
                self[self._contents[index].key] = self._contents[index];
                callback();
            });
        }

    }

    fetchTXTFile(url, callback) {

        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    var data = httpRequest.responseText;
                    if (callback) callback(data);
                }
            }
        };
        httpRequest.open('GET', url);
        httpRequest.send();

    }

    fetchJSONFile(url, callback) {

        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    var data = JSON.parse(httpRequest.responseText);
                    if (callback) callback(data);
                }
            }
        };
        httpRequest.open('GET', url);
        httpRequest.send();

    }

    writeJSONFile(data) {

        var text = JSON.stringify(data);
        this.copyTextToClipboard(text);

    }

    copyTextToClipboard(text) {

        var textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'copied' : 'unsuccessful';
            console.log(msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        document.body.removeChild(textArea);

    }

    isLoaded(arr) {

        for (let index = 0; index < arr.length; index++) {
            if (!arr[index].loaded) {
                return false;
            }
        }
        return true;

    }

    allAssetsLoaded() {

        return this.isLoaded(this._images) && this.isLoaded(this._datas) && this.isLoaded(this._contents);

    }

}

