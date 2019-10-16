function FetchData(congress){
    api_key ='Ct3pF5LdEMVRPSUTK7U897agfhACfQlD98q7V3P8'
    
    url = `https://api.propublica.org/congress/v1/113/${congress}/members.json`
   
    return fetch(url,{
        method: 'GET',
        headers: new Headers({
            'X-API-Key' : api_key
        })
    })
    .then( response => response.json())
    .then( data => {
        console.log(data.results[0].members)
        return data.results[0].members
    })
    .catch(error => error.message)
}