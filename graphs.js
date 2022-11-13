const data = {
    'European Union': 195514,
    'France': 80460,
    'United States': 57022,
    'China': 22165,
    'Other': 27862
};

const months = {
    'January': 1000,
    'Febuary': 200,
    'March': 500,
    'April': 400,
    'May': 1500,
    'June': 200,
    'July': 400,
    'August': 3000,
    'September': 340,
    'October': 400,
    'November': 800,
    'December': 500
}

const months2 = {
    'January': 10001,
    'Febuary': 2001,
    'March': 5001,
    'April': 4001,
    'May': 15001,
    'June': 2001,
    'July': 4001,
    'August': 30001,
    'September': 3401,
    'October': 4001,
    'November': 8001,
    'December': 5001
}

const user = document.getElementById('user-graph').getContext('2d');
const region = document.getElementById('region-graph').getContext('2d');
const world = document.getElementById('world-graph').getContext('2d');

const userChart = new Chart(user, {
    type: 'line',
    data: {
        labels: Object.keys(months),
        datasets: [{
            label: 'Carbon footprint in KWh',
            data: Object.values(months),
        }, ],
    },
    options: {
        backgroundColor: [
            'rgba(198, 36, 144, 255)',  // Bar 1
            'rgba(54, 162, 235, 0.2)',  // Bar 2
            'rgba(255, 206, 86, 0.2)',  // Bar 3
            'rgba(75, 192, 192, 0.2)',  // Bar 4
            'rgba(153, 102, 255, 0.2)' // Bar 5
        ],
        borderWidth: 2,
        borderColor: 'black'
    }
});

const regionChart = new Chart(region, {
    type: 'line',
    data: {
        labels: Object.keys(months),
        datasets: [
        {
            label: 'user',
            data: Object.values(months),
        },
        {
            label: 'rest of the world',
            data: Object.values(months2),
        }
        ]
    },
    options: {
        backgroundColor: [
            'rgba(198, 36, 144, 255)',  // Bar 1
            'rgba(54, 162, 235, 0.2)',  // Bar 2
            'rgba(255, 206, 86, 0.2)',  // Bar 3
            'rgba(75, 192, 192, 0.2)',  // Bar 4
            'rgba(153, 102, 255, 0.2)' // Bar 5
        ],
        borderWidth: 2,
        borderColor: 'black'
    }
});

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
            'rgba(198, 36, 144, 255)',  // Bar 1
            'rgba(54, 162, 235, 0.2)',  // Bar 2
            'rgba(255, 206, 86, 0.2)',  // Bar 3
            'rgba(75, 192, 192, 0.2)',  // Bar 4
            'rgba(153, 102, 255, 0.2)' // Bar 5
        ],
        borderWidth: 2,
        borderColor: 'black'
    }
});