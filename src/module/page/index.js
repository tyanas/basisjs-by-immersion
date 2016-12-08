var Node = require('basis.ui').Node;
var tabs = basis.require('basis.ui.tabs');

// borrowed from http://basisjs.com/basisjs/demo/defile/tabs.html

// Data source
var data = [
  { data: { title: 'tab4' }, groupId: 3, childNodes: [{ template: 'content 4' }] },
  { data: { title: 'tab1' }, groupId: 1, childNodes: [{ template: 'content 1' }] },
  { data: { title: 'tab6' }, groupId: 3, childNodes: [{ template: 'content 6' }] },
  { data: { title: 'tab5' }, groupId: 3, childNodes: [{ template: basis.string.repeat('content 5 ', 100) }] },
  { data: { title: 'tab3' }, groupId: 2, childNodes: [{ template: 'content 3' }], selected: true },
  { data: { title: 'tab2' }, groupId: 2, childNodes: [{ template: 'content 2' }], disabled: true },
  { data: { title: 'tab7' }, groupId: 3, childNodes: [{ template: 'content 7' }] }
];

// TabSheetControl
var content = new tabs.TabSheetControl({
  childNodes: data
});

module.exports = new Node({
  template: resource('./template/page.tmpl'),
  binding: {
    content: content
  }
});
