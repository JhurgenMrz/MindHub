var senate_stttcs = new Vue({
  el: "#senate-stttcs",
  data: {
    loading: true,
    members: [],
    party: [
      {
        name: "democrats",
        number: 0,
        members: [],
        votes_with_party: 0
      },
      {
        name: "republicans",
        number: 0,
        members: [],
        votes_with_party: 0
      },
      {
        name: "independents",
        number: 0,
        members: [],
        votes_with_party: 0
    }
    ],
    least_engaged: [],
    most_engaged: [],
    least_loyalty: [],
    most_loyalty: [],
    number_total: 0,
    avg_votes_with_party: 0
  }
});

FetchData("senate").then(data => {
  senate_stttcs.members = data;

  chargeTotalNumber(senate_stttcs.members, senate_stttcs);
  senate_stttcs.number_total = senate_stttcs.members.length;
  senate_stttcs.party[0].votes_with_party = averageTotalVotes(
    senate_stttcs.party[0].members,
    senate_stttcs.party[0].number
  );
  senate_stttcs.party[1].votes_with_party = averageTotalVotes(
    senate_stttcs.party[1].members,
    senate_stttcs.party[1].number
  );
  senate_stttcs.party[2].votes_with_party = averageTotalVotes(
    senate_stttcs.party[2].members,
    senate_stttcs.party[2].number
  );
  senate_stttcs.avg_votes_with_party = round(
    (senate_stttcs.party[0].votes_with_party +
      senate_stttcs.party[1].votes_with_party +
      senate_stttcs.party[2].votes_with_party) /
      senate_stttcs.party.length,
    2
  );

  senate_stttcs.least_loyalty = votesAgainstParty(senate_stttcs.members, 10);
  senate_stttcs.most_loyalty = votesWithParty(senate_stttcs.members, 10);

  senate_stttcs.least_engaged = leastEngaged(senate_stttcs.members, 10);
  senate_stttcs.most_engaged = mostEngaged(senate_stttcs.members, 10);

  senate_stttcs.loading = false;
});

//Cargar Cantidad de Miembros
function chargeTotalNumber(data, obj) {
  data.map(members => {
    if (members.party === "D") {
      obj.party[0].members.push(members);
    }
    if (members.party === "R") {
      obj.party[1].members.push(members);
    }
    if (members.party === "I") {
      obj.party[2].members.push(members);
    }
  });
  obj.party.map((party, i) => {
    obj.party[i].number = obj.party[i].members.length;
  });
}

//Funcion para redondear
function round(num, decimales = 2) {
  var signo = num >= 0 ? 1 : -1;
  num = num * signo;
  if (decimales === 0)
    //con 0 decimales
    return signo * Math.round(num);
  // round(x * 10 ^ decimales)
  num = num.toString().split("e");
  num = Math.round(
    +(num[0] + "e" + (num[1] ? +num[1] + decimales : decimales))
  );
  // x * 10 ^ (-decimales)
  num = num.toString().split("e");
  return signo * (num[0] + "e" + (num[1] ? +num[1] - decimales : -decimales));
}

//Funcion para sacar el porcentaje
function percentage(total, percent) {
  return round((percent * total) / 100, 2);
}
function percentage(total, percent, number) {
  return round((percent * total) / 100, number);
}

//Promedio de Votos con el partido
function averageTotalVotes(members, number) {
  let totalVotesWP = 0;
  members.map(member => {
    totalVotesWP = totalVotesWP + member.votes_with_party_pct;
  });

  return round(totalVotesWP / number, 2);
}

// Array de Miembros Menos Leales
function votesAgainstParty(array, percent) {
  let orderedMembers = array.sort(function(a, b) {
    if (a.votes_against_party_pct < b.votes_against_party_pct) {
      return 1;
    }
    if (a.votes_against_party_pct > b.votes_against_party_pct) {
      return -1;
    }
    return 0;
  });
  let quantityPersons = percentage(orderedMembers.length, percent);
  let againstParty = [];
  for (let i = 0; i < quantityPersons; i++) {
    let total_votes =
      orderedMembers[i].total_votes - orderedMembers[i].missed_votes;
    orderedMembers[i].votes_with_party = percentage(
      total_votes,
      orderedMembers[i].votes_with_party_pct,
      0
    );
    againstParty.push(orderedMembers[i]);
  }
  return againstParty;
}

//Array de Miembros Máss leales a su Partido
function votesWithParty(array, percent) {
  let orderedMembers = array.sort(function(a, b) {
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
      return 1;
    }
    if (a.votes_with_party_pct > b.votes_with_party_pct) {
      return -1;
    }
    return 0;
  });
  let quantityPersons = percentage(orderedMembers.length, percent);
  let withParty = [];
  for (let i = 0; i < quantityPersons; i++) {
    let total_votes =
      orderedMembers[i].total_votes - orderedMembers[i].missed_votes;
    orderedMembers[i].votes_with_party = percentage(
      total_votes,
      orderedMembers[i].votes_with_party_pct,
      0
    );
    withParty.push(orderedMembers[i]);
  }
  return withParty;
}

//Nenos Asistencia/Compromiso
function leastEngaged(array, percent) {
  let orderedMembers = array.sort((a, b) => {
    if (a.missed_votes_pct < b.missed_votes_pct) {
      return 1;
    }
    if (a.missed_votes_pct > b.missed_votes_pct) {
      return -1;
    }
    return 0;
  });
  let quantityPersons = percentage(orderedMembers.length, percent);
  let moreAbsent = [];
  for (let i = 0; i < quantityPersons; i++) {
    moreAbsent.push(orderedMembers[i]);
  }
  return moreAbsent;
}

//Mas Comprometidos/Asistencia
function mostEngaged(array, percent) {
  let orderedMembers = array.sort(function(a, b) {
    if (a.missed_votes_pct > b.missed_votes_pct) {
      return 1;
    }
    if (a.missed_votes_pct < b.missed_votes_pct) {
      return -1;
    }
    return 0;
  });
  let quantityPersons = percentage(orderedMembers.length, percent);
  let lessAbsent = [];
  for (let i = 0; i < quantityPersons; i++) {
    lessAbsent.push(orderedMembers[i]);
  }
  return lessAbsent;
}
