import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import { Component, mount, refresh } from './framework';
import ps from './PubSub';
import actions from './actions';

const {div} = hh(h);

export default class ApiError extends Component {

    error: Error | null = null;

    constructor (error: Error) {  
        super(error);      
        this.error = error;
        ps.subscribe(actions.API_ERROR, this.setError.bind(this));
        ps.subscribe(actions.TODO_DATA_FETCHED, this.setError.bind(this));
    }

    view () {
        return div({"className": "error"}, this.error ? "An error occured: ".concat(this.error.message) : "");
    }

    setError(err: any) {
        (err instanceof Error) ? this.error = err : this.error = null;
        refresh(this);
    }    

}