var senate_data = new Vue({
    el: '#senate-data',
    data:{
        members: []
    }
})

FetchData('senate').then( data =>{
    senate_data.members = data
})
.catch(error => error)