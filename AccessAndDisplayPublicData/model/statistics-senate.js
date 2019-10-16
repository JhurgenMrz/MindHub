var senate_stttcs = new Vue({
    el: '#senate-stttcs',
    data: {
        loading: true,
        members: [],
        party: [
            {
                name: 'democrats',
                number: 0,
                members: [],
                votes_with_party: 0
            },
            {
                name: 'republicans',
                number: 0,
                members: [],
                votes_with_party: 0
            },
            {
                name: 'independents',
                number: 0,
                members: [],
                votes_with_party: 0
            }
        ],
        least_engaged: [],  
        most_engaged: [],
        least_loyalty:[],
        most_loyalty: [],
        number_total: 0,
        avg_votes_with_party: 0
    }
})

FetchData('senate').then(data => {
    senate_stttcs.loading = false,
    senate_stttcs.members = data
    
    chargeTotalNumber(senate_stttcs.members, senate_stttcs)
    senate_stttcs.number_total = senate_stttcs.members.length
    senate_stttcs.party[0].votes_with_party = averageTotalVotes(senate_stttcs.party[0].members, senate_stttcs.party[0].number)
    senate_stttcs.party[1].votes_with_party = averageTotalVotes(senate_stttcs.party[1].members, senate_stttcs.party[1].number)
    senate_stttcs.party[2].votes_with_party = averageTotalVotes(senate_stttcs.party[2].members, senate_stttcs.party[2].number)
    senate_stttcs.avg_votes_with_party = round(((senate_stttcs.party[0].votes_with_party+senate_stttcs.party[1].votes_with_party+senate_stttcs.party[2].votes_with_party) / senate_stttcs.party.length),2)

    senate_stttcs.least_loyalty = votesAgainstParty(senate_stttcs.members,10)
    senate_stttcs.most_loyalty = votesWithParty(senate_stttcs.members, 10)

    senate_stttcs.least_engaged = leastEngaged(senate_stttcs.members, 10)
    senate_stttcs.most_engaged = mostEngaged(senate_stttcs.members, 10)


})


//Cargar Cantidad de Miembros
function chargeTotalNumber (data, obj) {
    data.map((members)=>{
        if(members.party === 'D'){
            obj.party[0].members.push(members)
        }
        if(members.party === 'R'){
            obj.party[1].members.push(members)
        }
        if(members.party === 'I'){
            obj.party[2].members.push(members)
        }
    })
        obj.party.map((party,i)=>{
            obj.party[i].number = obj.party[i].members.length
        })

}


//Funcion para redondear
function round(num, decimales = 2) {
    var signo = (num >= 0 ? 1 : -1);
    num = num * signo;
    if (decimales === 0) //con 0 decimales
        return signo * Math.round(num);
    // round(x * 10 ^ decimales)
    num = num.toString().split('e');
    num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
    // x * 10 ^ (-decimales)
    num = num.toString().split('e');
    return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
}

//Promedio de Votos con el partido
function averageTotalVotes (members, number) {
    let totalVotesWP = 0
    members.map((member)=>{
        totalVotesWP = totalVotesWP + member.votes_with_party_pct
    })
    
    return round((totalVotesWP / number),2)
}


// Array de Miembros Menos Leales
function votesAgainstParty(array, percent){
    let orderedMembers = array.sort(function(a,b){
        if(a.votes_against_party_pct < b.votes_against_party_pct){
            return 1
        }
        if(a.votes_against_party_pct > b.votes_against_party_pct){
            return -1
        }
        return 0
    })
    let quantityPersons = Math.round((percent*100)/(orderedMembers.length))
    let againstParty = []
    for(let i = 0; i < quantityPersons; i++){
        againstParty.push(orderedMembers[i])
    }
    return againstParty
}


//Array de Miembros mas leales a su Partido
function votesWithParty(array, percent){
    let orderedMembers = array.sort(function(a,b){
        if(a.votes_with_party_pct < b.votes_with_party_pct){
            return 1
        }
        if(a.votes_with_party_pct > b.votes_with_party_pct){
            return -1
        }
        return 0
    })
    let quantityPersons = Math.round((percent*100)/(orderedMembers.length))
    let withParty = []
    for(let i = 0; i < quantityPersons; i++){
        withParty.push(orderedMembers[i])
    }
    return withParty
}

//Nenos Asistencia/Compromiso
function leastEngaged(array, percent){
    let orderedMembers = array.sort((a,b)=>{
        if(a.missed_votes_pct < b.missed_votes_pct){
            return 1
        }
        if(a.missed_votes_pct > b.missed_votes_pct){
            return -1
        }
        return 0
    })
    let quantityPersons = Math.round((percent * orderedMembers.length) / 100 )
    let moreAbsent = []
    for(let i = 0; i < quantityPersons; i++){
        moreAbsent.push(orderedMembers[i])
    }
    return moreAbsent
}

//Mas Comprometidos/Asistencia
function mostEngaged(array, percent){
    let orderedMembers = array.sort(function(a,b){
        if(a.missed_votes_pct > b.missed_votes_pct){
            return 1
        }
        if(a.missed_votes_pct < b.missed_votes_pct){
            return -1
        }
        return 0
    })
    let quantityPersons = Math.round((percent * orderedMembers.length) / 100 )
    let lessAbsent = []
    for(let i = 0; i < quantityPersons; i++){
        lessAbsent.push(orderedMembers[i])
    }
    return lessAbsent
}


//////////////////////////////////
//     RENDER DE LAS TABLAS     //
//////////////////////////////////


