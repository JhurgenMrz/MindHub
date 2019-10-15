// Ct3pF5LdEMVRPSUTK7U897agfhACfQlD98q7V3P8

const data = fetch('https://api.propublica.org/congress/v1/113/senate/members.json',{
    method: 'GET',
    headers: new Headers({
        'X-API-Key' : 'Ct3pF5LdEMVRPSUTK7U897agfhACfQlD98q7V3P8'
    })
})
.then((response)=> response.json())
.then(data => {
    return data
})
.catch(function(error){
    console.log(error.message);
})