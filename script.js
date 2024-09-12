let losers = []; // Store losing teams

function selectWinner(selectedTeam, nextMatchId) {
    const match = selectedTeam.parentElement;
    const teams = match.querySelectorAll('.team');

    // quita seleccion
    teams.forEach(team => team.classList.remove('selected'));

    // Mmarca la seleccion
    selectedTeam.classList.add('selected');

    // avanza la seleccion
    advanceTeam(selectedTeam, nextMatchId);

    // graba losers
    if (match.dataset.phase === '1') {
        updateLosers(teams, selectedTeam);
        if (losers.length === 3) {
            updateLoserMatch();
        }
    }
}

function advanceTeam(selectedTeam, nextMatchId) {
    const nextMatch = document.getElementById(nextMatchId);
    if (nextMatch) {
        const nextRoundTeams = nextMatch.querySelectorAll('.team');

        // ajusta en el slot disponible
        for (let team of nextRoundTeams) {
            if (team.textContent === '?') {
                team.textContent = selectedTeam.textContent;
                team.onclick = () => selectWinner(team, nextMatch.dataset.next);
                break;
            }
        }
    }
}

function updateLosers(teams, selectedTeam) {
    teams.forEach(team => {
        if (!team.classList.contains('selected') && !losers.includes(team.textContent)) {
            losers.push(team.textContent); // Add losing team
        }
    });
    losers = losers.filter(loser => loser !== selectedTeam.textContent); // Remove winner from losers
}

function updateLoserMatch() {
    const loserMatch = document.getElementById('lucky');
    loserMatch.innerHTML = ''; // Clear current loser match display

    losers.forEach(loser => {
        const teamDiv = document.createElement('div');
        teamDiv.classList.add('team');
        teamDiv.textContent = loser;
        teamDiv.onclick = () => selectWinner(teamDiv, 'semi-2'); // Advance selected loser to semi-finals
        loserMatch.appendChild(teamDiv);
    });
}
