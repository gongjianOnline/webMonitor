import {injectJsError} from "./lib/jsError"
import injectXHR from "./lib/xhr"
import {blankScreen} from "./lib/blankScreen"
import timing from "./lib/timing"
import logTask from "./lib/logTask"
injectJsError();
injectXHR();
blankScreen()
timing()
logTask();