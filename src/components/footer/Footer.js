export default class Footer {
  element = ''
  tpl = ` <footer>
      <span>&copy;Copyright 2018 ThoughtWorks</span>
    </footer>`
  constructor() {
    const tempParent = document.createElement('div');
    tempParent.innerHTML = this.tpl.trim();
    this.element = tempParent.firstChild;
  }
  render() {
    return this.element;
  }
}