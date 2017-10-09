// Third party libraries
import 'babel-polyfill';

// Internal modules
import Header from './modules/Header';
import Url from './modules/Url';

let run = function() {
  Header.init();
  Url.init();
}

if (document.readyState === "complete"
     || document.readyState === "loaded"
     || document.readyState === "interactive") {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run);
}
