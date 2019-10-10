const statistics = {
    democrats: {
        name: 'democrats',
        number: 0,
        members: [],
        votes_with_party: 0
    },
    republicans: {
        name: 'republicans',
        number: 0,
        members: [],
        votes_with_party: 0
    },
    independents: {
        name: 'independents',
        number: 0,
        members: [],
        votes_with_party: 0
    },
    least_engaged: [],  
    most_engaged: [],
    least_loyalty:[],
    most_loyalty: [],
}

function chargeTotalNumber (data, obj) {

    data.map((members)=>{
        if(members.party === 'D'){
            obj.democrats.members.push(members)
        }
        if(members.party === 'R'){
            obj.republicans.members.push(members)
        }
        if(members.party === 'I'){
            obj.independents.members.push(members)
        }
    })
        obj.democrats.number = obj.democrats.members.length
        obj.republicans.number = obj.republicans.members.length
        obj.independents.number = obj.independents.members.length
}

chargeTotalNumber(data.results[0].members, statistics)
statistics.number_total = (statistics.republicans.number+statistics.democrats.number+statistics.independents.number)

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


function averageTotalVotes (array, string, number) {
    let totalVotes = 0
    array.map((members)=>{
        if(members.party === string){
            totalVotes = totalVotes + members.votes_with_party_pct
            // console.log(members.votes_with_party_pct, '|||', totalVotes)
        }
    })
    // console.log(totalVotes, number)
    let average = (totalVotes) / (number)

    return round(average,2)
}

statistics.democrats.votes_with_party = averageTotalVotes(data.results[0].members, 'D', statistics.democrats.number)
statistics.republicans.votes_with_party = averageTotalVotes(data.results[0].members, 'R', statistics.republicans.number)
statistics.independents.votes_with_party = averageTotalVotes(data.results[0].members, 'I', statistics.independents.number)


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

statistics.least_loyalty = votesAgainstParty(data.results[0].members,10)


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

statistics.most_loyalty = votesWithParty(data.results[0].members, 10)

function leastEngaged(array, percent){
    let orderedMembers = array.sort(function(a,b){
        if(a.missed_votes_pct < b.missed_votes_pct){
            return 1
        }
        if(a.missed_votes_pct > b.missed_votes_pct){
            return -1
        }
        return 0
    })
    let quantityPersons = Math.round((percent*100)/(orderedMembers.length))
    let moreAbsent = []
    for(let i = 0; i < quantityPersons; i++){
        moreAbsent.push(orderedMembers[i])
    }
    return moreAbsent
}
statistics.least_engaged = leastEngaged(data.results[0].members, 10)

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
    let quantityPersons = Math.round((percent*100)/(orderedMembers.length))
    let lessAbsent = []
    for(let i = 0; i < quantityPersons; i++){
        lessAbsent.push(orderedMembers[i])
    }
    return lessAbsent
}

statistics.most_engaged = mostEngaged(data.results[0].members, 10)


const attendanceSenate = document.getElementById('glance-senate')

function renderRowSenate(statistics, party){
    const row = []

    statistics.party.map()
    
}

function renderTableAttendanceSenate(statistics){
    const table = []

    statistics.map((party)=>(
        `<tr>
            <td>${party.name}</td>
            <td>${party.number}</td>
            <td>${party.votes_with_party}</td>
        </tr>`
    ))
}




attendanceSenate.innerHTML = renderTableAttendanceSenate(statistics)