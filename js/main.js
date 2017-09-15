// Third party libraries
import 'babel-polyfill';

// Internal modules
import Header from './modules/Header';

let run = function() {
  Header.init();
}

if (document.readyState === "complete"
     || document.readyState === "loaded"
     || document.readyState === "interactive") {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run);
}
