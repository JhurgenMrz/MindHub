var house_data = new Vue({
    el:'#house-data',
    data: {
        loading: true,
        members: []
    }
})

FetchData('house').then(data => {
    house_data.loading = false
    house_data.members = data
})