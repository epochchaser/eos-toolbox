'use strict';
$(document).ready(function() {

    // chart js function start
    function amuntjs(a, b, f) {
        if (f == null) {
            f = "rgba(0,0,0,0)";
        }
        return {
            labels: ["1", "2", "3", "4", "5"],
            datasets: [{
                label: "",
                borderColor: a,
                borderWidth: 2,
                hitRadius: 30,
                pointHoverRadius: 4,
                pointBorderWidth: 50,
                pointHoverBorderWidth: 12,
                pointBackgroundColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                pointBorderColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                pointHoverBackgroundColor: a,
                pointHoverBorderColor: Chart.helpers.color("#000000").alpha(.1).rgbString(),
                fill: true,
                backgroundColor: f,
                data: b,
            }]
        };
    }
    function buildchartoption() {
        return {
            title: {
                display: !1
            },
            tooltips: {
                enabled: true,
                intersect: !1,
                mode: "nearest",
                xPadding: 10,
                yPadding: 10,
                caretPadding: 10
            },
            legend: {
                display: !1,
                labels: {
                    usePointStyle: !1
                }
            },
            responsive: !0,
            maintainAspectRatio: !0,
            hover: {
                mode: "index"
            },
            scales: {
                xAxes: [{
                    display: !1,
                    gridLines: !1,
                    scaleLabel: {
                        display: !0,
                        labelString: "Month"
                    }
                }],
                yAxes: [{
                    display: !1,
                    gridLines: !1,
                    scaleLabel: {
                        display: !0,
                        labelString: "Value"
                    },
                    ticks: {
                        beginAtZero: !0
                    }
                }]
            },
            elements: {
                point: {
                    radius: 4,
                    borderWidth: 12
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        };
    }
    // chart js function end

    // amunt card start
    var ctx = document.getElementById('amunt-card1').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: amuntjs('#fff', [40, 30, 45, 30, 35], '#fff'),
        options: buildchartoption(),
    });
    var ctx = document.getElementById('amunt-card2').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: amuntjs('#fff', [30, 35, 40, 30, 45], '#fff'),
        options: buildchartoption(),
    });
    var ctx = document.getElementById('amunt-card3').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: amuntjs('#fff', [45, 30, 40, 30, 35], '#fff'),
        options: buildchartoption(),
    });
    var ctx = document.getElementById('amunt-card4').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: amuntjs('#fff', [45, 30, 35, 40, 30], '#fff'),
        options: buildchartoption(),
    });
    // amunt card start

    // statustic start
    $(function() {
        var ctx = document.getElementById('Statistics-chart').getContext("2d");
        var greenline = ctx.createLinearGradient(500, 0, 100, 0);
        greenline.addColorStop(0, '#fd93a8');
        greenline.addColorStop(1, '#FC6180');
        var blueline = ctx.createLinearGradient(500, 0, 100, 0);
        blueline.addColorStop(1, '#56CCF2');
        blueline.addColorStop(0, '#2F80ED');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
                datasets: [{
                        label: "Data",
                        borderColor: blueline,
                        pointBorderColor: blueline,
                        pointBackgroundColor: blueline,
                        pointHoverBackgroundColor: blueline,
                        pointHoverBorderColor: blueline,
                        pointBorderWidth: 10,
                        pointHoverRadius: 10,
                        pointHoverBorderWidth: 1,
                        pointRadius: 0,
                        fill: false,
                        borderWidth: 4,
                        data: [20, 50, 30, 50, 20, 70, 30]
                    },
                    {
                        label: "Data",
                        borderColor: greenline,
                        pointBorderColor: greenline,
                        pointBackgroundColor: greenline,
                        pointHoverBackgroundColor: greenline,
                        pointHoverBorderColor: greenline,
                        pointBorderWidth: 10,
                        pointHoverRadius: 10,
                        pointHoverBorderWidth: 1,
                        pointRadius: 0,
                        fill: false,
                        borderWidth: 4,
                        data: [40, 30, 50, 15, 50, 50, 80]
                    }
                ]
            },
            options: {
                legend: {
                    position: "top"
                },
                tooltips: {
                    enabled: true,
                    intersect: !1,
                    mode: "nearest",
                    xPadding: 10,
                    yPadding: 10,
                    caretPadding: 10
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: true,
                            maxTicksLimit: 5,
                            padding: 20,
                        },
                        gridLines: {
                            drawTicks: false,
                            display: false
                        }

                    }],
                    xAxes: [{
                        gridLines: {
                            drawTicks: false,
                            display: false
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                }
            }
        });
    });
    // statustic end

    // process complition chart start
    var bar_ctx = document.getElementById('process-complience-chart').getContext('2d');
    var bar_gradient = bar_ctx.createLinearGradient(0, 0, 0, 600);
    bar_gradient.addColorStop(1, '#56CCF2');
    bar_gradient.addColorStop(0, '#4099ff');
    var bar_chart = new Chart(bar_ctx, {
        type: 'bar',
        data: {
            labels: ["", "2016", "2017", "2018", ""],
            datasets: [{
                label: '# of Votes',
                data: [0, 12, 19, 15],
                backgroundColor: bar_gradient,
                hoverBackgroundColor: bar_gradient,
                hoverBorderWidth: 0,
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false,
                        drawBorder: false
                    },
                    ticks: {
                        display: false,

                    },

                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }]
            }
        }
    });
    // process complition chart start

    // users statustic start
    var ctx = document.getElementById('user-chart1').getContext("2d");
    var gradientFill = ctx.createLinearGradient(0, 0, 0, 150);
    gradientFill.addColorStop(0, "rgba(70, 128, 255, 1");
    gradientFill.addColorStop(1, "rgba(70, 128, 255, 0.8");
    var myChart = new Chart(ctx, {
        type: 'line',
        height: '260',
        data: statusticjs('rgb(70, 128, 255)', [0, 30, 10, 45, 30, 55, 30, 30, 70, 90], gradientFill),
        options: statusticoption('rgba(70, 128, 255,0.8)')
    });
    var ctx = document.getElementById('user-chart2').getContext("2d");
    var gradientFill = ctx.createLinearGradient(0, 0, 0, 150);
    gradientFill.addColorStop(0, "rgba(147, 190, 82, 1");
    gradientFill.addColorStop(1, "rgba(147, 190, 82, 0.8");
    var myChart = new Chart(ctx, {
        type: 'line',
        height: '260',
        data: statusticjs('rgb(147, 190, 82)', [0, 30, 10, 45, 30, 55, 90, 30, 70, 90], gradientFill),
        options: statusticoption('rgba(147, 190, 82,0.8)')
    });
    var ctx = document.getElementById('user-chart3').getContext("2d");
    var gradientFill = ctx.createLinearGradient(0, 0, 0, 150);
    gradientFill.addColorStop(0, "rgba(255, 182, 77, 1");
    gradientFill.addColorStop(1, "rgba(255, 182, 77, 0.8");
    var myChart = new Chart(ctx, {
        type: 'line',
        height: '260',
        data: statusticjs('rgb(255, 182, 77)', [0, 30, 90, 45, 30, 90, 30, 30, 70, 90], gradientFill),
        options: statusticoption('rgba(255, 182, 77,0.8)')
    });
    function statusticjs(a, b, f) {
        if (f == null) {
            f = "rgba(0,0,0,0)";
        }
        return {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            datasets: [{
                label: "Data",
                borderColor: a,
                pointBorderColor: a,
                pointBackgroundColor: a,
                pointHoverBackgroundColor: a,
                pointHoverBorderColor: a,
                pointBorderWidth: 0,
                lineTension: 0,
                pointHoverRadius: 0,
                pointHoverBorderWidth: 0,
                pointRadius: 0,
                fill: true,
                backgroundColor: f,
                borderWidth: 2,
                data: b
            }]
        };
    }
    function statusticoption(t) {
        return {
            legend: {
                display: false
            },
            tooltips: {
                enabled: true,
                intersect: !1,
                mode: "nearest",
                backgroundColor: t,
                xPadding: 10,
                yPadding: 10,
                caretPadding: 10
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "rgba(0,0,0,0.5)",
                        fontStyle: "bold",
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        padding: 20
                    }
                }],
                xAxes: [{
                    gridLines: {
                        zeroLineColor: "transparent",
                        drawTicks: false,
                        display: false
                    },
                    ticks: {
                        padding: 20,
                        fontColor: "rgba(0,0,0,0.5)",
                        fontStyle: "bold"
                    }
                }]
            }
        };
    }
    // users statustic end

    // unique visitor start
    var map = AmCharts.makeChart("unique-visitor-chart", {
        "type": "map",
        "theme": "light",
        "hideCredits": true,
        "dragMap": false,
        "projection": "eckert3",

        "areasSettings": {
            "autoZoom": false,
            "rollOverOutlineColor": "#fff",
            "selectedColor": "#fff",
            "outlineAlpha": 1,
            "outlineColor": "transparent",
            "outlineThickness": 1,
            "color": "#000000"
        },
        "dataProvider": {
            "map": "continentsLow",
            "areas": [{
                "id": "africa",
                "title": "Africa",
                "pattern": {
                    "url": "../../../images/widget/map-bg.png",
                    "width": 4,
                    "height": 4
                }
            }, {
                "id": "asia",
                "title": "Asia",
                "pattern": {
                    "url": "../../../images/widget/map-bg.png",
                    "width": 4,
                    "height": 4
                }
            }, {
                "id": "australia",
                "title": "Australia",
                "pattern": {
                    "url": "../../../images/widget/map-bg.png",
                    "width": 4,
                    "height": 4,
                }
            }, {
                "id": "europe",
                "title": "Europe",
                "pattern": {
                    "url": "../../../images/widget/map-bg.png",
                    "width": 4,
                    "height": 4
                }
            }, {
                "id": "north_america",
                "title": "North America",
                "pattern": {
                    "url": "../../../images/widget/map-bg.png",
                    "width": 4,
                    "height": 4
                }
            }, {
                "id": "south_america",
                "title": "South America",
                "pattern": {
                    "url": "../../../images/widget/map-bg.png",
                    "width": 4,
                    "height": 4
                }
            }]
        },
        "zoomControl": {
            "panControlEnabled": false,
            "zoomControlEnabled": false,
            "homeButtonEnabled": false
        },
    });
    // unique visitor end

    // feedback chart start
    var ctx = document.getElementById("feedback-chart").getContext("2d");
    var config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    83, 17,
                ],
                backgroundColor: [
                    "#4099ff",
                    "#81c1fd"
                ],
                label: 'Dataset 1',
                borderWidth: 0
            }],
            labels: [
                "Positive",
                "Negative"
            ]
        },
        options: {
            responsive: true,
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: 'Chart.js Doughnut Chart'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };
    window.myDoughnut = new Chart(ctx, config);
    // feedback chart end

    // seo card start
    function seojs(a, b, f) {
        if (f == null) {
            f = "rgba(0,0,0,0)";
        }
        return {
            labels: ["1", "2", "3", "4", "5", "6", "7"],
            datasets: [{
                label: "",
                borderColor: a,
                borderWidth: 2,
                hitRadius: 0,
                pointHoverRadius: 0,
                pointRadius: 3,
                pointBorderWidth: 2,
                pointHoverBorderWidth: 12,
                pointBackgroundColor: Chart.helpers.color("#fff").alpha(1).rgbString(),
                pointBorderColor: Chart.helpers.color(a).alpha(1).rgbString(),
                pointHoverBackgroundColor: a,
                pointHoverBorderColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                fill: true,
                backgroundColor: f,
                data: b,
            }]
        };
    }
    var ctx = document.getElementById('seo-card1').getContext("2d");
    var gradientFill = ctx.createLinearGradient(300, 0, 0, 300);
    gradientFill.addColorStop(1, "#b9fdef");
    gradientFill.addColorStop(0, "#2ed8b6");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: seojs('#2ed8b6', [100, 80, 100, 150, 190, 200, 160], gradientFill),
        options: buildchartoption(),
    });
    var gradientFill = ctx.createLinearGradient(300, 0, 0, 300);
    gradientFill.addColorStop(1, "#b5d8ff");
    gradientFill.addColorStop(0, "#4099ff");
    var ctx = document.getElementById('seo-card2').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: seojs('#4099ff', [100, 80, 100, 150, 190, 200, 160], gradientFill),
        options: buildchartoption(),
    });
    // seo cardunction end

    // student start
    var ctx = document.getElementById('student-chart').getContext("2d");
    var pinkline = ctx.createLinearGradient(500, 0, 100, 0);
    pinkline.addColorStop(0, '#fd93a8');
    pinkline.addColorStop(1, '#FC6180');
    var greenline = ctx.createLinearGradient(500, 0, 100, 0);
    greenline.addColorStop(0, '#2ed8b6');
    greenline.addColorStop(1, '#7cffe5');
    var blueline = ctx.createLinearGradient(500, 0, 100, 0);
    blueline.addColorStop(1, '#56CCF2');
    blueline.addColorStop(0, '#2F80ED');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
            datasets: [{
                    label: "Arts",
                    borderColor: blueline,
                    pointBorderColor: '#fff',
                    pointBackgroundColor: blueline,
                    pointHoverBackgroundColor: blueline,
                    pointHoverBorderColor: blueline,
                    pointBorderWidth: 2,
                    pointHoverRadius: 10,
                    pointHoverBorderWidth: 1,
                    pointRadius: 8,
                    fill: false,
                    borderWidth: 2,
                    data: [20, 50, 30, 60, 30, 50, 40]
                },
                {
                    label: "Commerce",
                    borderColor: pinkline,
                    pointBorderColor: '#fff',
                    pointBackgroundColor: pinkline,
                    pointHoverBackgroundColor: pinkline,
                    pointHoverBorderColor: pinkline,
                    pointBorderWidth: 2,
                    pointHoverRadius: 10,
                    pointHoverBorderWidth: 1,
                    pointRadius: 8,
                    fill: false,
                    borderWidth: 2,
                    data: [60, 30, 65, 45, 67, 35, 68]
                },
                {
                    label: "Scince",
                    borderColor: greenline,
                    pointBorderColor: '#fff',
                    pointBackgroundColor: greenline,
                    pointHoverBackgroundColor: greenline,
                    pointHoverBorderColor: greenline,
                    pointBorderWidth: 2,
                    pointHoverRadius: 10,
                    pointHoverBorderWidth: 1,
                    pointRadius: 8,
                    fill: false,
                    borderWidth: 2,
                    data: [40, 20, 50, 15, 40, 65, 20]
                }
            ]
        },
        options: {
            legend: {
                position: "top"
            },
            tooltips: {
                enabled: true,
                intersect: !1,
                mode: "nearest",
                xPadding: 10,
                yPadding: 10,
                caretPadding: 10
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "rgba(0,0,0,0.5)",
                        fontStyle: "bold",
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        padding: 20,
                    },
                    gridLines: {
                        drawTicks: false,
                        display: false
                    }

                }],
                xAxes: [{
                    gridLines: {
                        drawTicks: false,
                        display: false
                    },
                    ticks: {
                        padding: 20,
                        fontColor: "rgba(0,0,0,0.5)",
                        fontStyle: "bold"
                    }
                }]
            }
        }
    });
    // student end

    // feedback chart start
    var ctx = document.getElementById("email-chart").getContext("2d");
    var config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    300, 170, 60
                ],
                backgroundColor: [
                    "#4099ff",
                    "#2ed8b6",
                    "#FF5370"
                ],
                label: 'Dataset 1',
                borderWidth: 0
            }],
            labels: [
                "Send",
                "Opend",
                "Bounced"
            ]
        },
        options: {
            responsive: true,
            cutoutPercentage: 80,
            legend: {
                position: "top"
            },
            title: {
                display: false,
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };
    window.myDoughnut = new Chart(ctx, config);
    // feedback chart end

    // social-card slider start
    $('.social-slider').owlCarousel({
        items:1,
        margin:5,
        stagePadding:3,
        loop:true,
        autoplay:true,
        nav:false
    });
    // social-card slider end

});
