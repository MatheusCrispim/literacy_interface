const BASE_PATH = 'http://localhost:9000/api';

export  class Service{

    constructor(){
        this.header = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtYXRoZXVzIiwicGFzc3dvcmQiOiIkMmIkMTIkenhZZjJycnZURmQwbUJ6WWplVlIuT0FQZFNKZnpxNW5YcEZOUHRhc3BsWnBaMGx0SWJpcEMiLCJlbWFpbCI6Im1nYzUyQGxpdmUuY29tIiwiZmlyc3ROYW1lIjoiTWF0aGV1cyIsImxhc3ROYW1lIjoiQ3Jpc3BpbSIsInBob3RvIjpudWxsLCJjcmVhdGVkQXQiOiIyMDE5LTA0LTE3VDEzOjI2OjU5LjIxN1oiLCJ1cGRhdGVkQXQiOiIyMDE5LTA0LTE3VDEzOjI2OjU5LjIxN1oiLCJpYXQiOjE1NTU1MTE4NzB9.5XNf2QH2MHZtIkIns5TAMOIuIYPeBigrIWTgKqjy_n4'
        });

        this.data = {};
    }

    //get request
    get = async (endpoint) => {
        let apiPath = BASE_PATH+endpoint;

        let rawResponse = await fetch(apiPath, {
            method: 'GET',
            headers: this.header,
        });
        
        let statusCode = await rawResponse.status;
        await Promise.resolve(rawResponse).then(response => response.json())
                                                    .then( result => { this.data = result});
    
        return {'status':statusCode, 'data':this.data};
    };

    
    //Post requestdata
    post = async (endpoint, value) => {
        let apiPath = BASE_PATH+endpoint;

        let rawResponse = await fetch(apiPath, {
            method: 'POST',
            headers: this.header,
            body: JSON.stringify(value),
        });
        
        let statusCode = await rawResponse.status;
        await Promise.resolve(rawResponse).then(response => response.json())
                                                        .then( result => { this.data = result});

        return {'status':statusCode, 'data':this.data};
    }; 
    

    //Put request
    update = async (endpoint, value) => {
        let apiPath = BASE_PATH+endpoint;

        let rawResponse = await fetch(apiPath, {
            method: 'PUT',
            headers: this.header,
            body: JSON.stringify(value),
        });
        
        let statusCode = await rawResponse.status;
        await Promise.resolve(rawResponse).then(response => response.json())
                                                        .then( result => { this.data = result});

        return {'status':statusCode, 'data':this.data};
    };


    //Delete request
    del = async (endpoint) => {
        let apiPath = BASE_PATH+endpoint;

        let rawResponse = await fetch(apiPath, {
            method: 'DELETE',
            headers: this.header,
        });
        
        let statusCode = await rawResponse.status;

        return {'status':statusCode};
    };

}
