// definitions
catSchools = ['sub1k', '1to10k', '10to50k', '50to100k', '100to300k']
legendItem = ['1 - 1000', '1000 - 10000', '10000 - 50000', '50000 - 100,000', '100,000 - 300,000']
numSchools = {  // schools by number
    'sub1k': ['CH','DN','PU'],
    '1to10k': ['LD','SK','GA','NA','AR','MZ','MN','TR','DL'],
    '10to50k': ['MG','KL','HP','HR','UK','PB','JK','TS','JH'],
    '50to100k': ['GJ','CG','TN','AP','AS','OD','KA','BH','WB'],
    '100to300k': ['RJ','MH','MP','UP']
}
locSchools = { // schools by location ratio
    // reusing the array names for convenience ; actual names are coded in the SVG
    'sub1k': ['CH','DL'],
    '1to10k': ["PU","MZ","KA","TS","TN"],
    '10to50k': ["MH","HR","GJ","PB","GA","AP","KL","NA","RJ"],
    '50to100k': ['MP','MN','AN','WB','AR','CG','UP','JK','UK','DN','BH',"JH"],
    '100to300k': ['SK','OD','TR','MG','AS','HP']
}
manSchools = { // schools by management ratio
    // reusing the array names for convenience ; actual names are coded in the SVG
    'sub1k': ['DL','CH','PU','HR','UP','RJ'],
    '1to10k': ['SK','PB','MZ','TS','NA','KL','KA','AP','UK','GJ','MN','TN','AS','MP'],
    '10to50k': ['JH','JK','MH','MG','BH','AN'],
    '50to100k': ['HP','WB','AR','CG','TR','OD','DN','GA']
}
colorsGreen = ['#ffffcc','#c2e699','#78c679','#31a354','#006837']
colorsGreenRGB = ["194, 230, 153", "194, 230, 153", "120, 198, 121", "49, 163, 84", "0, 104, 55"]
colorsBlue = ["#f0f9e8","#bae4bc","#7bccc4","#43a2ca","#0868ac"]
colorsYlGnBu = ['#ffffcc','#a1dab4','#41b6c4','#2c7fb8','#253494']
colorsYlOrBr = ['#ffffd4','#fed98e','#fe9929','#d95f0e','#993404']
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

var scrolly6 = d3.select("#scrolly-6");
var figure6 = scrolly6.select("#graphic-6");
var article6 = scrolly6.select("#article-6");
var step6 = article6.selectAll(".step");

var scrolly7 = d3.select("#scrolly-7");
var figure7 = scrolly7.select("#graphic-7");
var article7 = scrolly7.select("#article-7");
var step7 = article7.selectAll(".step");

var scrolly8 = d3.select("#scrolly-8");
var figure8 = scrolly8.select("#graphic-8");
var article8 = scrolly8.select("#article-8");
var step8 = article8.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

var figures = [figure1, figure2, figure3, figure4,
            figure5, figure6, figure7, figure8]
var steps = [step1, step2, step3, step4,
            step5, step6, step7, step8]
var svgMapHeight = 859.6;
var pngChartHeight = 544.8;
var pngMapHeight = 544.8;

