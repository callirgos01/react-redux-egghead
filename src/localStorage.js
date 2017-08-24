export const loadState = () => {
    try {
        //localStorage.clear();
        const serializedState = localStorage.getItem('state');
        if(serializedState === null) {
            return undefined;
        }
        let parseState = JSON.parse(serializedState);
        return parseState;
    }
    catch(err) {
        return undefined;
    }    
};

export const saveState = (state) => {
    try {
        //localStorage.clear();
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }
    catch(err) {
        //ignore this error;
    }
}