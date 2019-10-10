console.log(dataCongress.results[0].members);

const tableHouse = document.getElementById('house-data')
console.log(tableHouse)

function renderTableHouse(data){

    const header = `<thead>
            <tr class="text-center">
                <th>Members</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Party</th>
                <th> Total Votes </th>
            </tr>
        </thead>
    `

    const rows = []
    rows.push(data.map((members,index)=>{
        if(!members.middle_name){
            members.middle_name = '||'
        }
        return `<tr>
            <td> #${index+1}</td>
            <td> <a href=${members.url}>${members.first_name}</a> </td> 
            <td> <a href=${members.url}>${members.middle_name}</a> </td> 
            <td> <a href=${members.url}>${members.last_name}</a> </td> 
            <td> ${members.party}</td>
            <td> ${members.total_votes} </td>   
        </tr>
        `
    }).join(''))
    console.log(rows)

    const Table =  `<thead class="text-center">
        ${header}    
    </thead>
    <tbody class="text-center">
        ${rows}
    </tbody>
    `

    return Table
}

tableHouse.innerHTML = renderTableHouse(dataCongress.results[0].members)