console.log(dataCongress.results[0].members);

const tableHouse = document.getElementById('house-data')
console.log(tableHouse)

function renderTableHouse(data){

    const header = `<thead>
            <tr class="text-center">
                <th>Number</th>
                <th>Senator</th>
                <th>Party</th>
                <th>State</th>
                <th>Years in Office</th>
                <th> % Votes w/ Party</th>
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
            <td> <a href=${members.url}>${members.last_name} ${members.first_name} ${members.middle_name}</a> </td> 
            <td> ${members.party} </td> 
            <td> ${members.state} </td>
            <td> ${members.seniority} </td>
            <td> ${members.votes_with_party_pct} </td>   
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