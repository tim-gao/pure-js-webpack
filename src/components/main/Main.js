import $ from 'jquery';

export default class Main {
  element = null
  maintpl =
    `<div class="right-container" data-level="agent">
            
                <div class="track-collection">
                    <div class="building-block">
                        <div class="subtitle">Building</div>
                        <i class="icon icon-cog"></i>
                        <div class="count">2</div>
                    </div>
                    <div class="idle-block">
                        <div class="subtitle">Idle</div>
                        <i class="icon icon-coffee"></i>
                        <div class="count">3</div>
                    </div>
                    <div class="summary">
                        <div class="smry-item">
                            <div class="smry-label">ALL</div>
                            <div class="smry-value all">10</div>
                        </div>
                        <div class="smry-item">
                            <div class="smry-label">PHYSICAL</div>
                            <div class="smry-value physical">8</div>
                        </div>
                        <div class="smry-item">
                            <div class="smry-label">VIRTUAL</div>
                            <div class="smry-value virtual">7</div>
                        </div>
                    </div>
                </div>
                
                <div class="track-utitity">
                    <div class="agent-tabs">
                        <div class="tab-menu active" data-tab-control="all">All</div>
                        <div class="tab-menu" data-tab-control="physical">Physical</div>
                        <div class="tab-menu" data-tab-control="virtual">Virtual</div>
                    </div>
                    <div class="search-bar">
                        <div class="search-box">
                            <i class="icon-search"></i>
                            <input type="text" class="search-input"></div>
                        <div class="layout-btn-group">
                            <i class="icon icon-th-card " data-layout-name="card"></i>
                            <i class="icon icon-th-list active" data-layout-name="list"></i>
                        </div>
                    </div>
                </div>
                <div class="track-container">
                    <div class="agent-tab-content is-active">
                        <div class="agent-list">
                            <!-- will render later ...-->
                        </div>
                    </div>
                </div>
            </div>`
  agentContainerEle = null
  buildingCount = null
  idleCount = null
  smryAll = null
  smryPhysical = null
  smryVirtual = null

