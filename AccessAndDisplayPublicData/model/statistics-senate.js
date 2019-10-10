const statistics = {
    democrats: {
        number: 0,
        votes_with_party: 0,
        members: []
    },
    republicans: {
        number: 0,
        votes_with_party: 0,  
        members: []

    },
    independents: {
        number: 0,
        votes_with_party: 0,
        members: []
    },
    number_of_democrats: 0,
    number_of_republicans: 0,
    number_of_independents: 0,
    number_total: 0,


}

function chargeTotalNumber (data, string, obj) {
    let result = []
    data.map((members)=>{
        if(members.party === string){
            result.push(members)
        }
        return 
    })
    if(string === 'D'){
        obj.number_of_democrats = result.length
        obj.democrats.members.push(result)
    }
    if(string === 'R'){
        obj.number_of_republicans = result.length
        obj.republicans.members.push(result)
    }
    if(string === 'I'){
        obj.number_of_independents = result.length
        obj.independents.members.push(result)
    }
}

chargeTotalNumber(data.results[0].members, 'R', statistics)
chargeTotalNumber(data.results[0].members, 'D', statistics)
chargeTotalNumber(data.results[0].members, 'I', statistics)
statistics.democrats.number = statistics.number_of_democrats
statistics.republicans.number = statistics.number_of_republicans
statistics.independents.number = statistics.number_of_independents
statistics.number_total = (statistics.number_of_republicans+statistics.number_of_democrats+statistics.number_of_independents)

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

statistics.democrats.votes_with_party = averageTotalVotes(data.results[0].members, 'D', statistics.number_of_democrats)
statistics.republicans.votes_with_party = averageTotalVotes(data.results[0].members, 'R', statistics.number_of_republicans)
statistics.independents.votes_with_party = averageTotalVotes(data.results[0].members, 'I', statistics.number_of_independents)



console.log(statistics)