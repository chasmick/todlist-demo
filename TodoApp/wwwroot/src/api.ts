import ps from './PubSub';
import actions from './actions';
import { TodoItem } from './TodoItem';

type TodoItemForInsert = {
    name: string
    isComplete: boolean
}

class Api {
    
    uri: string = "/api/todoitems";

    get () {
        fetch(this.uri)
        .then((response) => { return response.json(); })
        .then((data) => { ps.publish(actions.TODO_DATA_FETCHED, data) })
        .catch(error => console.error('Unable to update item.', error));
    }
    
    insert(item: TodoItem) {
        var itemForInsert: TodoItemForInsert = {
            name: item.name,
            isComplete: item.isComplete
        }
        fetch(this.uri, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemForInsert)
          })
          .then(this.handleErrors)
          .then(response => response.json())            
          .then(() => {
              this.get();             
            })
            .catch(error => ps.publish(actions.API_ERROR, error));            
    }            

    update (item: TodoItem) {            
        fetch(this.uri.concat("/", item.id), {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
          })
          .then(this.handleErrors)         
          .then(() => this.get())
          .catch(error => ps.publish(actions.API_ERROR, error));        
    }

    delete (id: string) {
        fetch(this.uri.concat("/", id), {
            method: 'DELETE'
          })
          .then(this.handleErrors)           
          .then(() => this.get())
          .catch(error => ps.publish(actions.API_ERROR, error));         

    }

    handleErrors(response : Response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

}

export default new Api();