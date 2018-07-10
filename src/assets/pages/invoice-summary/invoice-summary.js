"use strict";
$(document).ready(function() {
    /*Bar chart*/
    var data1 = {
        labels: ['jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
            label: "Sales",
            backgroundColor: [
                'rgba(252, 97, 128,0.9)',
                'rgba(252, 97, 128,0.9)',
                'rgba(252, 97, 128,0.9)',
                'rgba(252, 97, 128,0.9)',
                'rgba(252, 97, 128,0.9)',
                'rgba(252, 97, 128,0.9)',
                'rgba(252, 97, 128,0.9)',
                'rgba(252, 97, 128,0.9)',
                'rgba(252, 97, 128,0.9)'
            ],

            data: [65, 59, 80, 81, 56, 55, 50, 45],
        }, {
            label: "Expense",
            backgroundColor: [
                'rgba(70, 128, 255,0.9)',
                'rgba(70, 128, 255,0.9)',
                'rgba(70, 128, 255,0.9)',
                'rgba(70, 128, 255,0.9)',
                'rgba(70, 128, 255,0.9)',
                'rgba(70, 128, 255,0.9)',
                'rgba(70, 128, 255,0.9)',
                'rgba(70, 128, 255,0.9)',
                'rgba(70, 128, 255,0.9)'
            ],

            data: [60, 69, 85, 91, 58, 50, 45, 45],
        }]
    };

    var bar = document.getElementById("barChart").getContext('2d');
    var myBarChart = new Chart(bar, {
        type: 'bar',
        data: data1,
        options: {
            barValueSpacing: 20
        }
    });
});