  constructor() {
    const tempParent = document.createElement('div');
    tempParent.innerHTML = this.maintpl.trim();
    this.element = tempParent.firstChild;
    this.agentContainerEle = this.element.querySelector('.agent-list');
    this.buildingCount = this.element.querySelector('.building-block .count');
    this.idleCount = this.element.querySelector('.idle-block .count');
    this.smryAll = this.element.querySelector('.smry-value.all');
    this.smryPhysical = this.element.querySelector('.smry-value.physical');
    this.smryVirtual = this.element.querySelector('.smry-value.virtual');

    this._attachEvent();
  }
  sucessCallback(res) {
    this.agentContainerEle.innerHTML = this.generateAgents(res);
    this.updateCount();
  }
  generateAgents(data) {
    const arr = [];
    const cell = data.agentList;
    cell.forEach((agent) => {
      arr.push(
        ` <div class="agent-cell is-${agent.status}" data-env="${agent.env}"
                data-agentid="${agent.id}" data-isdeny="${agent.isDeny}">
                <div class="agent-image">
                    <img src="./images/${agent.imageName}" alt="">
                </div>
                <div class="agent-stuff">
                    <div class="agent-title">
                        <i class="icon icon-desktop"></i>
                        <div class="title">
                            ${agent.agentName}
                        </div>
                        <div class="status ${agent.status}">${agent.status}</div>
                    </div>
                    <div class="agent-info">
                        <div class="ip-address">
                            <i class="icon icon-info"></i>${agent.IP}
                        </div>
                        <div class="path">
                            <i class="icon icon-folder"></i>${agent.path}
                        </div>
                    </div>
                    <div class="agent-source-update ${agent.isDeny ? '' : 'expanded'}">
                        <i class="add-icon icon-plus"></i>
                        <div class="source-list">
                            <!-- <span>firefox <i class="icon-trash"></i></span> -->
                            ${(function(){
                                const sources = agent.sources;
                                let sources_tpl = '';
                                sources.forEach((source)=>{
                                     sources_tpl += `<span>${source}<i class="icon-trash"></i></span>`
                                })
                                return sources_tpl;
                            })()}
                        </div>
                    </div>
                    ${(function(){
                        if (agent.isDeny) {
                            return `<div class="agent-is-deny">
                            <div class="deny-btn">
                                <i class="icon-deny"></i> Deny
                            </div>
                        </div>`;
                        } else {
                            return '';
                        }
                    })()}
                </div>
            </div>`);
    });
    return arr.join('');
  }
  updateCount() {
    this.buildingCount.textContent = Array.prototype.filter.call(this.agentContainerEle.querySelectorAll('.agent-cell.is-building'),(item)=>{
      const style = window.getComputedStyle(item);
      return (style.visibility === 'visible')
    }).length;
    this.idleCount.textContent = Array.prototype.filter.call(this.agentContainerEle.querySelectorAll('.agent-cell.is-idle'),(item)=>{
      const style = window.getComputedStyle(item);
      return (style.visibility === 'visible')
    }).length;
    this.smryAll.textContent =this.agentContainerEle.querySelectorAll('.agent-cell').length;
    this.smryPhysical.textContent =this.agentContainerEle.querySelectorAll('.agent-cell[data-env="physical"]').length;
    this.smryVirtual.textContent =this.agentContainerEle.querySelectorAll('.agent-cell[data-env="virtual"]').length;
  }
  _attachEvent() {
    // to show grid view or list view
    // this.element.on('click', '.layout-btn-group .icon', this.toggerLayout);
    this.element.addEventListener('click',(event) =>{
      if(event.target.classList.contains('icon-th-card') || event.target.classList.contains('icon-th-list')) {
        this.toggerLayout(event.target);
      }
    });
    // this.element.on('click', '.add-icon.icon-plus', (e) => {
    //   $.publish('addResource', e);
    // });
    this.element.addEventListener('click',(event)=>{
      if(event.target && event.target.className === 'add-icon icon-plus'){
        $.publish('addResource', event);
      }
    });
    this.element.addEventListener('click',(event)=>{
      if(event.target && event.target.className === 'icon-trash'){
        event.target.closest('.source-list').removeChild(event.target.parentNode);
      }
    });
    $.subscribe('appendSource', (e, data) => {
      this.appendNewSource(e, data);
    });

    $.subscribe('dataIsReady', (e, data) => {
      this.sucessCallback(data);
    });
    // this.element.on('click', '.agent-tabs .tab-menu', (e) => {
    //   this.changeEnvTab(e)
    // });
    this.element.addEventListener('click',(event)=>{
      if(event.target && event.target.className === 'tab-menu'){
        this.changeEnvTab(event.target);
      }
    });
  }
  changeEnvTab(target) {
    const filter = target.getAttribute('data-tab-control');
    Array.prototype.forEach.call(target.parentNode.children, (item)=>{
      item.classList.remove('active');
    });
    // target.siblings().removeClass('active');
    // target.addClass('active');
    target.classList.add('active');

    this.filterAgent(filter);
    this.updateCount();
  }

  filterAgent(filter) {
    const agents = this.agentContainerEle.querySelectorAll('.agent-cell');
    if (filter === 'all') {
      Array.prototype.forEach.call(agents, (item)=>{
        item.style.display = 'flex';
      });
      return;
    }
    Array.prototype.map.call(agents, (v) =>{
       const item = v
      if (item.getAttribute('data-env') !== filter) {
        return item.style.display = 'none';
      } else {
        return item.style.display = 'flex';
      }
    });
    // agents.map((i, v) => {
    //   const item = $(v);
    //   if (item.attr('data-env') !== filter) {
    //     return item.hide();
    //   } else {
    //     return item.show();
    //   }
    // });
  }
  toggerLayout(target) {
    const  layoutName = target.getAttribute('data-layout-name'),
      agentContainre = document.querySelector('.agent-tab-content.is-active .agent-list');
    Array.prototype.forEach.call(target.parentNode.children, (item)=>{
      item.classList.remove('active');
    });
    // target.siblings().removeClass('active');
    target.classList.add('active');
    agentContainre.removeAttribute('data-layout');
    agentContainre.setAttribute('data-layout', layoutName + 'view');
  }
  appendNewSource(e, source) {
    const _data = source,
      _agentId = document.querySelector('.modal-add-resource').getAttribute('data-bindid'),
      sources = _data.split(',');
    let sourceListHtml = '';

    sources.forEach((source) => {
      sourceListHtml += `<span>${source}<i class="icon-trash"></i></span>`;
    });
    document.querySelector(`.agent-cell[data-agentid=${_agentId}]`).querySelector('.source-list')
      .innerHTML = sourceListHtml;
    $.publish('addResourceDone');
  }
  render() {
    return this.element;
  }
}