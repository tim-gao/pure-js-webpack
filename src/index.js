import Container from './container/Containers';
const AppScss = require('./styles/index.scss'); // eslint-disable-line no-unused-vars
function init() {
  window.pubsub = (doc => {
    return {
      publish: (type, detail) => doc.dispatchEvent(
        new CustomEvent(type, {
          detail: detail
        })
      ),
      subscribe: (type, listener) => doc.addEventListener(
        type, listener, 0
      ),
      unsubscribe: (type, listener) => doc.removeEventListener(
        type, listener, 0
      )
    };
  })(document);
  new Container();
}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}