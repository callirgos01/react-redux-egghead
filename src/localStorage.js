export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        console.log('load ' + serializedState);
        if(serializedState === null) {
            return undefined;
        }
        let parseState = JSON.parse(serializedState);
        return parseState;
    }
    catch(err) {
        console.log(err);
        return undefined;
    }    
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
        console.log('save ' + serializedState); 
    }
    catch(err) {
        console.log(err);
        //ignore this error;
    }
}