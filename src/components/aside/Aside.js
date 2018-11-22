import $ from 'jquery'

export default class Aside {
  element = null
  tpl = `<aside>
            <i class="icon-close close-aside-menu"></i>
            <div class="menu-tab">
                <div class="menu-item"><i class="icon-dashboard"></i> DASHBOARD</div>
                <div class="menu-item active"><i class="icon-sitemap"></i> AGENT</div>
                <div class="menu-item"><i class="icon-boat"></i> MY CRUISE</div>
                <div class="menu-item"><i class="icon-life-bouy"></i> HELP</div>
            </div>
            <div class="history-list">
                <div class="history-list-title">History</div>
                <ul>
                </ul>
            </div>
        </aside>`
  historyContent = null
  constructor() {
    let tempParentDiv = document.createElement('div');
    tempParentDiv.innerHTML = this.tpl.trim();
    this.element = tempParentDiv.firstChild;
    this.historyContent = this.element.querySelector('.history-list ul');
    this.attachEvent();
  }
  attachEvent() {
    // this.element.on('click', '.close-aside-menu', () => {
    //   this.closeLeftMenu()
    // });
    this.element.addEventListener('click', (event)=>{
      if(event.target && event.target.classList.contains('close-aside-menu')){
        this.closeLeftMenu();
      }
    });
    // this.element.on('click', '.menu-item', this.activeMenu);
    this.element.addEventListener('click',(event)=>{
      if(event.target && event.target.className  === 'menu-item'){
        this.activeMenu(event.target);
      }
    });
    $.subscribe('dataIsReady', (e, res) => {
      this.renderHistory(res);
    });
    $.subscribe('closeSideMenu', () => {
      this.closeLeftMenu();
    });
    $.subscribe('openSideMenu', () => {
      this.openLeftMenu();
    });
  }
  activeMenu(target) {
    Array.prototype.forEach.call(target.parentNode.children,(item)=>{
      item.classList.remove('active')
    })
    target.classList.add('active');
  }
  closeLeftMenu() {
    // this.element.css('margin-left', '');
    this.element.style.marginLeft = '';
    // $('.overlay').hide();
    document.getElementsByClassName('overlay')[0].style.display = 'none';
  }
  openLeftMenu() {
    // this.element.css('margin-left', '0');
    this.element.style.marginLeft = 0;
    // $('.overlay').show();
    document.getElementsByClassName('overlay')[0].style.display = 'block';
  }
  renderHistory(res) {
    const result = res.history;
    const his = [];
    if (Array.isArray(result) && result.length > 0) {
      result.forEach((item) => {
        his.push(`<li>${item.path}</li>`);
      });
    }
    this.historyContent.innerHTML = his.join('');
  }
  render() {
    return this.element;
  }
}