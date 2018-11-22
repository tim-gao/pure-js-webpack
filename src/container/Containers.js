import $ from 'jquery';
import Header from '../components/header/Header';
import Aside from '../components/aside/Aside';
import Main from '../components/main/Main';
import Modal from '../components/modal/Modal';
import Footer from '../components/footer/Footer';
import Service from '../service/CmsService';
import CONSANTS from '../components/common/constants';

export default class Containers {
  header = null
  aside = null
  main = null
  modal = null
  footer = null
  mainWrapper = document.querySelector('main');
  agentDetailUrl = '';

  constructor() {
    this.header = new Header();
    this.aside = new Aside();
    this.main = new Main();
    this.modal = new Modal();
    this.footer = new Footer();
    this.agentDetailUrl = CONSANTS.LOADAGENT_ENDPOINT;

    this.renderComponents();
    this.cruiseDetailFetch(this.agentDetailUrl); //ajax call to fetch detail data
  }
  cruiseDetailFetch(url) {
    new Service({
      'url': url,
      'type': 'GET',
      'success': (data) => {
        $.publish('dataIsReady', data);
      }
    });
  }
  renderComponents() {
    this.mainWrapper.appendChild(this.header.render());
    this.mainWrapper.appendChild(this.aside.render());
    this.mainWrapper.appendChild(this.main.render());
    this.mainWrapper.appendChild(this.modal.render());
    this.mainWrapper.appendChild(this.footer.render());
  }
}