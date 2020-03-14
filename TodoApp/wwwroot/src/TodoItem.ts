import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import { Component, mount, refresh } from './framework';
import api from './api';

const {li, input, button, label} = hh(h);

export type TodoItem = {
    id: string,
    name: string,
    isComplete: boolean
}

export class TodoListItem extends Component {

    item: TodoItem;

    constructor (item: TodoItem) {
        super(item);
        this.item = item;      
    }

    view () {
        var item = this.item;
        var labelClass = this.item.isComplete ? "done": null;
        var inputClass = ["checkbox", this.item.isComplete ? "done" : null].join(" ");
        var checked = this.item.isComplete ? true : false;
        var html =
            li(
                {"className": "todo-item", "data-key": item.id }, [
                input({ "type": "checkbox", "data-event": "toggle-done", "data-key": item.id, 
                        "className": inputClass, "checked" : checked, onchange: this.toggle.bind(this) }),
                label({"className": labelClass}, item.name),
                button({ "data-event": "todo-item-delete", "data-key": item.id, "className": "btn-remove" }, " - ")
            ]);
        return html;
    };

    toggle (event: Event) {
        var node = event.target as HTMLInputElement;
        this.item.isComplete = node.checked;
        api.update(this.item);        
    }

}