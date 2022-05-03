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

// Creates chart
drawChart();

async function drawChart() {
  const datapoints = await getData();
  const data = {
    labels: datapoints.labels,
    datasets: [{
      label: 'Glucose',
      data: datapoints.glucoseData,
      backgroundColor: 'rgba(160,32,240)',
      borderWidth: 1
  }]};
  
  const config = {
    type: 'line',
    data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  const myChart = new Chart(
    document.getElementById('chart').getContext('2d'),
    config
  );

}

// Parses CSV
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



