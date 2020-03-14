import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import { Component, mount, refresh } from './framework';
import ps from './PubSub';
import actions from './actions';
import {TodoItem, TodoListItem} from './TodoItem';
import api from './api';

const {section, div, ul, input, button} = hh(h);

export default class TodoList extends Component {

    items: TodoItem[] = [];

    loading: boolean = false;

    constructor(props: TodoItem[]) {
        super(props);
        ps.subscribe(actions.TODO_DATA_FETCHED, this.setData.bind(this));
        ps.subscribe(actions.TODO_DATA_FETCHING, this.setLoading.bind(this));
    }

    setData (data: TodoItem[]) {
        this.items = data;
        this.loading = false;
        this.todoInput.value = null;
        refresh(this);
    }

    todoInput = input(
        { "autofocus": true },
        { "placeholder": "E.g. Go to the gym" },
        { "type": "text" }                
    );

    view () {
        var html =
            section(
                { "onclick": this.todoclick.bind(this) }, [                                
                div(
                    {"className": "input-area"}, [
                    this.todoInput,
                    button({ "data-event": "todo-item-add", "className": "btn-add" }, " + ")
                ]),
                this.loading ? div("Please wait a moment, loading your tasks...") :
                this.items.length > 0 ? ul({"className": "todo-list"}, [
                    this.items.map(function (item) {
                        return mount(TodoListItem, item);
                    })
                ]) : div("You have no tasks.  Use the text box to build your todo list.")
            ]);
        return html;
    };

    addTodoItem () {        
        var text = this.todoInput.value;

        var item: TodoItem = {
            name: text,
            isComplete: false,
            id: Date.now().toString()
        }

        api.insert(item);
    }

    deleteTodoItem (id: string) {        
        api.delete(id);
    }

    todoclick (event: Event) {

        if (event.target == null) return;
        var node = event.target as HTMLInputElement;
        var ds = node.dataset;
        var action = ds.event;
        switch (action) {

            case 'todo-item-delete':
                var key = ds.key ? ds.key : "";
                this.deleteTodoItem(key);
                break;

            case 'todo-item-add':                
                this.addTodoItem();
                break;
        }
    }       

    setLoading (loading: boolean) {
        this.loading = loading;
        refresh(this);
    }
}
