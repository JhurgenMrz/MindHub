
console.log(data.results[0].members);

function renderData(data){
    let header = `
        <tr>
            <th>Senator</th>
            <th>Party</th>
            <th>State</th>
            <th>Years in Office</th>
            <th> % Votes w/ Party</th>
        </tr>
    `
    let row = data.results[0].members.map((members)=> {
            if(!members.middle_name){
                members.middle_name = '||'
            }

        return (
            `<tr>
            <td> <a href=${members.url}>${members.last_name} ${members.first_name} ${members.middle_name}</a> </td> 
            <td> ${members.party} </td> 
            <td> ${members.state} </td>
            <td> ${members.seniority} </td>
            <td> ${members.votes_with_party_pct} </td>
            </tr>`
        )
    } 
       )

       const Table = header + row
    console.log(row);
    return Table
}

document.getElementById('senate-data').innerHTML = renderData(data)
