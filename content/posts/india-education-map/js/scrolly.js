// definitions
catSchools = ['sub1k', '1to10k', '10to50k', '50to100k', '100to300k']
legendItem = ['1 - 1000', '1000 - 10000', '10000 - 50000', '50000 - 100,000', '100,000 - 300,000']
numSchools = {
    'sub1k': ['CH','DN','PU'],
    '1to10k': ['LD','SK','GA','NA','AR','MZ','MN','TR','DL'],
    '10to50k': ['MG','KL','HP','HR','UK','PB','JK','TS','JH'],
    '50to100k': ['GJ','CG','TN','AP','AS','OD','KA','BH','WB'],
    '100to300k': ['RJ','MH','MP','UP']
}
colorsGreen = ['#ffffcc','#c2e699','#78c679','#31a354','#006837']
colorsGreenRGB = ["194, 230, 153", "194, 230, 153", "120, 198, 121", "49, 163, 84", "0, 104, 55"]
colorsBlue = ["#f0f9e8","#bae4bc","#7bccc4","#43a2ca","#0868ac"]
colorsRed = ['#fef0d9','#fdcc8a','#fc8d59','#e34a33','#b30000']

// using d3 for convenience
// var main = d3.select("main");

var scrolly1 = d3.select("#scrolly-1");
var figure1 = scrolly1.select("#graphic-1");
var article1 = scrolly1.select("#article-1");
var step1 = article1.selectAll(".step");

var scrolly2 = d3.select("#scrolly-2");
var figure2 = scrolly2.select("#graphic-2");
var article2 = scrolly2.select("#article-2");
var step2 = article2.selectAll(".step");

var scrolly3 = d3.select("#scrolly-3");
var figure3 = scrolly3.select("#graphic-3");
var article3 = scrolly3.select("#article-3");
var step3 = article3.selectAll(".step");

var scrolly4 = d3.select("#scrolly-4");
var figure4 = scrolly4.select("#graphic-4");
var article4 = scrolly4.select("#article-4");
var step4 = article4.selectAll(".step");

var scrolly5 = d3.select("#scrolly-5");
var figure5 = scrolly5.select("#graphic-5");
var article5 = scrolly5.select("#article-5");
var step5 = article5.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

