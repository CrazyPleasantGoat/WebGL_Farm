(function () {

    //UNITY STUFF
    var buildUrl = "Build";
    var loaderUrl = buildUrl + "/NobleGarden.loader.js";
    var config = {
        dataUrl: buildUrl + "/NobleGarden.data.unityweb",
        frameworkUrl: buildUrl + "/NobleGarden.framework.js.unityweb",
        codeUrl: buildUrl + "/NobleGarden.wasm.unityweb",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "ZGSD",
        productName: "NobleGarden",
        productVersion: "1.0.0",
    };

    function iOS() {
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
            // iPad on iOS 13 detection
            || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }
    function isFullscreen() {
        return document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement;
    }
    var main_container = document.querySelector("#main-container");
    var container = document.querySelector("#unity-container");
    var canvas = document.querySelector("#unity-canvas");
    var rotateTip = document.querySelector("#rotateTip");
    var rotateTipRoot = document.querySelector("#rotateTipRoot");
    var loader = document.querySelector("#loader");
    var loaderFill = document.querySelector("#fill");
    var toggle_fullscreen=document.querySelector("#toggle_fullscreen");
    function onProgress(progress) {
        loaderFill.style.width = progress * 100 + "%";
    }

    function onComplete(unityInstance) {
        loader.remove();
    }
    var resizeTimeOut;
    function onWindowResize() {
        var width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        var height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

         canvas.height = height;
         canvas.width = width;
        // styleRotate();
    }

    function onWindowResizeWithDelay() {
        //  canvas.width = 1000;
        //  clearTimeout(resizeTimeOut);
        //  resizeTimeOut = setTimeout(onWindowResize, 200);
        onWindowResize();
    }

     var script = document.createElement("script");
     script.src = loaderUrl;
     script.onload = () => {
         createUnityInstance(canvas, config, onProgress)
             .then(onComplete)
             .catch((message) => {
                 alert(message);
             });
     };
     document.body.appendChild(script);

    function showRotateTip() {
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        if (width >= height) {
            rotateTipRoot.style.display='none';
        } else {
            var scaleFactor = width / 1080;
            rotateTip.style.width = 840 * scaleFactor + "px";
            rotateTip.style.height =  441 * scaleFactor + "px";
            rotateTipRoot.style.display="block";
        }
    }

    function onResize(){
        onWindowResizeWithDelay();
        rotateTipRoot.remove();
        // showRotateTip();
        // if (iOS()) {
        //     showRotateTip();
        // }else if(navigator.userAgent.includes("android")){
        //     // canvas.style =styleRotate();
        // }
    }

    window.addEventListener('resize', onResize);
    onResize();
    toggle_fullscreen.style.display="none";
    if(iOS()) {
        
    }else{
        // rotateTipRoot.remove();
        toggle_fullscreen.addEventListener('click', function(){
             if ( isFullscreen() ) {
               
                 if (document.exitFullscreen) {
                     document.exitFullscreen();
                 } 
                 else if (document.mozCancelFullScreen) {
                     document.mozCancelFullScreen();
                 } 
                 else if (document.webkitExitFullscreen) {
                     document.webkitExitFullscreen();
                 } 
                 else if (document.msExitFullscreen) {
                     document.msExitFullscreen();
                 }
                 
             } else {
                 
                 if (main_container.requestFullscreen) {
                     main_container.requestFullscreen();
                 } else if (main_container.mozRequestFullScreen) {
                     main_container.mozRequestFullScreen();
                 } else if (main_container.webkitRequestFullscreen) {
                     main_container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                 } else if (container.msRequestFullscreen) {
                     main_container.msRequestFullscreen();
                 }
                 if(navigator.userAgent.includes("Android")){
                    lockOrientation('landscape');
                 }
             }
         });
    }

    function lockOrientation(orientation){
        // if(window.screen.orientation&&'lock'in window.screen.orientation){
        //     window.screen.orientation.lock(orientation);
        // }else if(window.screen.msLockOrientation&&'lock'in window.screen.msLockOrientation){
        //     window.screen.msLockOrientation.lock(orientation);
        // }else if(window.screen.mozLockOrientation&&'lock'in window.screen.mozLockOrientation){
        //     window.screen.mozLockOrientation.lock(orientation);
        // } else {
        //     screen.lockOrientationUniversal=screen.lockOrientation ||
        //                                     screen.mozLockOrientation ||
        //                                     screen.msLockOrientation;
        //     if (screen.lockOrientationUniversal) {
        //         screen.lockOrientationUniversal(orientation);
        //     } else {
        //         console.log('lockOrientation failed');
        //     }
        // }
    }    

    document.onfullscreenchange = function ( event ) {
        // if ( isFullscreen() ) {
        //     if (toggle_fullscreen.classList.contains("fullscreenON")) {
        //         toggle_fullscreen.classList.remove("fullscreenON");
        //     }
        //     toggle_fullscreen.classList.add("fullscreenOFF");
           
        // } else {
            
        //     if (toggle_fullscreen.classList.contains("fullscreenOFF")) {
        //         toggle_fullscreen.classList.remove("fullscreenOFF");
        //     }
        //     toggle_fullscreen.classList.add("fullscreenON");
        // }
        setTimeout(() => {
            canvas.width=1000;
            onWindowResizeWithDelay();
        }, 400);
    };

})();
