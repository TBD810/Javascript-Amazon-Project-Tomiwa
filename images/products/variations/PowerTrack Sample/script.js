function reportStatus(status) {
  const location = document.getElementById("location").value;
  if (!location) {
    alert("Please select your area.");
    return;
  }

  const report = {
    location: location,
    status: status,
    time: new Date().toLocaleTimeString()
  };

  saveReport(report);
  displayReports();
}

function saveReport(report) {
  let reports = JSON.parse(localStorage.getItem("powerReports")) || [];
  reports.unshift(report); // newest first
  localStorage.setItem("powerReports", JSON.stringify(reports));
}

function displayReports() {
  const list = document.getElementById("report-list");
  list.innerHTML = "";

  let reports = JSON.parse(localStorage.getItem("powerReports")) || [];

  reports.slice(0, 10).forEach(report => {
    const li = document.createElement("li");
    li.className = report.status === "ON" ? "on" : "off";
    li.textContent = `[${report.time}] Power is ${report.status} in ${report.location}`;
    list.appendChild(li);
  });
}

// Load on page
displayReports();
