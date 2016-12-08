var Node = require('basis.ui').Node;
var tabs = basis.require('basis.ui.tabs');
var router = require('basis.router');
var Dataset = basis.require('basis.data').Dataset;
var DataObject = basis.require('basis.data').Object;
var Value = require('basis.data').Value;

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

var data2 = data.map(function(item) {
    return new DataObject({
        data: {
            selected: item.selected,
            disabled: item.disabled,
            title: item.data.title,
            groupId: item.groupId,
            content: item.childNodes[0].template
        }
    })
});

var dataSource = new Dataset({
    items: data2
});

var currentTab = new Value({ value: 'tab3' });

router.add(/^(tab[0-9])/, {
    match: function(tab) {
        currentTab.set(tab);
    }
});

// TabSheetControl
var content = new tabs.TabSheetControl({
    dataSource: dataSource,
    childClass: tabs.TabSheet.subclass({
        init: function() {
            tabs.TabSheet.prototype.init.call(this);
            this.disabled = this.data.disabled;
            this.setChildNodes([{ template: this.data.content }]);
        },
        selected: currentTab.compute(function(node, tab) {
            return node.data.title == tab;
        }),
        action: {
            select: function() {
                if (!this.isDisabled()) {
                    currentTab.set(this.data.title);
                    router.navigate(this.data.title);
                }
            }
        }
    })
});

module.exports = new Node({
    template: resource('./template/page.tmpl'),
    binding: {
        content: content
    }
});
