const data = {
    'European Union': 195514,
    'France': 80460,
    'United States': 57022,
    'China': 22165,
    'Other': 27862
};

const world = document.getElementById('world-graph').getContext('2d');

const worldChart = new Chart(world, {
    type: 'bar',
    data: {
        labels: Object.keys(data),
        datasets: [{
            label: 'Carbon footprint in KWh',
            data: Object.values(data),
        }, ],
    },
    options: {
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',  // Bar 1
            'rgba(54, 162, 235, 0.2)',  // Bar 2
            'rgba(255, 206, 86, 0.2)',  // Bar 3
            'rgba(75, 192, 192, 0.2)',  // Bar 4
            'rgba(153, 102, 255, 0.2)' // Bar 5
        ],
        borderWidth: 2,
        borderColor: 'black'
    }
});