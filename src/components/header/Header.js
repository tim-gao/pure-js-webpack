import $ from 'jquery'

export default class Header {
  element = null
  tpl = `<header>
                <i class="icon-navicon"></i>
                <img src="./images/logo.svg" alt="" class="logo">
                <div class="profile">
                    <div class="profile-trigger">
                    <img src="./images/avatar.jpg" alt="user avatar" class="avatar">
                    <i class="icon-angle-down"></i></div>
                    <div class="profile-dropdown">
                    <div>
                    <i class="icon-id-card"></i>
                    <span>Profile</span>
                    </div>
                    <div><i class="icon-sign-in	"></i>
                    <span>Sign Out</span>
                    </div>
                </div>
                </div>
            </header>`
  profileDropdown = null
  constructor() {
    const tempParent = document.createElement('div');
    tempParent.innerHTML = this.tpl.trim();
    this.element = tempParent.firstChild;
    this.profileDropdown = this.element.querySelector('.profile-dropdown');
    this.attachEvent();
  }
  attachEvent() {
    // this.element.on('click', '.icon-navicon', this.openLeftMenu);
    this.element.addEventListener('click',(event)=>{
      if(event.target && event.target.classList.contains('icon-navicon')){
        this.openLeftMenu();
      }
    });
    // this.element.on('click', '.profile-trigger', () => {
    //   this.openProfileDropdown();
    // });
    this.element.addEventListener('click',(event)=>{
      if(event.target && event.target.classList.contains('profile-trigger')){
        this.openProfileDropdown();
      }
    });
  }
  openLeftMenu() {
    $.publish('openSideMenu');
  }
  openProfileDropdown() {
    this.profileDropdown.style.display = 'block';
  }
  render() {
    return this.element;
  }
}