/* 
    JavaScript for MakeCode application of DBDP. 
*/


// Accordian side panel

var acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
}

// Graph figure
drawChart();

async function drawChart() {
  const datapoints = await getData();
  const data = {
    labels: datapoints.labels,
    datasets: [{
      label: 'Glucose',
      data: datapoints.glucoseData,
      borderColor: 'rgb(148,0,211)',
      pointRadius: 0,
      fill: false,
      borderWidth: 1
  }]};
  
  const config = {
    type: 'line',
    data,
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          title: {
            display: true,
            text: 'Axis label'
          }
        },
        xAxes: [{
          title: {
            display: true,
            text: 'Label',
          },
          display: false, //this will remove all the x-axis grid lines
          ticks: {
              display: false //this will remove only the label
          }
        }],

        yAxes: [{
          title: {
            display: true,
            text: 'Glucose Value (mg/dL)'
          }
        }],
      },
      
    }
  };

  const myChart = new Chart(
    document.getElementById('chart').getContext('2d'),
    config
  );

}

// CSV Parser
async function getData() {
  const labels = [];
  const glucoseData = [];
  const url = '/output.csv'
  const response = await fetch(url)
  const tableData = await response.text();

  const table = tableData.split('\n');
  table.forEach(row => {
    const column = row.split(',')
    const glucoseLevel = column[2];
    const index = column[0];
    labels.push(index);
    glucoseData.push(glucoseLevel);
  })

  return { labels, glucoseData }
}


// Hidden elements onclick

function onFileUpload() {

  // Show hidden
  var dataBlock = document.getElementById('data-block');
  var chart = document.getElementById('chartBox');
  var compileButton = document.getElementById('compile');
  var downloadButton = document.getElementById('download');
  
  dataBlock.style.display  = 'block';
  chart.style.display = 'block';
  compileButton.style.display = 'block';
  downloadButton.style.display = 'block';
  
  // Hide elements
  var chooseFileBlock = document.getElementById('inpFile');
  var submitButton = document.getElementById('submit');
  var uploadText = document.getElementById('file-upload-text');

  chooseFileBlock.style.display = 'none';
  submitButton.style.display = 'none';
  uploadText.style.display = 'none';
}

function showPreprocessBlock() {
  var preprocessBlock = document.getElementById('second-block');
  var blockArrow = document.getElementById('block-arrow');

  preprocessBlock.style.display = 'block';
  blockArrow.style.display = 'block';
}

function preventRefresh() {
  event.preventDefault()

}


