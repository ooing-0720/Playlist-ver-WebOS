const kindID = "com.sample.playlist.db:1";
const bridge = new WebOSServiceBridge();

console.log("js"); 

window.onload = function() {
    putKind();
    putPermissions();
    putDevice();
}

function putKind() {
    let url = 'luna://com.webos.service.db/putKind';
    bridge.onservicecallback = (msg) => {console.log(msg)};
    let params = {
        "id":kindID,
        "owner":"com.sample.playlist.db",
        "indexes": [
            {
                "name": "user",
                "props": [
                    {"name": "user"}
                ]
            },
            {
                "name": "id",
                "props": [
                    {"name": "id"}
                ]
            },
            {
                "name": "vid",
                "props": [
                    {"name": "vid"}
                ]
            },
            {
                "name": "title",
                "props":[
                    {"name": "title"}
                ]
            }
        ]
    };
    bridge.call(url, JSON.stringify(params));
}

function putPermissions() {
    let url = 'luna://com.webos.service.db/putPermissions';
    bridge.onservicecallback = (msg) => {console.log(msg)};
    let params = {
        "permissions":[ 
            { 
               "operations":{ 
                  "read":"allow",
                  "create":"allow",
                  "update":"allow",
                  "delete":"allow"
               },
               "object":kindID,
               "type":"db.kind",
               "caller":"com.sample.playlist.db"
            }
         ]
    };
    bridge.call(url, JSON.stringify(params));
}

function emptyDB() {
    let url = 'luna://com.webos.service.db/del';
    bridge.onservicecallback = (res)=>{console.log(res);};
    
    let params = {
        "query":{ 
            "from":kindID
        }
    };
    bridge.call(url, JSON.stringify(params));
}

function findDeviceHandler(res) {
    console.log(res);
    let results = JSON.parse(res).results;
    
    let main = `<iframe id="player" width="0" height="0" src="https://www.youtube.com/embed/${results[0].vid}?enablejsapi=1&rel=0autoplay=1&amp&loop=1&playlist=`;
    let elem = '';
    for (let i=0; i<results.length; i++) {
        if(i == 0){
            main += `${results[i].vid}`;
        }
        else{
            main += `,${results[i].vid}`;
        }

        elem += `<div class="music" id="music" onclick="change_thumb('music_image${results[i].id}');">
        <div class="music_thumb">
            <image id="music_image${results[i].id}" class="music_image" src="https://i.ytimg.com/vi/${results[i].vid}/hqdefault.jpg"></image>
        </div>
        <div class="details">
            <h3>${results[i].title}</h3>
            <h4>https://youtu.be/${results[i].vid}</h4>
        </div>
    </div>` 
    }


    let thumb = `<image id="thumbnail" class="thumbnail" src="https://i.ytimg.com/vi/${results[0].vid}/hqdefault.jpg"></image>`;
    thumb = thumb + main + '" allowfullscreen allow="autoplay"></iframe>';

    document.getElementById('thum_img').innerHTML = thumb;
    document.getElementById('playlist').innerHTML = elem;
    // createToast_finish(results[0].vid);
}

function findDevice() {
    let url = 'luna://com.webos.service.db/find';
    bridge.onservicecallback = findDeviceHandler;
    var user_name = document.getElementById("title").innerText;

    let params = {
        "query":{ 
            "from":kindID,
            "where":[ 
            { 
                "prop":"user",
                "op":"=",
                "val":user_name
            }
            ]
        }
    };
    bridge.call(url, JSON.stringify(params));
}

function putDeviceHandler(res) {
    let response = JSON.parse(res);
    console.log(res);


    if(response.returnValue) {
        //createToast_success();
        findDevice();
    }
    else {
        alert("Put device error.");
        console.log("Put device error.");
    }
    
}

var num = 0;

function putDevice() {
    let url = 'luna://com.webos.service.db/put';
    bridge.onservicecallback = putDeviceHandler;
   // createToast();
    
    let params = {
        "objects" : [
            {
                "_kind": kindID,
                "user": "sojeong",
                "id": "00",
                "vid": "822jjVMdj58",
                "title": "Music Video メビウス／めいちゃん"
            },
            {
                "_kind": kindID,
                "user": "sojeong",
                "id": "01",
                "vid": "IyNqRHh7Qfo",
                "title": "Music Video 季節と私の話。／めいちゃん"
            },
            {
                "_kind": kindID,
                "user": "sojeong",
                "id": "02",
                "vid": "SMEyLYGGLKc",
                "title": "Music Video 小悪魔だってかまわない！／めいちゃん"
            },
            {
                "_kind": kindID,
                "user": "sojeong",
                "id": "03",
                "vid": "Rd2__KGSZs4",
                "title": "Music Video 水滴／めいちゃん"
            },
            {
                "_kind": kindID,
                "user": "heeran",
                "id": "04",
                "vid": "beu-Kta_h8E",
                "title": "フォニイ Cover / めいちゃん"
            },
            {
                "_kind": kindID,
                "user": "heeran",
                "id": "05",
                "vid": "6PvlSbd4HDk",
                "title": "踊 歌ってみた 【あらき×nqrse×めいちゃん"
            },
            {
                "_kind": kindID,
                "user": "heeran",
                "id": "06",
                "vid": "4DMsoND2Ays",
                "title": "ヴァンパイア 歌ってみた 【あらき×nqrse×めいちゃん"
            },
            {
                "_kind": kindID,
                "user": "heeran",
                "id": "07",
                "vid": "wwOFRX-7EWY",
                "title": "ダーリンダンス 歌ってみた 【あらき×nqrse×めいちゃん"
            },
            {
                "_kind": kindID,
                "user": "heeran",
                "id": "08",
                "vid": "OOehYqsN6Fk",
                "title": "【MV】 えらくてえらい あらき×nqrse×めいちゃん"
            },
            {
                "_kind": kindID,
                "user": "heeran",
                "id": "09",
                "vid": "M484CkcxXuY",
                "title": "春を告げる 歌ってみた【あらき×nqrse×めいちゃん"
            }
        ]
    };
    bridge.call(url, JSON.stringify(params));
    
    console.log('putDevice', params);
    
}

/*
function toastCallback(msg) {
    console.log("before-parse-response");
    var response = JSON.parse(msg);
    console.log(response);
}

function createToast() {
    var url = 'luna://com.webos.notification/createToast';

    var user_name = document.getElementById("title").value;
    bridge.onservicecallback = toastCallback;

    var params = {
        "message": user_name
    };

    console.log("before-bridge.call");
    bridge.call(url, JSON.stringify(params));
    console.log("after-bridge.call");
}
*/