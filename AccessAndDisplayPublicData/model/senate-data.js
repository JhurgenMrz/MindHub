
// console.log(data.results[0].members);

function renderData(data){
    let header = `
        <thead>
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

    let row = [] 
    row.push(data.results[0].members.map((members,index)=> {
            if(!members.middle_name){
                members.middle_name = '||'
            }

        return (
            `<tr class="text-center">
                <td> #${index+1}</td>
                <td> <a href=${members.url}>${members.first_name}</a> </td> 
                <td> <a href=${members.url}>${members.middle_name}</a> </td> 
                <td> <a href=${members.url}>${members.last_name}</a> </td> 
                <td> ${members.party}</td>
                <td> ${members.total_votes} </td> 
            </tr>`
        )
    }).join(''))

       const Table = `${header}
        <tbody>
            ${row}
        </tbody> 
       `
    console.log(row);
    return Table
}

document.getElementById('senate-data').innerHTML = renderData(data)