// //Table Senate
// const attendanceSenate = document.getElementById('glance-senate')

// //render de fila del senado
// function renderRowSenate(statistics){
//     const arrayOfPartys = []
//     const rows = []
//     for(let i in statistics.party){
//         arrayOfPartys.push([statistics.party[i]])
//     }
//     rows.push(arrayOfPartys.map((el)=>(`<tr>
//         <td>${el[0].name}</td>
//         <td>${el[0].number}</td>
//         <td>${el[0].votes_with_party}</td>
//         </tr>
//         `
//     )).join(''))
//     return rows
    
// }
// //Render de la Tabla del Senado
// function renderTableAttendanceSenate(statistics){
//     const header = `<thead class="thead-dark">
//             <th>Party</th>
//             <th>N° of Reps</th>
//             <th> % Votes with Party</th>
//         </thead>
//     `
//     const Table = `${header}
//         <tbody class="text-uppercase">
//             ${renderRowSenate(statistics)}
//         </tbody>
//         <tfoot class="text-uppercase">
//             <td>Total</td>
//             <td>${statistics.number_total}</td>
//             <td>${statistics.total_votes_with_party}</td>
//         </tfoot>
//     `
//     return Table
// }

// attendanceSenate.innerHTML = renderTableAttendanceSenate(statistics)



// //Render Table Least Engaged
// //table
// if(document.getElementById('least-engaged-senate')){
//     const tableLeastEngagedSenate = document.getElementById('least-engaged-senate')
    
//     function renderRowLeastEngaged(statistics){
    
//         let rows = []
    
//         rows.push(statistics.least_engaged.map((el)=>{
//             return (`<tr>
//                     <td>${el.first_name}</td>
//                     <td>${el.missed_votes}</td>
//                     <td>${el.missed_votes_pct}</td>
//                 </tr>
//                 `
//             )
//         }).join(''))
    
//         return rows;
//     }
    
//     function renderTableLeastEngaged(statistics){
        // const header = `<thead class="thead-dark">
        //         <th>Name</th>
        //         <th>N° Missed Votes</th>
        //         <th>% Missed</th>
        //     </thead>
//         `
//         const table = `${header}
//             <tbody>
//                 ${renderRowLeastEngaged(statistics)}
//             </tbody>
    
//         `
    
//         return table
//     }
    
//     tableLeastEngagedSenate.innerHTML = renderTableLeastEngaged(statistics)
    
    
//     //Most Engaged
//         //table
//     const tableMostEngagedSenate = document.getElementById('most-engaged-senate')
    
//     function renderRowMostEngaged(statistics){
//         let rows = []
//         rows.push(statistics.most_engaged.map((el)=>{
//             return (`<tr>
//                     <td>${el.first_name}</td>
//                     <td>${el.missed_votes}</td>
//                     <td>${el.missed_votes_pct}</td>
//                 </tr>
//                 `
//             )
//         }).join(''))
    
//         return rows;
//     }
    
//     function renderTableMostEngaged (statistics){
        
//         const header = `<thead class="thead-dark">
//                 <th>Name</th>
//                 <th>N° Missed Votes</th>
//                 <th>% Missed</th>
//             </thead>
//         `
//         const table = `${header}
//             <tbody>
//                 ${renderRowMostEngaged(statistics)}
//             </tbody>
    
//         `
    
//         return table
//     }
    
//     tableMostEngagedSenate.innerHTML = renderTableMostEngaged(statistics)
    
// }


// //Party Loyalty

// if(document.getElementById('least-loyal-senate') && document.getElementById('most-loyal-senate')){
    
//     //Table Least Loyal
//     const tableLeastLoyalSenate =  document.getElementById('least-loyal-senate')
    
//     function renderRowLeastLoyal(statistics){
    
//         let rows = []
    
//         rows.push(statistics.least_loyalty.map((el)=>{
//             return (`<tr>
//                     <td>${el.first_name}</td>
//                     <td>${el.missed_votes}</td>
//                     <td>${el.missed_votes_pct}</td>
//                 </tr>
//                 `
//             )
//         }).join(''))
    
//         return rows;
//     }
    
//     function renderTableLeastLoyal(statistics){
//         const header = `<thead class="thead-dark">
//                 <th>Name</th>
//                 <th>N° Missed Votes</th>
//                 <th>% Missed</th>
//             </thead>
//         `
//         const table = `${header}
//             <tbody>
//                 ${renderRowLeastLoyal(statistics)}
//             </tbody>
    
//         `
    
//         return table
//     }
    
//     tableLeastLoyalSenate.innerHTML = renderTableLeastLoyal(statistics)


//     const tableMostLoyalSenate = document.getElementById('most-loyal-senate')

//     function renderRowMostLoyal(statistics){
    
//         let rows = []
    
//         rows.push(statistics.most_loyalty.map((el)=>{
//             return (`<tr>
//                     <td>${el.first_name}</td>
//                     <td>${el.missed_votes}</td>
//                     <td>${el.missed_votes_pct}</td>
//                 </tr>
//                 `
//             )
//         }).join(''))
    
//         return rows;
//     }
    
//     function renderTableMostLoyal(statistics){
//         const header = `<thead class="thead-dark">
//                 <th>Name</th>
//                 <th>N° Missed Votes</th>
//                 <th>% Missed</th>
//             </thead>
//         `
//         const table = `${header}
//             <tbody>
//                 ${renderRowMostLoyal(statistics)}
//             </tbody>
    
//         `
    
//         return table
//     }

//     tableMostLoyalSenate.innerHTML = renderTableMostLoyal(statistics)
// }   

