// script.js

document.addEventListener('DOMContentLoaded', function () {
    const csvDataPath = '/csv_data_path/'; // Replace with your actual CSV data path

    // Event listener for Team 1 selection
    $('#team1').change(function () {
        const selectedTeam = $(this).val();
        loadPlayersDropdown(selectedTeam, 'players_team1', 'players_team1_div');
    });

    // Event listener for Team 2 selection
    $('#team2').change(function () {
        const selectedTeam = $(this).val();
        loadPlayersDropdown(selectedTeam, 'players_team2', 'players_team2_div');
    });

    // Function to load players dynamically
    function loadPlayersDropdown(selectedTeam, dropdownId, dropdownDivId) {
        // Clear existing options
        $(`#${dropdownId}`).html('<option value="" disabled>Select Players</option>');

        if (selectedTeam) {
            // Use AJAX to load CSV data dynamically
            $.ajax({
                type: 'GET',
                url: `${csvDataPath}${selectedTeam}.csv`,
                dataType: 'text',
                success: function (data) {
                    // Parse CSV data
                    const players = data.split('\n').map(line => line.trim());

                    // Add options to the players dropdown
                    players.forEach(player => {
                        if (player) {
                            $(`#${dropdownId}`).append(`<option value="${player}">${player}</option>`);
                        }
                    });
                },
                error: function (error) {
                    console.error('Error loading players:', error);
                }
            });
        }

        // Show or hide the players dropdown div based on team selection
        $(`#${dropdownDivId}`).toggle(!!selectedTeam);
    }
});
