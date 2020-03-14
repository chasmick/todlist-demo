
export class Component {
    node: HTMLElement | null = null;
    
    constructor(props: any) {     
    }

    view() {
        return this.node;
    }

    refresh () {        
    }
}

export function mount(temp: typeof Component, props: any) {
    var o = new temp(props);
    var newNode = o.view();    
    if(!newNode) newNode = document.createElement('div');
    o.node && o.node.parentNode && o.node.parentNode.replaceChild(newNode, o.node);
    o.node = newNode;
    return o.node;
}

export function refresh(o: Component) {
    var newNode = o.view();    
    if(!newNode) newNode = document.createElement('div');
    o.node && o.node.parentNode && o.node.parentNode.replaceChild(newNode, o.node);
    o.node = newNode;
    return o.node;
}


