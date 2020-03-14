import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import { Component, mount, refresh } from './framework';
import api from './api'
import ps from './PubSub';
import actions from './actions';
import TodoList from './TodoList';
import ApiError from './Error';

const { main, div, h1} = hh(h);
   
// fetch items from server
document.addEventListener("DOMContentLoaded", function(event) {    
    api.get();
});


var app: HTMLElement = 
    main([
        div({"className": "container"}, [
            h1({"className": "app-title"}, "todos"),
            mount(ApiError, null),
            mount(TodoList, null)
        ])                       
    ]);

ps.publish(actions.TODO_DATA_FETCHING, {"loading": true})    

var placeholder = document.getElementById("app");
placeholder && placeholder.appendChild(app);