var figure1Height = 859.6;
var figure2Height = 544.8;
var figure3Height = 544.8;
var figure4Height = 544.8;
var figure5Height = 544.8;
// generic window resize listener event
function handleResize() {
    // 1. Update height of the underlying figures
    var figureHeight = window.innerHeight / 2;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;

    figure1
    .style("height", figure1Height + "px")
    .style("top", figureMarginTop + "px");

    figure2
    // .style("height", figure2Height + "px")
    .style("top", figureMarginTop + "px");

    figure3
    // .style("height", figure3Height + "px")
    .style("top", figureMarginTop + "px");

    figure4
    // .style("height", figure3Height + "px")
    .style("top", figureMarginTop + "px");

    figure5
    // .style("height", figure3Height + "px")
    .style("top", figureMarginTop + "px");

    // 2. update height of the step elements above them
    var stepH = Math.floor(window.innerHeight * 0.75);
    step1.style("height", (figure1Height + 200) + "px"); // give reading space
    step2.style("height", figure2Height + 200 + "px");
    step3.style("height", figure3Height + 200 + "px");
    step4.style("height", figure4Height + 200 + "px");
    step5.style("height", figure5Height + 200 + "px");

    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

var direction = "down"
var steps1 = step1._groups[0].length
var steps2 = step2._groups[0].length
var steps3 = step3._groups[0].length
var steps4 = step4._groups[0].length
var steps5 = step5._groups[0].length
// scrollama event handlers
function handleStepEnter(response) {
    direction = response.direction;
    // note: response = { element, direction, index }
    console.log(response.index)

    // step 0 and 1
    if (response.index < steps1) {
        // add color to current step only
        // this function toggles the class for all elements depending on their active/inactive state
        step1.classed("is-active", function(d, i) {
            return i === response.index;
        });
        // update graphic based on step
        if (response.index === 0) {
            // figure1.select("p").text("बस करो भैया");
        } else {
        figure1.select("p").text(response.index + 1);
        }
    }

    // step 2 and 3
    if (response.index >= steps1 && response.index < (steps2 + steps1)) {
        // add color to current step only
        step2.classed("is-active", function(d, i) {
            return (i + steps1) === response.index;
        });
        // update graphic based on step
        figure2.select("p").text(response.index + 1);
    }

    // step 4 and 5
    if (response.index >= (steps2 + steps1) && response.index < (steps3 + steps2 + steps1)) {
        // add color to current step only
        step3.classed("is-active", function(d, i) {
            return (i + steps2 + steps1) === response.index;
        });
        // update graphic based on step
        figure3.select("p").text(response.index + 1);
    }

    // step 6 and 7
    if (response.index >= (steps3 + steps2 + steps1) && response.index < (steps4 + steps3 + steps2 + steps1)) {
        // add color to current step only
        step4.classed("is-active", function(d, i) {
            return (i + steps3 + steps2 + steps1) === response.index;
        });
        // update graphic based on step
        figure4.select("p").text(response.index + 1);
    }

    // step 8 and 9
    if (response.index >= (steps4 + steps3 + steps2 + steps1) && response.index < (steps5 + steps4 + steps3 + steps2 + steps1)) {
        // add color to current step only
        step5.classed("is-active", function(d, i) {
            return (i + steps4 + steps3 + steps2 + steps1) === response.index;
        });
        // update graphic based on step
        figure5.select("p").text(response.index + 1);
    }
}

function handleStepProgress(response) {
    // d3.select(".progress").text(d3.format(".1%")(response.progress));
    if (response.index === 0) {
        color(response);
    }
    switchImage(response);
}

function color(response) {
    for (var i=0;i<5;i++) {
        schoolCat = catSchools[i]
        var rgba = "rgba(" + colorsGreenRGB[i] + ", " + (response.progress + 0.3) + ")";
        for (var j=0;j<numSchools[schoolCat].length;j++) {
            // add colour to the state
            document.getElementById(numSchools[schoolCat][j]).style.fill = rgba
        }
        // add colour to the legend
        var legendColor = 'legend-color-' + (i + 1)
        var legendText = 'legend-data-' + (i + 1)
        document.getElementById(legendColor).style.fill = rgba
        // update legend item
        document.getElementById(legendText).text = legendItem[i]
    }
}

var prevProg = 0
function switchImage(response) {
    imgURL = document.getElementById('img-2').src
    if (direction === 'down' && imgURL.slice(imgURL.indexOf('map/')+4) === "world-schools.png") {
        if (response.index === 2 && response.progress > 0.3) {
            // fade existing image out
            document.getElementById('img-2').classList.add("fadeOutHide")
        }
        if (response.index === 2 && response.progress > 0.6) {
            console.log('fire')
            // replace image src
            document.getElementById('img-2').src = "belt-vs-us-china.png"
            // set appropriate height of the graphic (is different from graphic-1 cuz PNG)
            // figure2.style("height", 769.583 + "px")
            document.getElementById('img-2').classList.remove("fadeOutHide")
            document.getElementById('img-2').classList.add("fadeInShow")
        }
        if (response.index === 3 && imgURL.slice(imgURL.indexOf('map/')+4) === "world-schools.png") {
            console.log('fail safely')
            // fail safe in case user goes zooooom and prev if-block is not triggered
            document.getElementById('img-2').src = "belt-vs-us-china.png"
            // set appropriate height of the graphic (is different from graphic-1 cuz PNG)
            // figure2.style("height", 769.583 + "px")
            document.getElementById('img-2').classList.remove("fadeOutHide")
            document.getElementById('img-2').classList.add("fadeInShow")
        }
    } else if (direction === 'up' && imgURL.slice(imgURL.indexOf('map/')+4) === "belt-vs-us-china.png") {
        if (response.index === 3 && response.progress < 0.6) {
            // fade existing image out
            document.getElementById('img-2').classList.add("fadeOutHide")
        }
        if (response.index === 3 && response.progress < 0.3) {
            console.log('fired')
            // replace image src
            document.getElementById('img-2').src = "world-schools.png"
            // set appropriate height of the graphic (same as graphic-2)
            // figure2.style("height", figure2Height + "px")
            document.getElementById('img-2').classList.remove("fadeOutHide")
            document.getElementById('img-2').classList.add("fadeInShow")
        }
        if (response.index === 2 && imgURL.slice(imgURL.indexOf('map/')+4) === "belt-vs-us-china.png") {
            console.log('failed safely')
            // fail safe in case user goes zooooom and prev if-block is not triggered
            document.getElementById('img-2').src = "world-schools.png"
            // set appropriate height of the graphic
            // figure2.style("height", figure2Height + "px")
            document.getElementById('img-2').classList.remove("fadeOutHide")
            document.getElementById('img-2').classList.add("fadeInShow")
        }
    }
    // in case user goes back up soon as first image is just faded out
    // direction will remain down but progress will be smaller than before
    if (direction === 'down' && response.progress < prevProg) {
        if (response.index === 2 && imgURL.slice(imgURL.indexOf('map/')+4) === "world-schools.png") {
            console.log('gotcha')
            document.getElementById('img-2').classList.remove("fadeOutHide")
            document.getElementById('img-2').classList.add("fadeInShow")
        }
    }
    // in case user goes back down soon as second image is just faded out
    // direction will remain up but progress will be larger than before
    if (direction === 'up' && response.progress > prevProg) {
        if (response.index === 2 && imgURL.slice(imgURL.indexOf('map/')+4) === "belt-vs-us-china.png") {
            console.log('gotcha bb')
            document.getElementById('img-2').classList.remove("fadeOutHide")
            document.getElementById('img-2').classList.add("fadeInShow")
        }
    }

    prevProg = response.progress;
}

function setupStickyfill() {
    var elements = document.querySelectorAll('.sticky');
    Stickyfill.add(elements);
}

function init() {
    setupStickyfill();

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
    .setup({
        // step: "#scrolly-1 #article-1 .step",
        step: ".step",
        offset: 0.33,
        progress: true,
        debug: false
    })
    .onStepEnter(handleStepEnter)
    .onStepProgress(handleStepProgress);

    // setup resize event
    window.addEventListener("resize", handleResize);
}

// kick things off
init();