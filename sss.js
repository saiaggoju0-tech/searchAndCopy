function filterTable() {
    const laneSearch = document.getElementById('lane-search').value.toLowerCase();
    const cptFilter = document.getElementById('cpt-filter').value.toLowerCase();

    const rows = document.querySelectorAll('#truck-data tbody tr');

    let completed = 0;
    let valid = 0;
    let count53 = 0;
    let count26 = 0;

    rows.forEach(row => {
        const truckInfo = row.cells[1].innerText.toLowerCase();
        const status = row.cells[0].innerText.trim();
        const equipType = row.cells[4].innerText.trim();
        const cpt = row.cells[11].innerText.toLowerCase();

        const laneMatch = truckInfo.includes(laneSearch);
        const cptMatch = cpt.includes(cptFilter);

        if (laneMatch && cptMatch) {
            row.style.display = "";

            if (status === "Completed") completed++;
            if (["Scheduled", "Loading in Progress", "Trailer Attached"].includes(status)) valid++;
            if (equipType === "53") count53++;
            if (equipType === "26") count26++;
        } else {
            row.style.display = "none";
        }
    });

    document.getElementById("completed-count").innerText = completed;
    document.getElementById("valid-count").innerText = valid;
    document.getElementById("count-53").innerText = count53;
    document.getElementById("count-26").innerText = count26;
}

function copyData() {
    let text = "";
    const rows = document.querySelectorAll('#truck-data tbody tr');

    rows.forEach(row => {
        const status = row.cells[0].innerText.trim();
        if (row.style.display !== "none" && status !== "Completed") {
            text += row.innerText + "\n";
        }
    });

    navigator.clipboard.writeText(text);
    alert("Visible non-completed trucks copied successfully!");
}

filterTable();