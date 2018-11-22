import $ from 'jquery'
import CONSTANTS from '../common/constants';

export default class Modal {
  element = null
  modalTpl = `
        <div class="modal-add-resource">
        <i class="icon-close modal-close-btn"></i>
        <div class="modal-content">
            <p>Seperate multiple resources name with commas</p>
            <p class="error">Please double check your input</p>
            <input type="text" class="resource-input" maxlength="40" placeholder="e.g. Chrome, Firefox">
            <div class="modal-footer">
                <div class="button primary submit-add">Add Resources</div>
                <div class="button secondary cancel-add">Cancel</div>
            </div>
        </div>
    </div>`
  errorElement = null
  resourceInput = null
  constructor() {
    const tempParent = document.createElement('div');
    tempParent.innerHTML = this.modalTpl.trim();
    this.element = tempParent.firstChild;
    this.errorElement = this.element.querySelector('.modal-content .error');
    this.resourceInput = this.element.querySelector('.modal-content .resource-input');

    this.BREAKPOINT_TABLET = CONSTANTS.BREAKPOINT_TABLET;
    this.MODAL_OFFSET_TOP = CONSTANTS.MODAL_OFFSET_TOP;
    this.MODAL_OFFSET_LEFT = CONSTANTS.MODAL_OFFSET_LEFT;
    this.INPUTFORMAT = CONSTANTS.MULTIPL_SOURCE_FORMATE;

    this.attachEvent();
  }
  attachEvent() {
    $.subscribe('addResource', (e, data) => {
      const currentAgent = data.target.closest('.agent-cell');
      const agentIdentity = currentAgent.getAttribute('data-agentid');
      const pos = this.calculatePos(data);
      this.showoModal(pos, agentIdentity);
    });
    $.subscribe('addResourceDone', () => {
      this.closeModal();
    });
    // this.element.on('click', '.modal-close-btn', () => {
    //   this.closeModal();
    // });
    // this.element.on('click', '.cancel-add', () => {
    //   this.closeModal();
    // });
    this.element.addEventListener('click',(event) => {
      if(event.target && event.target.classList.contains('modal-close-btn')){
        this.closeModal();
      }
    });
    this.element.addEventListener('click',(event)=>{
      if(event.target && event.target.classList.contains('cancel-add')){
        this.closeModal();
      }
    });
    // this.element.on('click', '.submit-add', (e) => {
    //   const resourceVal = $(e.target).closest('.modal-content').find('.resource-input').val();
    //   if (this.isSourceValid(resourceVal)) {
    //     $.publish('appendSource', resourceVal);
    //   } else {
    //     this.showModalError();
    //   }
    // });
    this.element.addEventListener('click',(event)=>{
      if(event.target && event.target.classList.contains('submit-add')){
        const resourceVal = event.target.closest('.modal-content').querySelector('.resource-input').value;
        if (this.isSourceValid(resourceVal)) {
          $.publish('appendSource', resourceVal);
        } else {
          this.showModalError();
        }
      }
    });
  }
  showModalError() {
    this.errorElement.style.display = 'block';
  }
  isSourceValid(inputVal) {
    if (inputVal !== '' && this.INPUTFORMAT.test(inputVal)) {
      return true;
    } else {
      return false;
    }
  }
  calculatePos(data) {
    const _x = data.clientX;
    const _y = data.clientY;
    const _windowScroll = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const _pos = {
      'position': 'absolute'
    }
    _pos['left'] = _x + this.MODAL_OFFSET_LEFT;
    _pos['top'] = _y + this.MODAL_OFFSET_TOP + _windowScroll;
    return _pos;
  }
  showoModal(position, bindId) {
    const windowWidth = window.innerWidth;
    const specifyStyle = {};
    if (windowWidth >= this.BREAKPOINT_TABLET) {
      specifyStyle['background-color'] = 'transparent';
    } else {
      position = {};
    }
    this.displayOverlay(specifyStyle);
    Object.assign(this.element.style, position);
    this.element.setAttribute('data-bindid', bindId)
    this.element.style.display = 'block';
  }
  closeModal() {
    this.element.removeAttribute('style');
    this.element.removeAttribute('data-bindid');
    this.element.style.display='none';
    this.resetModal();
    this.closeOverlay();
  }
  resetModal() {
    this.errorElement.style.display = 'none';
    this.resourceInput.value = '';
  }
  displayOverlay(style) {
    Object.assign(document.querySelector('.overlay'),style);
    document.querySelector('.overlay').style.display = 'block';
  }
  closeOverlay() {
     document.querySelector('.overlay').removeAttribute('style');
     document.querySelector('.overlay').style.display='none';
  }
  render() {
    return this.element;
  }
}