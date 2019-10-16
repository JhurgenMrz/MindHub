var senate_data = new Vue({
    el: '#senate-data',
    data:{
        loading: true,
        members: []
    }
})

FetchData('senate').then( data =>{
    senate_data.loading =  false
    senate_data.members = data
})
.catch(error => error)