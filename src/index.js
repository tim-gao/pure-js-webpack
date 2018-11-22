import $ from 'jquery';
import Container from './container/Containers';

const AppScss = require('./styles/index.scss'); // eslint-disable-line no-unused-vars

$(() => {
  //Regeister the event publish/subscribe method
  (function ($) {
    var o = $({});
    $.subscribe = function () {
      o.on.apply(o, arguments);
    };
    $.unsubscribe = function () {
      o.off.apply(o, arguments);
    };
    $.publish = function () {
      o.trigger.apply(o, arguments);
    };
  }($));
  new Container();
});