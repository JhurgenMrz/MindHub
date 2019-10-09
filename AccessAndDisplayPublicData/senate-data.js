
// console.log(data.results[0].members);

function renderData(data){
    let header = `
        <thead>
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

    let row = [] 
    row.push(data.results[0].members.map((members,index)=> {
            if(!members.middle_name){
                members.middle_name = '||'
            }

        return (
            `<tr class="text-center">
                <td>#${index+1}</td>
                <td> <a href=${members.url}>${members.last_name} ${members.first_name} ${members.middle_name}</a> </td> 
                <td> ${members.party} </td> 
                <td> ${members.state} </td>
                <td> ${members.seniority} </td>
                <td> ${members.votes_with_party_pct} </td>
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
