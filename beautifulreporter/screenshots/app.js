var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = {
        description: '',
        passed: true,
        failed: true,
        pending: true,
        withLog: true,
    };

    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        $scope.searchSettings.passed = true;
        $scope.searchSettings.failed = true;
        $scope.searchSettings.pending = true;
        $scope.searchSettings.withLog = true;
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.specLevel = function (str) {
        var arr = str.split('|');
        str = "";
        if (arr.length < 3) {
            return true;
        }
        return false;
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };


    this.nToBr = function (str) {
        return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    };


    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number)/1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {passCount++};
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {pendingCount++};
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {failCount++}
        }
        return failCount;
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results =[
    {
        "description": "should login success|Classnotebook Demo App",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 26972,
        "browser": {
            "name": "chrome",
            "version": "63.0.3239.132"
        },
        "message": "Failed: unknown error: unhandled inspector error: {\"code\":-32000,\"message\":\"Cannot find context with specified id\"}\n  (Session info: chrome=63.0.3239.132)\n  (Driver info: chromedriver=2.35.528161 (5b82f2d2aae0ca24b877009200ced9065a772e73),platform=Windows NT 10.0.16299 x86_64)",
        "trace": "WebDriverError: unknown error: unhandled inspector error: {\"code\":-32000,\"message\":\"Cannot find context with specified id\"}\n  (Session info: chrome=63.0.3239.132)\n  (Driver info: chromedriver=2.35.528161 (5b82f2d2aae0ca24b877009200ced9065a772e73),platform=Windows NT 10.0.16299 x86_64)\n    at WebDriverError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:27:5)\n    at Object.checkLegacyResponse (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:109:7)\nFrom: Task: WebDriver.executeScript()\n    at Driver.schedule (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.executeScript (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:878:16)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\by.js:191:35\n    at call (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1068:28)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:907:19\n    at ManagedPromise.invokeCallback_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\nFrom: Task: WebDriver.call(function)\n    at Driver.call (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:901:23)\n    at Driver.findElementsInternal_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1068:17)\n    at Driver.findElements (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1043:19)\n    at Object.findElementsOverride (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\locators.js:200:31)\n    at ptor.waitForAngular.then (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:156:40)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\nFrom: Task: <anonymous>\n    at Timeout.pollCondition [as _onTimeout] (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2195:19)\n    at ontimeout (timers.js:386:11)\n    at tryOnTimeout (timers.js:250:5)\n    at Timer.listOnTimeout (timers.js:214:5)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at UserContext.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:29:15)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"should login success\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4448:26)\n    at QueueRunner.run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4368:20)\n    at runNext (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4408:20)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4415:13\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4323:9\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:25:6)\n    at addSpecsToSuite (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1152:25)\n    at Env.describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1117:7)\n    at describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4555:18)\n    at Object.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:1:63)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://site-cdn.onenote.net/1691271551_Scripts/CommonDiagnostics.js 1 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1519807095499,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/?public=1&wdorigin=ondcauth2&wdorigin=ondc - Failed to decode downloaded font: https://www.onenote.com/segoeuil.woff",
                "timestamp": 1519807097953,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/?public=1&wdorigin=ondcauth2&wdorigin=ondc - OTS parsing error: invalid version tag",
                "timestamp": 1519807097954,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/?public=1&wdorigin=ondcauth2&wdorigin=ondc 568 A parser-blocking, cross site (i.e. different eTLD+1) script, https://c.microsoft.com/ms.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1519807098091,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/?public=1&wdorigin=ondcauth2&wdorigin=ondc 568 A parser-blocking, cross site (i.e. different eTLD+1) script, https://c.microsoft.com/ms.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1519807098092,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://site-cdn.onenote.net/1691271551_Scripts/home.js 0:6762 Uncaught TypeError: Cannot read property 'style' of null",
                "timestamp": 1519807099964,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/hrd 277 A parser-blocking, cross site (i.e. different eTLD+1) script, https://c.microsoft.com/ms.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1519807100335,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/hrd 277 A parser-blocking, cross site (i.e. different eTLD+1) script, https://c.microsoft.com/ms.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1519807100336,
                "type": ""
            }
        ],
        "screenShotFile": "00770029-00b1-004e-0095-0001001200fe.png",
        "timestamp": null,
        "duration": null
    },
    {
        "description": "should open onenote online|Classnotebook Demo App",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 26972,
        "browser": {
            "name": "chrome",
            "version": "63.0.3239.132"
        },
        "message": "Failed: Wait timed out after 12007ms",
        "trace": "TimeoutError: Wait timed out after 12007ms\n    at WebDriverError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:27:5)\n    at TimeoutError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:262:5)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at UserContext.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:42:13)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"should open onenote online\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4448:26)\n    at QueueRunner.run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4368:20)\n    at runNext (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4408:20)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4415:13\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4323:9\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:40:1)\n    at addSpecsToSuite (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1152:25)\n    at Env.describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1117:7)\n    at describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4555:18)\n    at Object.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:1:63)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [],
        "screenShotFile": "008200a6-00c7-0057-00f0-00eb00470026.png",
        "timestamp": null,
        "duration": null
    },
    {
        "description": "Should open Immesive office launcher|Classnotebook Demo App",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 26972,
        "browser": {
            "name": "chrome",
            "version": "63.0.3239.132"
        },
        "message": "Failed: No element found using locator: By(css selector, *[id=\"WebApplicationFrame\"])",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, *[id=\"WebApplicationFrame\"])\n    at WebDriverError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:27:5)\n    at NoSuchElementError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:192:5)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)\nFrom: Task: WebDriver.switchTo().frame([object Object])\n    at Driver.schedule (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at TargetLocator.frame (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1824:25)\n    at UserContext.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:50:24)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\nFrom: Task: Run it(\"Should open Immesive office launcher\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4448:26)\n    at QueueRunner.run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4368:20)\n    at runNext (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4408:20)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4415:13\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4323:9\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:48:1)\n    at addSpecsToSuite (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1152:25)\n    at Env.describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1117:7)\n    at describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4555:18)\n    at Object.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:1:63)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [],
        "screenShotFile": "001f0027-0083-00c0-0074-00cb003400d0.png",
        "timestamp": null,
        "duration": null
    },
    {
        "description": "should click play button on Immersive reader|Classnotebook Demo App",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 26972,
        "browser": {
            "name": "chrome",
            "version": "63.0.3239.132"
        },
        "message": "Failed: Wait timed out after 5005ms",
        "trace": "TimeoutError: Wait timed out after 5005ms\n    at WebDriverError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:27:5)\n    at TimeoutError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:262:5)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at UserContext.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:80:13)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"should click play button on Immersive reader\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4448:26)\n    at QueueRunner.run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4368:20)\n    at runNext (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4408:20)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4415:13\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4323:9\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:60:2)\n    at addSpecsToSuite (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1152:25)\n    at Env.describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1117:7)\n    at describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4555:18)\n    at Object.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:1:63)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [],
        "screenShotFile": "002a00b8-00cd-0098-003b-00ad002700e8.png",
        "timestamp": null,
        "duration": null
    },
    {
        "description": "should login success|Classnotebook Demo App",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14332,
        "browser": {
            "name": "chrome",
            "version": "65.0.3325.162"
        },
        "message": "Failed: No element found using locator: By(css selector, *[id=\"h_sign\"])",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, *[id=\"h_sign\"])\n    at WebDriverError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:27:5)\n    at NoSuchElementError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:192:5)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function) [as click] (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function) [as click] (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:26:20)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should login success\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4448:26)\n    at QueueRunner.run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4368:20)\n    at runNext (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4408:20)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4415:13\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4323:9\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:25:6)\n    at addSpecsToSuite (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1152:25)\n    at Env.describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1117:7)\n    at describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4555:18)\n    at Object.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:1:63)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [],
        "screenShotFile": "001200b1-006f-0014-0035-000000460079.png",
        "timestamp": null,
        "duration": null
    },
    {
        "description": "should open onenote online|Classnotebook Demo App",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14332,
        "browser": {
            "name": "chrome",
            "version": "65.0.3325.162"
        },
        "message": "Failed: Wait timed out after 12006ms",
        "trace": "TimeoutError: Wait timed out after 12006ms\n    at WebDriverError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:27:5)\n    at TimeoutError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:262:5)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at UserContext.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:42:13)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"should open onenote online\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4448:26)\n    at QueueRunner.run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4368:20)\n    at runNext (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4408:20)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4415:13\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4323:9\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:40:1)\n    at addSpecsToSuite (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1152:25)\n    at Env.describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1117:7)\n    at describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4555:18)\n    at Object.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:1:63)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [],
        "screenShotFile": "0055004b-0081-00f2-00d0-00d000ea0001.png",
        "timestamp": null,
        "duration": null
    },
    {
        "description": "Should open Immesive office launcher|Classnotebook Demo App",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14332,
        "browser": {
            "name": "chrome",
            "version": "65.0.3325.162"
        },
        "message": "Failed: No element found using locator: By(css selector, *[id=\"WebApplicationFrame\"])",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, *[id=\"WebApplicationFrame\"])\n    at WebDriverError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:27:5)\n    at NoSuchElementError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:192:5)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)\nFrom: Task: WebDriver.switchTo().frame([object Object])\n    at Driver.schedule (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at TargetLocator.frame (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1824:25)\n    at UserContext.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:50:24)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\nFrom: Task: Run it(\"Should open Immesive office launcher\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4448:26)\n    at QueueRunner.run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4368:20)\n    at runNext (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4408:20)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4415:13\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4323:9\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:48:1)\n    at addSpecsToSuite (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1152:25)\n    at Env.describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1117:7)\n    at describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4555:18)\n    at Object.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:1:63)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [],
        "screenShotFile": "00bf004c-0053-0088-00c8-00d100320056.png",
        "timestamp": null,
        "duration": null
    },
    {
        "description": "should click play button on Immersive reader|Classnotebook Demo App",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14332,
        "browser": {
            "name": "chrome",
            "version": "65.0.3325.162"
        },
        "message": "Failed: Wait timed out after 5001ms",
        "trace": "TimeoutError: Wait timed out after 5001ms\n    at WebDriverError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:27:5)\n    at TimeoutError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:262:5)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at UserContext.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:80:13)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"should click play button on Immersive reader\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4448:26)\n    at QueueRunner.run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4368:20)\n    at runNext (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4408:20)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4415:13\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4323:9\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:60:2)\n    at addSpecsToSuite (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1152:25)\n    at Env.describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1117:7)\n    at describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4555:18)\n    at Object.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:1:63)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [],
        "screenShotFile": "00b5001e-0003-0064-00ee-00b800500016.png",
        "timestamp": null,
        "duration": null
    },
    {
        "description": "should login success|Classnotebook Demo App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 4116,
        "browser": {
            "name": "chrome",
            "version": "65.0.3325.162"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://site-cdn.onenote.net/1692131562_Scripts/CommonDiagnostics.js 1 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1521101251223,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.onenote.com/?public=1&wdorigin=ondcauth2&wdorigin=ondc - Refused to apply style from 'https://site-cdn.onenote.net/?404&public=1' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.",
                "timestamp": 1521101255638,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/?public=1&wdorigin=ondcauth2&wdorigin=ondc 568 A parser-blocking, cross site (i.e. different eTLD+1) script, https://c.microsoft.com/ms.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1521101256051,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/?public=1&wdorigin=ondcauth2&wdorigin=ondc 568 A parser-blocking, cross site (i.e. different eTLD+1) script, https://c.microsoft.com/ms.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1521101256051,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/?public=1&wdorigin=ondcauth2&wdorigin=ondc - Failed to decode downloaded font: https://www.onenote.com/segoeuil.woff",
                "timestamp": 1521101256057,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/?public=1&wdorigin=ondcauth2&wdorigin=ondc - OTS parsing error: invalid version tag",
                "timestamp": 1521101256057,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://site-cdn.onenote.net/1692131562_Scripts/home.js 0:6762 Uncaught TypeError: Cannot read property 'style' of null",
                "timestamp": 1521101258209,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/hrd 277 A parser-blocking, cross site (i.e. different eTLD+1) script, https://c.microsoft.com/ms.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1521101258541,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/hrd 277 A parser-blocking, cross site (i.e. different eTLD+1) script, https://c.microsoft.com/ms.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1521101258541,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/notebooks?wdorigin=ondchrd&auth=2&nf=1 15081 A parser-blocking, cross site (i.e. different eTLD+1) script, https://c.microsoft.com/ms.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1521101287155,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.onenote.com/notebooks?wdorigin=ondchrd&auth=2&nf=1 15081 A parser-blocking, cross site (i.e. different eTLD+1) script, https://c.microsoft.com/ms.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1521101287156,
                "type": ""
            }
        ],
        "screenShotFile": "00080060-009b-00e9-00b1-009f007c00c8.png",
        "timestamp": null,
        "duration": null
    },
    {
        "description": "should open onenote online|Classnotebook Demo App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 4116,
        "browser": {
            "name": "chrome",
            "version": "65.0.3325.162"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ef00f4-002e-00c7-00cd-0088007c0080.png",
        "timestamp": null,
        "duration": null
    },
    {
        "description": "Should open Immesive office launcher|Classnotebook Demo App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 4116,
        "browser": {
            "name": "chrome",
            "version": "65.0.3325.162"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://c1-onenote-15.cdn.office.net/o/s/1692091726_App_Scripts/OsfRuntimeOneNoteWAC.js 11 Error while parsing the 'sandbox' attribute: 'ms-allow-popups' is an invalid sandbox flag.",
                "timestamp": 1521101305872,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://c1-onenote-15.cdn.office.net/o/s/1692091726_App_Scripts/OsfRuntimeOneNoteWAC.js 11 Error while parsing the 'sandbox' attribute: 'ms-allow-popups' is an invalid sandbox flag.",
                "timestamp": 1521101306012,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312249,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312249,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312250,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312250,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312250,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312250,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312251,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312251,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312251,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312252,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312252,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312252,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312253,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312253,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312254,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312254,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312254,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312255,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312255,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312256,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312256,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312256,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312257,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312257,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312258,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312258,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312258,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312258,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312259,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312259,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312259,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312259,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312259,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312260,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312260,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312260,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312261,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312262,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312262,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312263,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312263,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312263,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312264,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312264,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312265,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312265,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312265,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312266,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312266,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312266,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312266,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312266,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312267,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312267,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312267,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312267,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312267,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312268,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312268,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312268,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312268,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312269,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312269,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://contentstorage.osi.office.net/scripts/1610b01d4fec8297.js 92:24202 \"whoops, illegal rule inserted\"",
                "timestamp": 1521101312269,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://onenote.officeapps.live.com/o/RoamingServiceHandler.ashx?action=getONOWhatsNew&WOPIsrc=https%3A%2F%2Fcontososdorg%2Esharepoint%2Ecom%2Fsites%2FTestAgaveV22401%2F%5Fvti%5Fbin%2Fwopi%2Eashx%2Ffolders%2Fe6174ddd09df4d9b93a6d6843d22619c&access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1CeGNCMklNMGE3Z1RRRFI3YjFuLTMzQU82NCJ9%2EeyJhdWQiOiJ3b3BpL2NvbnRvc29zZG9yZy5zaGFyZXBvaW50LmNvbUBiNjMzOGM5Mi01MzNlLTRmNmQtYTMyNy05OTQyNjM3MTIzOTkiLCJpc3MiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDBAOTAxNDAxMjItODUxNi0xMWUxLThlZmYtNDkzMDQ5MjQwMTliIiwibmJmIjoiMTUyMTEwMTMwMSIsImV4cCI6IjE1MjExMzczMDEiLCJuYW1laWQiOiIwIy5mfG1lbWJlcnNoaXB8dC1zaHdzaGFAY29udG9zb3NkLm9yZyIsIm5paSI6Im1pY3Jvc29mdC5zaGFyZXBvaW50IiwiaXN1c2VyIjoidHJ1ZSIsImNhY2hla2V5IjoiMGguZnxtZW1iZXJzaGlwfDEwMDMwMDAwYTYxYTkyYzNAbGl2ZS5jb20iLCJzaWduaW5fc3RhdGUiOiJbXCJrbXNpXCJdIiwiaXNsb29wYmFjayI6IlRydWUiLCJhcHBjdHgiOiJlNjE3NGRkZDA5ZGY0ZDliOTNhNmQ2ODQzZDIyNjE5Yzt2WGptRmVFamxzanhNMVp5MzFPZkVWaUpBRTA9O0RlZmF1bHQ7OzdGRkZGRkZGRkZGQkZGRkY7VHJ1ZTs7OzAifQ%2EvLs7y3OPybrlPUSaaL7JVvKpHdF%5Fi9O9iwl4DPzpw30FDoC2%5FJjCFn7Y%5F9sjq62LI8vBZBENU5xdnmyFPQVszdkwxG48fQh3FHH0rQx3lUr0ccEbVb3Em%2D7GNtv5mKA717IojE4iKqXGMKLpxI1XGHFQ%2DUR0W4q9sB5yHENIZOg4aqJet7%5FoN2lf6YrAGCnSw1TITEy96mdzvxCHCN5MvQkzsvjuGtZnngbWoUAOHSlV2kWiKy44zYge2M1Aw8Fl8ZnrqOTLztA75aBVIy3jRHlHvuxmIrmaQ99JFe1L%5FfEdA5rZGQGjC7s2wAxTk2dek99vEnRIW9O99Wm96Ocwkw&access_token_ttl=1521137301622 - Failed to load resource: the server responded with a status of 412 ()",
                "timestamp": 1521101312269,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.onenote.net/officeaddins/1692131562_Scripts/CommonDiagnostics.js 1 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1521101312269,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://onenote.officeapps.live.com/o/RoamingServiceHandler.ashx?action=getOneNoteOnlineUserSettings&requestedsettings=ShareButtonLastSeen&WOPIsrc=https%3A%2F%2Fcontososdorg%2Esharepoint%2Ecom%2Fsites%2FTestAgaveV22401%2F%5Fvti%5Fbin%2Fwopi%2Eashx%2Ffolders%2Fe6174ddd09df4d9b93a6d6843d22619c&access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1CeGNCMklNMGE3Z1RRRFI3YjFuLTMzQU82NCJ9%2EeyJhdWQiOiJ3b3BpL2NvbnRvc29zZG9yZy5zaGFyZXBvaW50LmNvbUBiNjMzOGM5Mi01MzNlLTRmNmQtYTMyNy05OTQyNjM3MTIzOTkiLCJpc3MiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDBAOTAxNDAxMjItODUxNi0xMWUxLThlZmYtNDkzMDQ5MjQwMTliIiwibmJmIjoiMTUyMTEwMTMwMSIsImV4cCI6IjE1MjExMzczMDEiLCJuYW1laWQiOiIwIy5mfG1lbWJlcnNoaXB8dC1zaHdzaGFAY29udG9zb3NkLm9yZyIsIm5paSI6Im1pY3Jvc29mdC5zaGFyZXBvaW50IiwiaXN1c2VyIjoidHJ1ZSIsImNhY2hla2V5IjoiMGguZnxtZW1iZXJzaGlwfDEwMDMwMDAwYTYxYTkyYzNAbGl2ZS5jb20iLCJzaWduaW5fc3RhdGUiOiJbXCJrbXNpXCJdIiwiaXNsb29wYmFjayI6IlRydWUiLCJhcHBjdHgiOiJlNjE3NGRkZDA5ZGY0ZDliOTNhNmQ2ODQzZDIyNjE5Yzt2WGptRmVFamxzanhNMVp5MzFPZkVWaUpBRTA9O0RlZmF1bHQ7OzdGRkZGRkZGRkZGQkZGRkY7VHJ1ZTs7OzAifQ%2EvLs7y3OPybrlPUSaaL7JVvKpHdF%5Fi9O9iwl4DPzpw30FDoC2%5FJjCFn7Y%5F9sjq62LI8vBZBENU5xdnmyFPQVszdkwxG48fQh3FHH0rQx3lUr0ccEbVb3Em%2D7GNtv5mKA717IojE4iKqXGMKLpxI1XGHFQ%2DUR0W4q9sB5yHENIZOg4aqJet7%5FoN2lf6YrAGCnSw1TITEy96mdzvxCHCN5MvQkzsvjuGtZnngbWoUAOHSlV2kWiKy44zYge2M1Aw8Fl8ZnrqOTLztA75aBVIy3jRHlHvuxmIrmaQ99JFe1L%5FfEdA5rZGQGjC7s2wAxTk2dek99vEnRIW9O99Wm96Ocwkw&access_token_ttl=1521137301622 - Failed to load resource: the server responded with a status of 412 ()",
                "timestamp": 1521101312269,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://onenote.officeapps.live.com/o/RoamingServiceHandler.ashx?action=getOfficeOnlineFeatureSettings&requestedsettings=BookmarkCalloutOneNote&WOPIsrc=https%3A%2F%2Fcontososdorg%2Esharepoint%2Ecom%2Fsites%2FTestAgaveV22401%2F%5Fvti%5Fbin%2Fwopi%2Eashx%2Ffolders%2Fe6174ddd09df4d9b93a6d6843d22619c&access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1CeGNCMklNMGE3Z1RRRFI3YjFuLTMzQU82NCJ9%2EeyJhdWQiOiJ3b3BpL2NvbnRvc29zZG9yZy5zaGFyZXBvaW50LmNvbUBiNjMzOGM5Mi01MzNlLTRmNmQtYTMyNy05OTQyNjM3MTIzOTkiLCJpc3MiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDBAOTAxNDAxMjItODUxNi0xMWUxLThlZmYtNDkzMDQ5MjQwMTliIiwibmJmIjoiMTUyMTEwMTMwMSIsImV4cCI6IjE1MjExMzczMDEiLCJuYW1laWQiOiIwIy5mfG1lbWJlcnNoaXB8dC1zaHdzaGFAY29udG9zb3NkLm9yZyIsIm5paSI6Im1pY3Jvc29mdC5zaGFyZXBvaW50IiwiaXN1c2VyIjoidHJ1ZSIsImNhY2hla2V5IjoiMGguZnxtZW1iZXJzaGlwfDEwMDMwMDAwYTYxYTkyYzNAbGl2ZS5jb20iLCJzaWduaW5fc3RhdGUiOiJbXCJrbXNpXCJdIiwiaXNsb29wYmFjayI6IlRydWUiLCJhcHBjdHgiOiJlNjE3NGRkZDA5ZGY0ZDliOTNhNmQ2ODQzZDIyNjE5Yzt2WGptRmVFamxzanhNMVp5MzFPZkVWaUpBRTA9O0RlZmF1bHQ7OzdGRkZGRkZGRkZGQkZGRkY7VHJ1ZTs7OzAifQ%2EvLs7y3OPybrlPUSaaL7JVvKpHdF%5Fi9O9iwl4DPzpw30FDoC2%5FJjCFn7Y%5F9sjq62LI8vBZBENU5xdnmyFPQVszdkwxG48fQh3FHH0rQx3lUr0ccEbVb3Em%2D7GNtv5mKA717IojE4iKqXGMKLpxI1XGHFQ%2DUR0W4q9sB5yHENIZOg4aqJet7%5FoN2lf6YrAGCnSw1TITEy96mdzvxCHCN5MvQkzsvjuGtZnngbWoUAOHSlV2kWiKy44zYge2M1Aw8Fl8ZnrqOTLztA75aBVIy3jRHlHvuxmIrmaQ99JFe1L%5FfEdA5rZGQGjC7s2wAxTk2dek99vEnRIW9O99Wm96Ocwkw&access_token_ttl=1521137301622 - Failed to load resource: the server responded with a status of 412 ()",
                "timestamp": 1521101312269,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://c1-onenote-15.cdn.office.net/o/s/1692091726_App_Scripts/OsfRuntimeOneNoteWAC.js 11 Error while parsing the 'sandbox' attribute: 'ms-allow-popups' is an invalid sandbox flag.",
                "timestamp": 1521101313123,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.onenote.net/learningtoolsapp/1692121550_Scripts/vendor.min.js 0:221344 \"t(t){var n=e.call(this,t)||this;n._warnDeprecations({ignoreExternalFocusing:\\\"focusTrapZoneProps\\\",forceFocusInsideTrap:\\\"focusTrapZoneProps\\\",firstFocusableSelector:\\\"focusTrapZoneProps\\\"});n.state={isFooterSticky:!1,isOpen:!1,isAnimating:!1,id:i.getId property 'firstFocusableSelector' was used but has been deprecated. Use 'focusTrapZoneProps' instead.\"",
                "timestamp": 1521101325154,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.onenote.net/learningtoolsapp/1692121550_Scripts/vendor.min.js 0:221344 \"t(t){var n=e.call(this,t)||this;n._getSubTextId=function(){var e=n.props,t=e.ariaDescribedById,r=e.modalProps,o=e.dialogContentProps,i=e.subText,a=t||r&&r.subtitleAriaId;a||(a=(i||o&&o.subText)&&n._defaultSubTextId);return a};n._getTitleTextId=function(){var e=n.props,t=e.ariaLabelledById,r=e.modalProps,o=e.dialogContentProps,i=e.title,a=t||r&&r.titleAriaId;a||(a=(i||o&&o.title)&&n._defaultTitleTextId);return a};n._id=i.getId(\\\"Dialog\\\");n._defaultTitleTextId=n._id+\\\"-title\\\";n._defaultSubTextId=n._id+\\\"-subText\\\";n._warnDeprecations property 'isOpen' was used but has been deprecated. Use 'hidden' instead.\"",
                "timestamp": 1521101325154,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.onenote.net/learningtoolsapp/1692121550_Scripts/vendor.min.js 0:221344 \"t(t){var n=e.call(this,t)||this;n._getSubTextId=function(){var e=n.props,t=e.ariaDescribedById,r=e.modalProps,o=e.dialogContentProps,i=e.subText,a=t||r&&r.subtitleAriaId;a||(a=(i||o&&o.subText)&&n._defaultSubTextId);return a};n._getTitleTextId=function(){var e=n.props,t=e.ariaLabelledById,r=e.modalProps,o=e.dialogContentProps,i=e.title,a=t||r&&r.titleAriaId;a||(a=(i||o&&o.title)&&n._defaultTitleTextId);return a};n._id=i.getId(\\\"Dialog\\\");n._defaultTitleTextId=n._id+\\\"-title\\\";n._defaultSubTextId=n._id+\\\"-subText\\\";n._warnDeprecations property 'type' was used but has been deprecated. Use 'dialogContentProps.type' instead.\"",
                "timestamp": 1521101325154,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.onenote.net/learningtoolsapp/1692121550_Scripts/vendor.min.js 0:221344 \"t(t){var n=e.call(this,t)||this;n._getSubTextId=function(){var e=n.props,t=e.ariaDescribedById,r=e.modalProps,o=e.dialogContentProps,i=e.subText,a=t||r&&r.subtitleAriaId;a||(a=(i||o&&o.subText)&&n._defaultSubTextId);return a};n._getTitleTextId=function(){var e=n.props,t=e.ariaLabelledById,r=e.modalProps,o=e.dialogContentProps,i=e.title,a=t||r&&r.titleAriaId;a||(a=(i||o&&o.title)&&n._defaultTitleTextId);return a};n._id=i.getId(\\\"Dialog\\\");n._defaultTitleTextId=n._id+\\\"-title\\\";n._defaultSubTextId=n._id+\\\"-subText\\\";n._warnDeprecations property 'subText' was used but has been deprecated. Use 'dialogContentProps.subText' instead.\"",
                "timestamp": 1521101325154,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.onenote.net/learningtoolsapp/1692121550_Scripts/vendor.min.js 0:221344 \"t(t){var n=e.call(this,t)||this;n._getSubTextId=function(){var e=n.props,t=e.ariaDescribedById,r=e.modalProps,o=e.dialogContentProps,i=e.subText,a=t||r&&r.subtitleAriaId;a||(a=(i||o&&o.subText)&&n._defaultSubTextId);return a};n._getTitleTextId=function(){var e=n.props,t=e.ariaLabelledById,r=e.modalProps,o=e.dialogContentProps,i=e.title,a=t||r&&r.titleAriaId;a||(a=(i||o&&o.title)&&n._defaultTitleTextId);return a};n._id=i.getId(\\\"Dialog\\\");n._defaultTitleTextId=n._id+\\\"-title\\\";n._defaultSubTextId=n._id+\\\"-subText\\\";n._warnDeprecations property 'isBlocking' was used but has been deprecated. Use 'modalProps.isBlocking' instead.\"",
                "timestamp": 1521101325155,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.onenote.net/learningtoolsapp/1692121550_Scripts/vendor.min.js 0:221344 \"t(t){var n=e.call(this,t)||this;n._getSubTextId=function(){var e=n.props,t=e.ariaDescribedById,r=e.modalProps,o=e.dialogContentProps,i=e.subText,a=t||r&&r.subtitleAriaId;a||(a=(i||o&&o.subText)&&n._defaultSubTextId);return a};n._getTitleTextId=function(){var e=n.props,t=e.ariaLabelledById,r=e.modalProps,o=e.dialogContentProps,i=e.title,a=t||r&&r.titleAriaId;a||(a=(i||o&&o.title)&&n._defaultTitleTextId);return a};n._id=i.getId(\\\"Dialog\\\");n._defaultTitleTextId=n._id+\\\"-title\\\";n._defaultSubTextId=n._id+\\\"-subText\\\";n._warnDeprecations property 'containerClassName' was used but has been deprecated. Use 'modalProps.containerClassName' instead.\"",
                "timestamp": 1521101325155,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://cdn.onenote.net/learningtoolsapp/1692121550_Scripts/vendor.min.js 0:221344 \"t(t){var n=e.call(this,t)||this;n._getSubTextId=function(){var e=n.props,t=e.ariaDescribedById,r=e.modalProps,o=e.dialogContentProps,i=e.subText,a=t||r&&r.subtitleAriaId;a||(a=(i||o&&o.subText)&&n._defaultSubTextId);return a};n._getTitleTextId=function(){var e=n.props,t=e.ariaLabelledById,r=e.modalProps,o=e.dialogContentProps,i=e.title,a=t||r&&r.titleAriaId;a||(a=(i||o&&o.title)&&n._defaultTitleTextId);return a};n._id=i.getId(\\\"Dialog\\\");n._defaultTitleTextId=n._id+\\\"-title\\\";n._defaultSubTextId=n._id+\\\"-subText\\\";n._warnDeprecations property 'onLayerDidMount' was used but has been deprecated. Use 'modalProps.onLayerDidMount' instead.\"",
                "timestamp": 1521101325155,
                "type": ""
            }
        ],
        "screenShotFile": "00180030-00bb-0043-00c8-00ad00b60041.png",
        "timestamp": null,
        "duration": null
    },
    {
        "description": "should click play button on Immersive reader|Classnotebook Demo App",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 4116,
        "browser": {
            "name": "chrome",
            "version": "65.0.3325.162"
        },
        "message": "Failed: Wait timed out after 5000ms",
        "trace": "TimeoutError: Wait timed out after 5000ms\n    at WebDriverError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:27:5)\n    at TimeoutError (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:262:5)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:109:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at UserContext.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:80:13)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"should click play button on Immersive reader\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4448:26)\n    at QueueRunner.run (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4368:20)\n    at runNext (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4408:20)\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4415:13\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4323:9\n    at C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:60:2)\n    at addSpecsToSuite (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1152:25)\n    at Env.describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1117:7)\n    at describe (C:\\Users\\v-suthot\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4555:18)\n    at Object.<anonymous> (C:\\Tests\\TestReactjs\\spec.js:1:63)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)",
        "browserLogs": [],
        "screenShotFile": "005b00bc-00e6-00a2-0004-006b006900f2.png",
        "timestamp": null,
        "duration": null
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length-1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};