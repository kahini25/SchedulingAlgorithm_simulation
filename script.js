class Scheduler {
    constructor() {
        this.processes = [];
        this.pidCounter = 1;
    }

    addProcess(arrivalTime, burstTime, priority) {
        this.processes.push({
            id: this.pidCounter++,
            arrivalTime: parseInt(arrivalTime),
            burstTime: parseInt(burstTime),
            priority: parseInt(priority),
            remainingTime: parseInt(burstTime), // For RR/Preemptive
            completed: false
        });
    }

    reset() {
        this.processes = [];
        this.pidCounter = 1;
    }

    deleteProcess(id) {
        this.processes = this.processes.filter(p => p.id !== id);
    }

    // --- ALGORITHMS ---

    solveFCFS() {
        // Sort by Arrival Time
        let sortedProcesses = [...this.processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
        let currentTime = 0;
        let timeline = [];
        let completedProcesses = [];

        sortedProcesses.forEach(p => {
            if (currentTime < p.arrivalTime) {
                // Idle time
                timeline.push({ type: 'idle', start: currentTime, end: p.arrivalTime, duration: p.arrivalTime - currentTime });
                currentTime = p.arrivalTime;
            }

            timeline.push({ type: 'process', pid: p.id, start: currentTime, end: currentTime + p.burstTime, duration: p.burstTime });
            currentTime += p.burstTime;

            completedProcesses.push({
                ...p,
                completionTime: currentTime,
                turnaroundTime: currentTime - p.arrivalTime,
                waitingTime: (currentTime - p.arrivalTime) - p.burstTime
            });
        });

        return { timeline, completedProcesses };
    }

    solveSJF() { // Non-Preemptive
        let available = [...this.processes].map(p => ({ ...p })); // Clone
        let currentTime = 0;
        let timeline = [];
        let completedProcesses = [];
        let completedCount = 0;
        let n = available.length;

        while (completedCount < n) {
            // Get processes that have arrived and are not completed
            let readyQueue = available.filter(p => p.arrivalTime <= currentTime && !p.completed);

            if (readyQueue.length === 0) {
                // Move time to next arrival
                let nextArrival = Math.min(...available.filter(p => !p.completed).map(p => p.arrivalTime));
                timeline.push({ type: 'idle', start: currentTime, end: nextArrival, duration: nextArrival - currentTime });
                currentTime = nextArrival;
                continue;
            }

            // Select process with shortest burst time
            readyQueue.sort((a, b) => a.burstTime - b.burstTime || a.arrivalTime - b.arrivalTime);
            let p = readyQueue[0];

            // Execute completely
            timeline.push({ type: 'process', pid: p.id, start: currentTime, end: currentTime + p.burstTime, duration: p.burstTime });
            currentTime += p.burstTime;

            p.completed = true;
            completedCount++;

            completedProcesses.push({
                ...p,
                completionTime: currentTime,
                turnaroundTime: currentTime - p.arrivalTime,
                waitingTime: (currentTime - p.arrivalTime) - p.burstTime
            });
        }

        return { timeline, completedProcesses };
    }

    solvePriority() { // Non-Preemptive, Lower # = Higher Priority
        let available = [...this.processes].map(p => ({ ...p }));
        let currentTime = 0;
        let timeline = [];
        let completedProcesses = [];
        let completedCount = 0;
        let n = available.length;

        while (completedCount < n) {
            let readyQueue = available.filter(p => p.arrivalTime <= currentTime && !p.completed);

            if (readyQueue.length === 0) {
                let nextArrival = Math.min(...available.filter(p => !p.completed).map(p => p.arrivalTime));
                timeline.push({ type: 'idle', start: currentTime, end: nextArrival, duration: nextArrival - currentTime });
                currentTime = nextArrival;
                continue;
            }

            // Sort by Priority (Low -> High), then Arrival
            readyQueue.sort((a, b) => a.priority - b.priority || a.arrivalTime - b.arrivalTime);
            let p = readyQueue[0];

            timeline.push({ type: 'process', pid: p.id, start: currentTime, end: currentTime + p.burstTime, duration: p.burstTime });
            currentTime += p.burstTime;

            p.completed = true;
            completedCount++;

            completedProcesses.push({
                ...p,
                completionTime: currentTime,
                turnaroundTime: currentTime - p.arrivalTime,
                waitingTime: (currentTime - p.arrivalTime) - p.burstTime
            });
        }

        return { timeline, completedProcesses };
    }

    solveRR(quantum) {
        let available = [...this.processes].map(p => ({ ...p, remainingTime: p.burstTime }));
        // Sort initial by arrival to ensure fairness at time 0
        available.sort((a, b) => a.arrivalTime - b.arrivalTime);

        let currentTime = 0;
        let timeline = [];
        let completedProcesses = []; // To store results

        let queue = [];
        let completedCount = 0;
        let n = available.length;

        // Track which processes are already in queue or completed
        // Actually, standard RR logic:
        // maintain a queue of indices/objects.

        // Let's use a simpler simulation tick-by-tick or event-based
        // Event based is better for performance, but queue management is tricky.

        // Initialize queue with processes that arrived at time 0
        let arrived = new Set();

        const checkArrivals = (time) => {
            available.forEach(p => {
                if (p.arrivalTime <= time && !arrived.has(p.id) && p.remainingTime > 0) {
                    queue.push(p);
                    arrived.add(p.id);
                }
            });
        };

        // If no one is at 0, fast forward
        if (available.length > 0 && available[0].arrivalTime > 0) {
            // Find min arrival
            let minArr = Math.min(...available.map(p => p.arrivalTime));
            timeline.push({ type: 'idle', start: 0, end: minArr, duration: minArr });
            currentTime = minArr;
        }

        checkArrivals(currentTime);

        while (completedCount < n) {
            if (queue.length === 0) {
                // If queue is empty but not all done, jump to next arrival
                let remaining = available.filter(p => p.remainingTime > 0);
                if (remaining.length === 0) break; // Should be covered by completedCount loop but safe guard

                let nextArrival = Math.min(...remaining.map(p => p.arrivalTime));
                timeline.push({ type: 'idle', start: currentTime, end: nextArrival, duration: nextArrival - currentTime });
                currentTime = nextArrival;
                checkArrivals(currentTime);
                continue;
            }

            let p = queue.shift();

            let execTime = Math.min(quantum, p.remainingTime);

            timeline.push({ type: 'process', pid: p.id, start: currentTime, end: currentTime + execTime, duration: execTime });
            currentTime += execTime;
            p.remainingTime -= execTime;

            // Important: Check for new arrivals BEFORE re-queueing the current process
            checkArrivals(currentTime);

            if (p.remainingTime > 0) {
                queue.push(p);
            } else {
                completedCount++;
                completedProcesses.push({
                    ...p,
                    completionTime: currentTime,
                    turnaroundTime: currentTime - p.arrivalTime,
                    waitingTime: (currentTime - p.arrivalTime) - p.burstTime
                });
            }
        }

        // The completedProcesses array is in order of completion.
        // We might want to sort it by ID for the table or just return it.
        // Let's return a map or lookup for the table to use, or just the list.
        return { timeline, completedProcesses };
    }
}

// --- UI CONTROLLER ---

const scheduler = new Scheduler();

// Elements
const arrivalInput = document.getElementById('arrivalTime');
const burstInput = document.getElementById('burstTime');
const priorityInput = document.getElementById('priority');
const addProcessBtn = document.getElementById('addProcessBtn');
const tableBody = document.querySelector('#inputTable tbody');
const algorithmSelect = document.getElementById('algorithmSelect');
const quantumGroup = document.getElementById('quantumGroup');
const timeQuantumInput = document.getElementById('timeQuantum');
const runBtn = document.getElementById('runBtn');
const resetBtn = document.getElementById('resetBtn');

const resultsSection = document.querySelector('.results-section');
const ganttChart = document.getElementById('ganttChart');
const outputTableBody = document.querySelector('#outputTable tbody');
const avgTurnaroundEl = document.getElementById('avgTurnaround');
const avgWaitingEl = document.getElementById('avgWaiting');

const speedSlider = document.getElementById('speedSlider');

// Event Listeners

addProcessBtn.addEventListener('click', () => {
    const at = parseInt(arrivalInput.value);
    const bt = parseInt(burstInput.value);
    const prio = parseInt(priorityInput.value);

    if (isNaN(at) || isNaN(bt) || isNaN(prio)) {
        alert("Please enter valid numbers");
        return;
    }

    scheduler.addProcess(at, bt, prio);
    renderInputTable();

    // Reset inputs
    arrivalInput.value = at + 1;
    burstInput.value = 1;
    priorityInput.value = 1;
});

algorithmSelect.addEventListener('change', () => {
    if (algorithmSelect.value === 'RR') {
        quantumGroup.style.display = 'block';
    } else {
        quantumGroup.style.display = 'none';
    }
});

resetBtn.addEventListener('click', () => {
    scheduler.reset();
    renderInputTable();
    resultsSection.classList.remove('active');
    resultsSection.style.opacity = '0.5';
    ganttChart.innerHTML = '<div class="placeholder-text">Run simulation to view Gantt Chart</div>';
    outputTableBody.innerHTML = '';
    avgTurnaroundEl.textContent = '0.00';
    avgWaitingEl.textContent = '0.00';

    // Clear any existing timeouts if we had them (not implemented in this simple version, but good practice)
});

runBtn.addEventListener('click', async () => {
    if (scheduler.processes.length === 0) {
        alert("Please add processes first!");
        return;
    }

    // Disable run button during simulation
    runBtn.disabled = true;
    resetBtn.disabled = true;

    const algo = algorithmSelect.value;
    let result;

    if (algo === 'FCFS') result = scheduler.solveFCFS();
    else if (algo === 'SJF') result = scheduler.solveSJF();
    else if (algo === 'Priority') result = scheduler.solvePriority();
    else if (algo === 'RR') {
        const q = parseInt(timeQuantumInput.value);
        if (isNaN(q) || q < 1) {
            alert("Invalid Time Quantum");
            runBtn.disabled = false;
            resetBtn.disabled = false;
            return;
        }
        result = scheduler.solveRR(q);
    }

    await animateResults(result);

    runBtn.disabled = false;
    resetBtn.disabled = false;
});

// Render Functions

function renderInputTable() {
    tableBody.innerHTML = '';
    scheduler.processes.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>P${p.id}</td>
            <td>${p.arrivalTime}</td>
            <td>${p.burstTime}</td>
            <td>${p.priority}</td>
            <td><button class="delete-btn" onclick="removeProcess(${p.id})">×</button></td>
        `;
        tableBody.appendChild(tr);
    });
}

// Global scope for onclick
window.removeProcess = (id) => {
    scheduler.deleteProcess(id);
    renderInputTable();
};

async function animateResults({ timeline, completedProcesses }) {
    resultsSection.classList.add('active');
    resultsSection.style.opacity = '1';

    // Clear and Setup
    ganttChart.innerHTML = '';
    outputTableBody.innerHTML = '';
    avgTurnaroundEl.textContent = '...';
    avgWaitingEl.textContent = '...';

    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1'];
    let totalDuration = timeline.length > 0 ? timeline[timeline.length - 1].end : 0;

    // Animation Loop
    for (let i = 0; i < timeline.length; i++) {
        const item = timeline[i];

        // Calculate dynamic speed delay based on slider (1 = slow, 10 = fast)
        // Base Unit Time in ms. 
        // If speed is 1, 1 unit time = 1000ms.
        // If speed is 10, 1 unit time = 100ms.
        const speedVal = parseInt(speedSlider.value);
        const msPerUnit = 1000 / speedVal;

        const block = document.createElement('div');
        block.className = 'gantt-block';

        // Style
        if (item.type === 'idle') {
            block.style.background = '#334155';
            block.innerHTML = `<span style="font-size:0.8rem">Idle</span>`;
        } else {
            const colorIndex = (item.pid - 1) % colors.length;
            block.style.background = colors[colorIndex];
            block.innerText = `P${item.pid}`;
        }

        // Initial state: Flex 0
        block.style.flex = 0;

        // Add start marker ONLY for the very first block
        if (i === 0) {
            const startMarker = document.createElement('span');
            startMarker.className = 'time-marker-start';
            startMarker.innerText = item.start;
            block.appendChild(startMarker);
        }

        ganttChart.appendChild(block);

        // Animate "filling" of time
        let currentDuration = 0;
        while (currentDuration < item.duration) {
            await new Promise(r => setTimeout(r, msPerUnit));
            currentDuration++;

            // Update Block visual size (using flex-grow)
            block.style.flex = currentDuration;
        }

        // Finalize block by adding end marker
        const endMarker = document.createElement('span');
        endMarker.className = 'time-marker';
        endMarker.innerText = item.end;
        block.appendChild(endMarker);
    }

    // After animation, show results table
    renderTable(completedProcesses);
}

function renderTable(completedProcesses) {
    outputTableBody.innerHTML = '';
    let totalWait = 0;
    let totalTurnaround = 0;

    // Sort completed processes by ID for display
    completedProcesses.sort((a, b) => a.id - b.id);

    completedProcesses.forEach(p => {
        totalWait += p.waitingTime;
        totalTurnaround += p.turnaroundTime;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>P${p.id}</td>
            <td>${p.completionTime}</td>
            <td>${p.turnaroundTime}</td>
            <td>${p.waitingTime}</td>
        `;
        outputTableBody.appendChild(tr);
    });

    const avgWait = (totalWait / completedProcesses.length).toFixed(2);
    const avgTurn = (totalTurnaround / completedProcesses.length).toFixed(2);

    avgWaitingEl.innerText = avgWait;
    avgTurnaroundEl.innerText = avgTurn;
}
