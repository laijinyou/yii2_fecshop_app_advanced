/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (name, definition) {
    if (typeof module != 'undefined' && module.exports) module.exports = definition()
    else if (typeof define == 'function' && define.amd) define(name, definition)
    else this[name] = definition()
}('bowser', function () {
    /**
     * See useragents.js for examples of navigator.userAgent
     */

    var t = true

    function detect(ua) {

        function getFirstMatch(regex) {
            var match = ua.match(regex);
            return (match && match.length > 1 && match[1]) || '';
        }

        function getSecondMatch(regex) {
            var match = ua.match(regex);
            return (match && match.length > 1 && match[2]) || '';
        }

        var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
            , likeAndroid = /like android/i.test(ua)
            , android = !likeAndroid && /android/i.test(ua)
            , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
            , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
            , chromeos = /CrOS/.test(ua)
            , silk = /silk/i.test(ua)
            , sailfish = /sailfish/i.test(ua)
            , tizen = /tizen/i.test(ua)
            , webos = /(web|hpw)os/i.test(ua)
            , windowsphone = /windows phone/i.test(ua)
            , samsungBrowser = /SamsungBrowser/i.test(ua)
            , windows = !windowsphone && /windows/i.test(ua)
            , mac = !iosdevice && !silk && /macintosh/i.test(ua)
            , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
            , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
            , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
            , tablet = /tablet/i.test(ua)
            , mobile = !tablet && /[^-]mobi/i.test(ua)
            , xbox = /xbox/i.test(ua)
            , result

        if (/opera/i.test(ua)) {
            //  an old Opera
            result = {
                name: 'Opera'
                , opera: t
                , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
            }
        } else if (/opr|opios/i.test(ua)) {
            // a new Opera
            result = {
                name: 'Opera'
                , opera: t
                , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
            }
        }
        else if (/SamsungBrowser/i.test(ua)) {
            result = {
                name: 'Samsung Internet for Android'
                , samsungBrowser: t
                , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
            }
        }
        else if (/coast/i.test(ua)) {
            result = {
                name: 'Opera Coast'
                , coast: t
                , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
            }
        }
        else if (/yabrowser/i.test(ua)) {
            result = {
                name: 'Yandex Browser'
                , yandexbrowser: t
                , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
            }
        }
        else if (/ucbrowser/i.test(ua)) {
            result = {
                name: 'UC Browser'
                , ucbrowser: t
                , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
            }
        }
        else if (/mxios/i.test(ua)) {
            result = {
                name: 'Maxthon'
                , maxthon: t
                , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
            }
        }
        else if (/epiphany/i.test(ua)) {
            result = {
                name: 'Epiphany'
                , epiphany: t
                , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
            }
        }
        else if (/puffin/i.test(ua)) {
            result = {
                name: 'Puffin'
                , puffin: t
                , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
            }
        }
        else if (/sleipnir/i.test(ua)) {
            result = {
                name: 'Sleipnir'
                , sleipnir: t
                , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
            }
        }
        else if (/k-meleon/i.test(ua)) {
            result = {
                name: 'K-Meleon'
                , kMeleon: t
                , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
            }
        }
        else if (windowsphone) {
            result = {
                name: 'Windows Phone'
                , windowsphone: t
            }
            if (edgeVersion) {
                result.msedge = t
                result.version = edgeVersion
            }
            else {
                result.msie = t
                result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
            }
        }
        else if (/msie|trident/i.test(ua)) {
            result = {
                name: 'Internet Explorer'
                , msie: t
                , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
            }
        } else if (chromeos) {
            result = {
                name: 'Chrome'
                , chromeos: t
                , chromeBook: t
                , chrome: t
                , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
            }
        } else if (/chrome.+? edge/i.test(ua)) {
            result = {
                name: 'Microsoft Edge'
                , msedge: t
                , version: edgeVersion
            }
        }
        else if (/vivaldi/i.test(ua)) {
            result = {
                name: 'Vivaldi'
                , vivaldi: t
                , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
            }
        }
        else if (sailfish) {
            result = {
                name: 'Sailfish'
                , sailfish: t
                , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
            }
        }
        else if (/seamonkey\//i.test(ua)) {
            result = {
                name: 'SeaMonkey'
                , seamonkey: t
                , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
            }
        }
        else if (/firefox|iceweasel|fxios/i.test(ua)) {
            result = {
                name: 'Firefox'
                , firefox: t
                , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
            }
            if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
                result.firefoxos = t
            }
        }
        else if (silk) {
            result =  {
                name: 'Amazon Silk'
                , silk: t
                , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
            }
        }
        else if (/phantom/i.test(ua)) {
            result = {
                name: 'PhantomJS'
                , phantom: t
                , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
            }
        }
        else if (/slimerjs/i.test(ua)) {
            result = {
                name: 'SlimerJS'
                , slimer: t
                , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
            }
        }
        else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
            result = {
                name: 'BlackBerry'
                , blackberry: t
                , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
            }
        }
        else if (webos) {
            result = {
                name: 'WebOS'
                , webos: t
                , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
            };
            /touchpad\//i.test(ua) && (result.touchpad = t)
        }
        else if (/bada/i.test(ua)) {
            result = {
                name: 'Bada'
                , bada: t
                , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
            };
        }
        else if (tizen) {
            result = {
                name: 'Tizen'
                , tizen: t
                , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
            };
        }
        else if (/qupzilla/i.test(ua)) {
            result = {
                name: 'QupZilla'
                , qupzilla: t
                , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
            }
        }
        else if (/chromium/i.test(ua)) {
            result = {
                name: 'Chromium'
                , chromium: t
                , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
            }
        }
        else if (/chrome|crios|crmo/i.test(ua)) {
            result = {
                name: 'Chrome'
                , chrome: t
                , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
            }
        }
        else if (android) {
            result = {
                name: 'Android'
                , version: versionIdentifier
            }
        }
        else if (/safari|applewebkit/i.test(ua)) {
            result = {
                name: 'Safari'
                , safari: t
            }
            if (versionIdentifier) {
                result.version = versionIdentifier
            }
        }
        else if (iosdevice) {
            result = {
                name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
            }
            // WTF: version is not part of user agent in web apps
            if (versionIdentifier) {
                result.version = versionIdentifier
            }
        }
        else if(/googlebot/i.test(ua)) {
            result = {
                name: 'Googlebot'
                , googlebot: t
                , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
            }
        }
        else {
            result = {
                name: getFirstMatch(/^(.*)\/(.*) /),
                version: getSecondMatch(/^(.*)\/(.*) /)
            };
        }

        // set webkit or gecko flag for browsers based on these engines
        if (!result.msedge && /(apple)?webkit/i.test(ua)) {
            if (/(apple)?webkit\/537\.36/i.test(ua)) {
                result.name = result.name || "Blink"
                result.blink = t
            } else {
                result.name = result.name || "Webkit"
                result.webkit = t
            }
            if (!result.version && versionIdentifier) {
                result.version = versionIdentifier
            }
        } else if (!result.opera && /gecko\//i.test(ua)) {
            result.name = result.name || "Gecko"
            result.gecko = t
            result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
        }

        // set OS flags for platforms that have multiple browsers
        if (!result.windowsphone && !result.msedge && (android || result.silk)) {
            result.android = t
        } else if (!result.windowsphone && !result.msedge && iosdevice) {
            result[iosdevice] = t
            result.ios = t
        } else if (mac) {
            result.mac = t
        } else if (xbox) {
            result.xbox = t
        } else if (windows) {
            result.windows = t
        } else if (linux) {
            result.linux = t
        }

        // OS version extraction
        var osVersion = '';
        if (result.windowsphone) {
            osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
        } else if (iosdevice) {
            osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
            osVersion = osVersion.replace(/[_\s]/g, '.');
        } else if (android) {
            osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
        } else if (result.webos) {
            osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
        } else if (result.blackberry) {
            osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
        } else if (result.bada) {
            osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
        } else if (result.tizen) {
            osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
        }
        if (osVersion) {
            result.osversion = osVersion;
        }

        // device type extraction
        var osMajorVersion = osVersion.split('.')[0];
        if (
            tablet
            || nexusTablet
            || iosdevice == 'ipad'
            || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
            || result.silk
        ) {
            result.tablet = t
        } else if (
            mobile
            || iosdevice == 'iphone'
            || iosdevice == 'ipod'
            || android
            || nexusMobile
            || result.blackberry
            || result.webos
            || result.bada
        ) {
            result.mobile = t
        }

        // Graded Browser Support
        // http://developer.yahoo.com/yui/articles/gbs
        if (result.msedge ||
            (result.msie && result.version >= 10) ||
            (result.yandexbrowser && result.version >= 15) ||
            (result.vivaldi && result.version >= 1.0) ||
            (result.chrome && result.version >= 20) ||
            (result.samsungBrowser && result.version >= 4) ||
            (result.firefox && result.version >= 20.0) ||
            (result.safari && result.version >= 6) ||
            (result.opera && result.version >= 10.0) ||
            (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
            (result.blackberry && result.version >= 10.1)
            || (result.chromium && result.version >= 20)
        ) {
            result.a = t;
        }
        else if ((result.msie && result.version < 10) ||
            (result.chrome && result.version < 20) ||
            (result.firefox && result.version < 20.0) ||
            (result.safari && result.version < 6) ||
            (result.opera && result.version < 10.0) ||
            (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
            || (result.chromium && result.version < 20)
        ) {
            result.c = t
        } else result.x = t

        return result
    }

    var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')

    bowser.test = function (browserList) {
        for (var i = 0; i < browserList.length; ++i) {
            var browserItem = browserList[i];
            if (typeof browserItem=== 'string') {
                if (browserItem in bowser) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Get version precisions count
     *
     * @example
     *   getVersionPrecision("1.10.3") // 3
     *
     * @param  {string} version
     * @return {number}
     */
    function getVersionPrecision(version) {
        return version.split(".").length;
    }

    /**
     * Array::map polyfill
     *
     * @param  {Array} arr
     * @param  {Function} iterator
     * @return {Array}
     */
    function map(arr, iterator) {
        var result = [], i;
        if (Array.prototype.map) {
            return Array.prototype.map.call(arr, iterator);
        }
        for (i = 0; i < arr.length; i++) {
            result.push(iterator(arr[i]));
        }
        return result;
    }

    /**
     * Calculate browser version weight
     *
     * @example
     *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
     *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
     *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
     *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
     *
     * @param  {Array<String>} versions versions to compare
     * @return {Number} comparison result
     */
    function compareVersions(versions) {
        // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
        var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
        var chunks = map(versions, function (version) {
            var delta = precision - getVersionPrecision(version);

            // 2) "9" -> "9.0" (for precision = 2)
            version = version + new Array(delta + 1).join(".0");

            // 3) "9.0" -> ["000000000"", "000000009"]
            return map(version.split("."), function (chunk) {
                return new Array(20 - chunk.length).join("0") + chunk;
            }).reverse();
        });

        // iterate in reverse order by reversed chunks array
        while (--precision >= 0) {
            // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
            if (chunks[0][precision] > chunks[1][precision]) {
                return 1;
            }
            else if (chunks[0][precision] === chunks[1][precision]) {
                if (precision === 0) {
                    // all version chunks are same
                    return 0;
                }
            }
            else {
                return -1;
            }
        }
    }

    /**
     * Check if browser is unsupported
     *
     * @example
     *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
     *
     * @param  {Object}  minVersions map of minimal version to browser
     * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
     * @param  {String}  [ua] user agent string
     * @return {Boolean}
     */
    function isUnsupportedBrowser(minVersions, strictMode, ua) {
        var _bowser = bowser;

        // make strictMode param optional with ua param usage
        if (typeof strictMode === 'string') {
            ua = strictMode;
            strictMode = void(0);
        }

        if (strictMode === void(0)) {
            strictMode = false;
        }
        if (ua) {
            _bowser = detect(ua);
        }

        var version = "" + _bowser.version;
        for (var browser in minVersions) {
            if (minVersions.hasOwnProperty(browser)) {
                if (_bowser[browser]) {
                    if (typeof minVersions[browser] !== 'string') {
                        throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
                    }

                    // browser version and min supported version.
                    return compareVersions([version, minVersions[browser]]) < 0;
                }
            }
        }

        return strictMode; // not found
    }

    /**
     * Check if browser is supported
     *
     * @param  {Object} minVersions map of minimal version to browser
     * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
     * @param  {String}  [ua] user agent string
     * @return {Boolean}
     */
    function check(minVersions, strictMode, ua) {
        return !isUnsupportedBrowser(minVersions, strictMode, ua);
    }

    bowser.isUnsupportedBrowser = isUnsupportedBrowser;
    bowser.compareVersions = compareVersions;
    bowser.check = check;

    /*
     * Set our detect method to the main bowser object so we can
     * reuse it to test other user agents.
     * This is needed to implement future tests.
     */
    bowser._detect = detect;

    return bowser
});


(function () {

    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    //bowser.name + ' ' + bowser.version
    //var browserName  	= bowser.name;
    //var browserVersion  = bowser.name;


//////////////////////???????????????????????????
    operate_relase = "";
    var OS_Name = navigator.appVersion;
    if (OS_Name.indexOf("Win") != -1) {
        operate = "Windows";

        if ((OS_Name.indexOf("Windows 95") != -1)||
            (OS_Name.indexOf("Win95") != -1) ||
            (OS_Name.indexOf("Windows_95") != -1)
        ) {
            operate_relase = "Windows 95";
        }else if ((OS_Name.indexOf("Windows 98") != -1)||
            (OS_Name.indexOf("Win98") != -1)) {
            operate_relase = "Win98";

        }else if ((OS_Name.indexOf("Windows NT 5.0") != -1)||
            (OS_Name.indexOf("Windows 2000") != -1)) {
            operate_relase = "Windows 2000";

        }else if ((OS_Name.indexOf("Windows NT 5.1") != -1)||
            (OS_Name.indexOf("Windows XP") != -1)) {
            operate_relase = "Windows XP";

        }else if (OS_Name.indexOf("Win16") != -1) {
            operate_relase = "Windows 3.11";

        }else if (OS_Name.indexOf("Windows NT 5.2") != -1) {
            operate_relase = "Windows Server 2003";

        }else if (OS_Name.indexOf("Windows NT 6.0") != -1) {
            operate_relase = "Windows Vista";

        }else if (OS_Name.indexOf("Windows NT 6.1") != -1) {
            operate_relase = "Windows 7";

        }else if ((OS_Name.indexOf("Windows NT 4.0") != -1)||
            (OS_Name.indexOf("WinNT4.0") != -1) ||
            (OS_Name.indexOf("WinNT") != -1)||
            (OS_Name.indexOf("Windows NT") != -1)) {
            operate_relase = "Windows NT 4.0";
        }else if (OS_Name.indexOf("Windows ME") != -1) {
            operate_relase = "Windows ME";
        }


    } else if (OS_Name.indexOf("Mac") != -1) {
        operate = "Mac OS";
    } else if (OS_Name.indexOf("X11") != -1) {
        operate = "Unix";
    } else if (OS_Name.indexOf("Linux") != -1) {
        operate = "Linux";
    } else if (OS_Name.indexOf("SunOS") != -1) {
        operate = "Sun OS";
    } else if (OS_Name.indexOf("OpenBSD") != -1) {
        operate = "Open BSD";

    } else if (OS_Name.indexOf("QNX") != -1) {
        operate = "QNX";
    } else if (OS_Name.indexOf("BeOS") != -1) {
        operate = "BeOS";
    } else if (OS_Name.indexOf("OS/2") != -1) {
        operate = "OS/2";
    } else if ((OS_Name.indexOf("nuhk") != -1)
        || (OS_Name.indexOf("Googlebot") != -1)
        || (OS_Name.indexOf("Yammybot") != -1)
        || (OS_Name.indexOf("Openbot") != -1)
        || (OS_Name.indexOf("Slurp") != -1)
        || (OS_Name.indexOf("MSNBot") != -1)
        || (OS_Name.indexOf("Ask Jeeves/Teoma") != -1)
        || (OS_Name.indexOf("ia_archiver") != -1)
    ) {
        operate = "Search Bot";
    }else{
        operate = "unknow";
    }
    /////////////////////

    //?????????????????????url???????????????
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    //?????????????????????
    function getDate(){
        var currentdate = new Date();

        month = currentdate.getMonth()+1;if(month<10){month = "0"+month;}
        day = currentdate.getDate();if(day<10){day = "0"+day;}
        hours = currentdate.getHours();if(hours<10){hours = "0"+hours;}
        minutes = currentdate.getMinutes();if(minutes<10){minutes = "0"+minutes;}
        second = currentdate.getSeconds();if(second<10){second = "0"+second;}
        var datetime =  currentdate.getFullYear() + "-"
            + month  + "-"
            + day + " "
            + hours + ":"
            + minutes + ":"
            + second;
        return datetime ;
    }



    //??????????????????
    function getDevice(){
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            webOS:function() {
                return navigator.userAgent.match(/webOS/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iPhone: function() {
                return navigator.userAgent.match(/iPhone/i);
            },
            iPad: function() {
                return navigator.userAgent.match(/iPad/i);
            },
            iPod: function() {
                return navigator.userAgent.match(/iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iPad() ||isMobile.iPod() || isMobile.iPhone() || isMobile.Opera() || isMobile.Windows());
            }
        };
        var str = "";
        if( isMobile.Android() ) { str = "Android";  }
        if( isMobile.webOS() ) { str = "webOS";  }
        if( isMobile.BlackBerry() ) { str = "BlackBerry";  }
        if( isMobile.iPhone() ) { str =  "iPhone";  }
        if( isMobile.iPad() ) { str =  "iPad";  }
        if( isMobile.iPod() ) { str =  "iPod";  }
        if( isMobile.Opera() ) { str =  "Opera";  }
        if( isMobile.Windows() ) { str =  "Windows";  }
        if(str){
            return "Mobile:"+str;
        }else{
            return "PC";
        }

    }

    //////////////
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };

    function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    ////?????????????????????uuid
    var uuid = guid();
    ////??????cookie?????????????????????  expires?????????????????????
    function Set_Cookie( name, value, expires, path, domain, secure )
    {
        // set time, it's in milliseconds

        domain = document.domain;
        domain = domain.match(/[^\.]*\.[^.]*$/)[0];
        //domain = domain.replace("www.","");

        var today = new Date();
        today.setTime( today.getTime() );

        /*
        if the expires variable is set, make the correct
        expires time, the current script below will set
        it for x number of days, to make it for hours,
        delete * 24, for minutes, delete * 60 * 24
        */
        if ( expires )
        {
            expires = expires * 1000 * 60 * 60 * 24;
        }else{
            expires = expires * 20 * 365 * 1000 * 60 * 60 * 24;
        }
        var expires_date = new Date( today.getTime() + (expires) );

        this_expires = expires/1000;
        //document.write("thisdomain:"+domain+"<br/>");
        document.cookie = name + "=" +escape( value ) +
            ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
            ( ( path ) ? ";path=" + path : "" ) +
            ( ( domain ) ? ";domain=" + domain : "" ) +
            ( ( secure ) ? ";secure" : "" );


    }
    //??????cookie
    function Get_Cookie( check_name ) {
        // first we'll split this cookie up into name/value pairs
        // note: document.cookie only returns name=value, not the other components
        var a_all_cookies = document.cookie.split( ';' );
        var a_temp_cookie = '';
        var cookie_name = '';
        var cookie_value = '';
        var b_cookie_found = false; // set boolean t/f default f

        for ( i = 0; i < a_all_cookies.length; i++ )
        {
            // now we'll split apart each name=value pair
            a_temp_cookie = a_all_cookies[i].split( '=' );


            // and trim left/right whitespace while we're at it
            cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

            // if the extracted name matches passed check_name
            if ( cookie_name == check_name )
            {
                b_cookie_found = true;
                // we need to handle case where cookie has no value but exists (no = sign, that is):
                if ( a_temp_cookie.length > 1 )
                {
                    cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
                }
                // note that in cases where cookie is initialized but no value, null is returned
                return cookie_value;
                break;
            }
            a_temp_cookie = null;
            cookie_name = '';
        }
        if ( !b_cookie_found )
        {
            return null;
        }
    }
    //??????cookie
    function Delete_Cookie( name, path, domain ) {
        domain = document.domain;
        domain = domain.match(/[^\.]*\.[^.]*$/)[0];
        if ( Get_Cookie( name ) ) document.cookie = name + "=" +
            ( ( path ) ? ";path=" + path : "") +
            ( ( domain ) ? ";domain=" + domain : "" ) +
            ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    }


    var params = {};
    if( "undefined" != typeof _maq){
    // if(_maq) {
        for(var i in _maq) {
            var x = _maq[i][0];
            if(x){
                params[x] = _maq[i][1];
            }
        }
    } else {
        var jsPath = getJsPath("fec_trace.js");
        var urlparse = jsPath.split("\?");  
        var parms = urlparse[1].split("&"); 
        for(var i = 0; i < parms.length; i++) {  
            var pr = parms[i].split("="); 
            params[pr[0]] = pr[1]; 
        }  
    }
    
    function getJsPath(jsname) {  
        var js = document.scripts;  
        var jsPath = "";  
        for (var i = js.length; i > 0; i--) {  
            if (js[i - 1].src.indexOf(jsname) > -1) {  
                return js[i - 1].src;  
            }  
        }  
        return jsPath;  
    }  
    
    eid = getParameterByName("eid");
    eid = params.eid ? params.eid : eid
    
    if(eid){
        params.eid = eid;
    }

    //???????????????????????? - ??????
    // ??????  fid   ???????????? fid ??????????????? fid ??????????????????
    fid = getParameterByName("fid");
    fid = params.fid ? params.fid : fid
    var cookie_fid = Get_Cookie("fid");

    if(fid){
        //set fid cookie.
        params.fid = fid;
        Set_Cookie( "fid", fid, 15, "/", '', '' );
    }else if(cookie_fid){
        params.fid = cookie_fid;
    }

    fec_source 		= getParameterByName("fec_source");
    fec_medium 		= getParameterByName("fec_medium");
    fec_campaign 	= getParameterByName("fec_campaign");
    fec_content 	= getParameterByName("fec_content");
    fec_design 		= getParameterByName("fec_design");
    fec_source      = params.fec_source ? params.fec_source : fec_source
    fec_medium      = params.fec_medium ? params.fec_medium : fec_medium
    fec_campaign    = params.fec_campaign ? params.fec_campaign : fec_campaign
    fec_content     = params.fec_content ? params.fec_content : fec_content
    fec_design      = params.fec_design ? params.fec_design : fec_design
    if(fid || ((!cookie_fid) && (fec_source || fec_medium || fec_campaign || fec_content || fec_design))){ //?????? fid????????? fec ??????????????????????????????????????????cookie
        if(fec_source){
            //set fid cookie.
            params.fec_source = fec_source;
            Set_Cookie( "fec_source", fec_source, 15, "/", '', '' );
        }else{
            // ?????????????????????????????????????????????cookie
            Delete_Cookie( "fec_source", "/", '');
        }
        // fec_medium ?????????
        if(fec_medium){
            //set fid cookie.
            params.fec_medium = fec_medium;
            Set_Cookie( "fec_medium", fec_medium, 15, "/", '', '' );
        }else{
            // ?????????????????????????????????????????????cookie
            Delete_Cookie( "fec_medium", "/", '');
        }
        // fec_campaign ??????/??????
        if(fec_campaign){
            //set fid cookie.
            params.fec_campaign = fec_campaign;
            Set_Cookie( "fec_campaign", fec_campaign, 15, "/", '', '' );
        }else{
            // ?????????????????????????????????????????????cookie
            Delete_Cookie( "fec_campaign", "/", '');
        }
        // fec_content ?????????
        if(fec_content){
            //set fid cookie.
            params.fec_content = fec_content;
            Set_Cookie( "fec_content", fec_content, 15, "/", '', '' );
        }else{
            // ?????????????????????????????????????????????cookie
            Delete_Cookie( "fec_content", "/", '');
        }

        // fec_design ??????????????????
        if(fec_design){
            //set fid cookie.
            params.fec_design = fec_design;
            Set_Cookie( "fec_design", fec_design, 15, "/", '', '' );
        }else{
            // ?????????????????????????????????????????????cookie
            Delete_Cookie( "fec_design", "/", '');
        }

    }else{
        var cookie_fec_source = Get_Cookie("fec_source");
        if(cookie_fec_source){
            params.fec_source = cookie_fec_source;
        }

        var cookie_fec_medium = Get_Cookie("fec_medium");
        if(cookie_fec_medium){
            params.fec_medium = cookie_fec_medium;
        }

        var cookie_fec_campaign = Get_Cookie("fec_campaign");
        if(cookie_fec_campaign){
            params.fec_campaign = cookie_fec_campaign;

        }

        var cookie_fec_content = Get_Cookie("fec_content");
        if(cookie_fec_content){
            params.fec_content = cookie_fec_content;

        }

        var cookie_fec_design = Get_Cookie("fec_design");
        if(cookie_fec_design){
            params.fec_design = cookie_fec_design;

        }
    }
    //???????????????????????? - ??????



    //??????
    params.devide = getDevice();
    params.user_agent = navigator.userAgent;
    var userLang = navigator.language || navigator.userLanguage;
    params.browser_name 	= bowser.name;  //???????????????
    params.browser_version 	= bowser.version;  //???????????????
    params.browser_date 	= getDate();  //???????????????
    params.browser_lang 	= userLang;   //???????????????
    params.operate 			= operate;     //????????????
    params.operate_relase 	= operate_relase;  //??????????????????



    //Document????????????
    //?????????????????????????????????????????????????????????
    //????????????refer domain????????????????????????  && _fta ??????cookie??????
    //??????????????????????????????????????????????????????????????????????????????return:1??????????????????????????????????????????UID
    //????????????????????????refer???
    url	= window.location.href || '';    //??????url
    var urlParts = url.replace('http://','').replace('https://','').split(/[/?#]/);
    var domain = urlParts[0];
    params.url = url;
    params.domain = domain;
    if(document) {
        params.title = document.title || '';   //??????title
        if (!params.hasOwnProperty('refer_url') ||  !params.refer_url) {
            params.refer_url = document.referrer || '';  //??????referrer
        }

        //thisrefer =  document.referrer || '';
        //refer_fta_cookie = Get_Cookie( '_fta' );

        //???cookie?????????????????????????????????????????????????????????????????????6???????????????????????????6?????????????????????????????????
        //??????????????????????????????????????????????????????????????????????????????cookie?????????????????????
        _fto = Get_Cookie( '_fto' );
        // //??????cookie?????????cookie????????????????????????????????????
        _fta = Get_Cookie( '_fta' );

        if(_fto){
            //?????????????????????????????????????????????refer??????return
            //?????????????????????
            Set_Cookie( '_fto',1, 0.6, '/', '', '' );   //online - one day
            first_page = 0;
        }else{
            //???????????????????????????
            first_page = 1;
            //????????????_fta ???????????????????????????????????????????????????
            if(_fta){
                //?????????????????????cookie:????????????,?????????????????????????????????
                Set_Cookie( '_ftreturn',1, 36500, '/', '', '' );   // is return  - one day
            }else{
                //?????????
                Set_Cookie( '_ftreturn',0, 36500, '/', '', '' );   // is return  - one day
            }
        }
        // ?????????????????????????????????_fto???6????????????
        if(!Get_Cookie( '_fto')){
            Set_Cookie( '_fto',1, 0.6, '/', '', '' );   //online - one day
        }
        
        

        thisreferrer = document.referrer || '';
        first_refer_url = '';
        // ??????refer ?????????refer  ??????????????????????????????redirect
        if(!Get_Cookie( '_ftreferdomain')){
            if(!thisreferrer){
                thisreferrer_domain = "redirect";
                first_refer_url = "redirect";
            }else{
                first_refer_url = thisreferrer;
                thisreferrer_domain = thisreferrer.replace('http://','').replace('https://','').split(/[/?#]/)[0];
                //??????refer domain???????????????????????????????????????refer???redirect???
                t_domain = document.domain;
                t_domain = t_domain.match(/[^\.]*\.[^.]*$/)[0];
                if(thisreferrer_domain){
                    indexOf = thisreferrer_domain.indexOf(t_domain);
                    if(indexOf != -1){
                        thisreferrer_domain = "redirect";
                        first_refer_url = "redirect";
                    }
                }
            }
            //??????????????????????????????cookie  topic_page??????????????????????????????
            $pathname = window.location.pathname;
            //alert($pathname);
            $pathname=$pathname.replace("/","");
            cl_activity = null;
            if(params.sku){
                cl_activity = 'sku_page';
                cl_activity_child = params.sku;
            }else if(params.category){
                cl_activity = 'category_page';
                cl_activity_child = params.category;
            }else if(params.search){
                cl_activity = 'search_page';
                searchtext = params.search.text;
                // ??????100????????????????????????
                if(searchtext.length > 150){
                    searchtext = searchtext.substr(0,150);
                }
                cl_activity_child = searchtext;
            }else if(!$pathname){
                cl_activity = 'home_page';
                cl_activity_child = 'home_page';
            }
            if(cl_activity && cl_activity_child){
                Set_Cookie( '_ftactivity',cl_activity, 0.6, '/', '', '' );
                Set_Cookie( '_ftactivity_child',cl_activity_child, 0.6, '/', '', '' );
            }
            // ??????????????????????????????????????????????????????
            Set_Cookie( '_ftreferdomain',thisreferrer_domain, 0.6, '/', '', '' );   //refer  - one day
            Set_Cookie( '_ftreferurl',first_refer_url, 0.6, '/', '', '' );   //refer  - one day


        }else{
            d_ftreferdomain =  Get_Cookie( '_ftreferdomain');
            Set_Cookie( '_ftreferdomain',d_ftreferdomain, 0.6, '/', '', '' );

            d_ftreferurl =  Get_Cookie( '_ftreferurl');
            Set_Cookie( '_ftreferurl',d_ftreferurl, 0.6, '/', '', '' );


            // ?????? ?????????????????????cookie
            d_ftactivity =  Get_Cookie('_ftactivity');
            d_ftactivity_child =  Get_Cookie( '_ftactivity_child');
            if(d_ftactivity && d_ftactivity_child){
                Set_Cookie( '_ftactivity',d_ftactivity, 0.6, '/', '', '' );
                Set_Cookie( '_ftactivity_child',d_ftactivity_child, 0.6, '/', '', '' );
            }
        }



        //referrer ???????????????????????????????????????????????????
        params.first_referrer_domain = Get_Cookie('_ftreferdomain');
        params.first_referrer_url = Get_Cookie('_ftreferurl');
        // ??????????????????cookie ???referrer????????????
        cl_activity = Get_Cookie('_ftactivity');
        cl_activity_child = Get_Cookie('_ftactivity_child');
        if(cl_activity && cl_activity_child){
            params.cl_activity = cl_activity;
            params.cl_activity_child = cl_activity_child;
        }

        params.is_return = Get_Cookie('_ftreturn');
        //params.online = Get_Cookie('_fto');
        params.first_page = first_page;

        //??????uuid????????? _fta?????????????????????uuid???????????????????????????????????????????????????uuid???
        if(cookie_uuid = Get_Cookie('_fta') ){
            params.uuid = cookie_uuid;
        }else{
            params.uuid = uuid;
            Set_Cookie( '_fta', uuid, 36500, '/', '', '' );
        }
        fta_site_id = Get_Cookie('_fta_site_id')
        // alert(params.website_id);
        if (params.website_id != fta_site_id) {
            Set_Cookie( '_fta_site_id', params.website_id, 36500, '/', '', '' );
        }

    }
    //Window????????????
    if(window && window.screen) {
        //params.sh = window.screen.height || 0;
        //?????????????????????????????????
        if(window.devicePixelRatio){
            devicePixelRatio = window.devicePixelRatio;
            params.device_pixel_ratio = devicePixelRatio;
            params.resolution = (window.screen.width*devicePixelRatio || 0) +"x"+ (window.screen.height*devicePixelRatio || 0);
        }else{
            params.resolution = (window.screen.width || 0) +"x"+ (window.screen.height || 0);
        }
        params.color_depth = window.screen.colorDepth || 0;
    }



    // ????????????email??????????????????????????????js?????????
    //??????_maq??????
    //if(_maq) {
    //	for(var i in _maq) {
    //		x = _maq[i][0];
    //		if(x){
    //email
    //?????????customer email?????????cookie?????????????????????customer email
    //??????????????????????????????customer email???cookie _fte
    //??????customer name??????????????????
    //			if(x == 'login_email'){
    //				current_customer_email = _maq[i][1];
    //??????cookie
    //				if(cookie_customer_email = Get_Cookie( '_fte' )){
    //??????cookie???????????????????????????????????????
    //					if(current_customer_email != cookie_customer_email){
    //						Set_Cookie( '_fte', current_customer_email, '36500', '/', '', '' );
    //					}
    //?????????cookie
    //				}else{
    //					Set_Cookie( '_fte', current_customer_email, '36500', '/', '', '' );
    //				}
    //				params[x] = current_customer_email;

    //			}else{
    //				params[x] = _maq[i][1];
    //			}
    //		}
    //	}
    //}
    //??????cookie?????????????????????????????????cookie?????????
    //if(!params.login_email){
    //	if(Get_Cookie( '_fte' )){
    //		params.login_email = Get_Cookie( '_fte' )
    //	}
    //}

    // ????????????maq??????????????????


    //????????????????????????url??????????????????????????????????????????
    var args = '';
    for(var i in params) {
        if(args != '') {
            args += '&';
        }
        if(typeof params[i] == 'object'){
            args += i + '=' + encodeURIComponent(JSON.stringify(params[i]))
        } else {
            args += i + '=' + encodeURIComponent(params[i]);
        }
    }

    // ??????Image???????????????????????? 
    var img = new Image(1, 1);
    img.src = '//fatrace.fecxxxxxx.com/trace/js?' + args;
})();