// generic window resize listener event
function handleResize() {
    // 1. Update height of the underlying figures
    var figureHeight = window.innerHeight / 2; // default setting
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;

    // 2. update height of the step elements above them
    // var stepH = Math.floor(window.innerHeight * 0.75); // default setting
    figures[0].style("height", svgMapHeight + "px");
    figures.forEach( (el) => el.style("top", figureMarginTop + "px"))
    steps[0].style("height", (svgMapHeight + 200) + "px"); // +200 to give reading space
    for (var i=1; i < steps.length; i++) {
        steps[i].style("height", (pngChartHeight + 200) + "px")
    }

    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

var direction = "down"
var stepLengths = [step1._groups[0].length, step2._groups[0].length,
                step3._groups[0].length, step4._groups[0].length,
                step5._groups[0].length, step6._groups[0].length,
                step7._groups[0].length, step8._groups[0].length]

// scrollama event handlers
function handleStepEnter(response) {
    direction = response.direction;
    el = response.element
    // note: response = { element, direction, index }

    // which graphic is this step associated with? read from data-step-index
    stepIndex = parseInt(el.dataset.stepIndex) - 1
    // how many steps have come before this one? adds lengths till prev graphic
    stepLenSum = stepLengths.slice(0,stepIndex).reduce((a, b) => a + b, 0)

    steps[stepIndex].classed("is-active", function(d, i) {
        // i starts at 0 for each graphic; so have to add prev lengths to it compare
        return (i + stepLenSum) === response.index; 
    });
}

function handleStepProgress(response) {
    // d3.select(".progress").text(d3.format(".1%")(response.progress));
    // for graphic-1
    if (response.index === 0) {
        color(response);
    } else if (response.index > 1 && response.index < 4) {
        switchImageOnce(response);
    } else if (response.index > 18 && response.index < 22) {
        switchImageTwice(response);
    }
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

// function colorspesh() {
//     for (var i=0;i<5;i++) {
//         schoolCat = catSchools[i]
//         rgba = colorsYlOrBr[i]
//         for (var j=0;j<locSchools[schoolCat].length;j++) {
//             // add colour to the state
//             console.log(locSchools[schoolCat][j])
//             document.getElementById(locSchools[schoolCat][j]).style.fill = rgba
//         }
//         // add colour to the legend
//         var legendColor = 'legend-color-' + (i + 1)
//         document.getElementById(legendColor).style.fill = rgba
//     }
// }

var prevProg = 0
function switchImageOnce(response) {
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

var prevProgress = 0
function switchImageTwice(response) {
    imgURL = document.getElementById('img-8').src
    if (direction === 'down' && imgURL.slice(imgURL.indexOf('map/')+4) === "india-board-table.svg") {
        if (response.index === 19 && response.progress > 0.3) {
            // fade existing image out
            document.getElementById('img-8').classList.add("fadeOutHide")
        }
        if (response.index === 19 && response.progress > 0.6) {
            console.log('fire')
            // replace image src
            document.getElementById('img-8').src = "india-board.svg"
            // set appropriate height of the graphic (is different from graphic-1 cuz svg)
            // figure2.style("height", 769.583 + "px")
            document.getElementById('img-8').classList.remove("fadeOutHide")
            document.getElementById('img-8').classList.add("fadeInShow")
        }
        if (response.index === 20 && imgURL.slice(imgURL.indexOf('map/')+4) === "india-board-table.svg") {
            console.log('fail safely')
            // fail safe in case user goes zooooom and prev if-block is not triggered
            document.getElementById('img-8').src = "india-board.svg"
            // set appropriate height of the graphic (is different from graphic-1 cuz svg)
            // figure2.style("height", 769.583 + "px")
            document.getElementById('img-8').classList.remove("fadeOutHide")
            document.getElementById('img-8').classList.add("fadeInShow")
        }
    } else if (direction === 'up' && imgURL.slice(imgURL.indexOf('map/')+4) === "india-board.svg") {
        if (response.index === 20 && response.progress < 0.6) {
            // fade existing image out
            document.getElementById('img-8').classList.add("fadeOutHide")
        }
        if (response.index === 20 && response.progress < 0.3) {
            console.log('fired')
            // replace image src
            document.getElementById('img-8').src = "india-board.svg"
            // set appropriate height of the graphic (same as graphic-2)
            // figure2.style("height", figure2Height + "px")
            document.getElementById('img-8').classList.remove("fadeOutHide")
            document.getElementById('img-8').classList.add("fadeInShow")
        }
        if (response.index === 19 && imgURL.slice(imgURL.indexOf('map/')+4) === "india-board.svg") {
            console.log('failed safely')
            // fail safe in case user goes zooooom and prev if-block is not triggered
            document.getElementById('img-8').src = "india-board-table.svg"
            // set appropriate height of the graphic
            // figure2.style("height", figure2Height + "px")
            document.getElementById('img-8').classList.remove("fadeOutHide")
            document.getElementById('img-8').classList.add("fadeInShow")
        }
    }
    // in case user goes back up soon as first image is just faded out
    // direction will remain down but progress will be smaller than before
    if (direction === 'down' && response.progress < prevProgress) {
        if (response.index === 19 && imgURL.slice(imgURL.indexOf('map/')+4) === "india-board-table.svg") {
            console.log('gotcha')
            document.getElementById('img-8').classList.remove("fadeOutHide")
            document.getElementById('img-8').classList.add("fadeInShow")
        }
    }
    // in case user goes back down soon as second image is just faded out
    // direction will remain up but progress will be larger than before
    if (direction === 'up' && response.progress > prevProgress) {
        if (response.index === 19 && imgURL.slice(imgURL.indexOf('map/')+4) === "belt-vs-us-china.svg") {
            console.log('gotcha bb')
            document.getElementById('img-8').classList.remove("fadeOutHide")
            document.getElementById('img-8').classList.add("fadeInShow")
        }
    }

    prevProgress = response.progress;
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

    // colorspesh();

    // setup resize event
    window.addEventListener("resize", handleResize);
}

// kick things off
init();