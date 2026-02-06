# CPU Scheduling Simulator

A **web-based visualization tool** that demonstrates how different **CPU scheduling algorithms** execute processes and calculates key performance metrics such as:

- Completion Time  
- Turnaround Time  
- Waiting Time  
- Average Turnaround & Waiting Time  

This simulator helps students understand **Operating System scheduling concepts** through **interactive animation** and **Gantt chart visualization**.

---

## Features

### Process Input
Add processes with:

- Arrival Time  
- Burst Time  
- Priority  

### Supported Scheduling Algorithms

- **First Come First Serve (FCFS)**
- **Shortest Job First (Non-Preemptive)**
- **Priority Scheduling (Non-Preemptive)**
- **Round Robin (with Time Quantum)**

### Visualization & Metrics

- Animated **Gantt Chart**
- Displays:
  - Completion Time  
  - Turnaround Time  
  - Waiting Time  
  - Average Turnaround Time  
  - Average Waiting Time  
- Adjustable **simulation speed**
- Clean **dark-theme responsive UI**

---

## Project Structure

```
CPU-Scheduling-Simulator/
│
├── index.html      → User interface layout
├── style.css       → Styling and dark theme design
├── script.js       → Scheduling logic and animation
└── README.md       → Project documentation
```

---

## How It Works

1. User enters **process details** and adds them to the queue.  
2. Selects a **scheduling algorithm**.  
3. Clicks **Run Simulation**.  

The system will:

- Execute the chosen scheduling algorithm  
- Generate the execution timeline  
- Animate the **Gantt chart**  
- Calculate all **performance metrics**  
- Display results in a **table with averages**

---

## Scheduling Algorithms Explained

### 1. FCFS (First Come First Serve)
- Processes execute in **order of arrival time**  
- **Non-preemptive**  
- Simple but may cause **long waiting times**

### 2. SJF (Shortest Job First)
- Selects process with **smallest burst time** among arrived processes  
- **Non-preemptive**  
- Produces **minimum average waiting time**  
- May cause **starvation**

### 3. Priority Scheduling
- Executes process with **highest priority**  
  *(lower number = higher priority)*  
- **Non-preemptive**  
- Can also lead to **starvation of low-priority processes**

### 4. Round Robin
- Each process runs for a fixed **time quantum**  
- **Preemptive and fair**  
- Commonly used in **time-sharing operating systems**

---

## Technologies Used

- **HTML5** → Structure  
- **CSS3** → Styling & responsive design  
- **JavaScript (Vanilla JS)** → Scheduling logic, animation, DOM control  

No external frameworks required.

---

## How to Run the Project

### Method 1 — Directly in Browser
1. Download or clone the repository.  
2. Open **index.html** in any modern web browser.  
3. Start adding processes and run the simulation.

### Method 2 — Using Live Server (Recommended)
1. Open the project folder in **VS Code**.  
2. Install the **Live Server** extension.  
3. Right-click **index.html → Open with Live Server**.

---

## Educational Use

This project is useful for:

- **Operating System laboratory experiments**  
- **Mini-projects / academic submissions**  
- Visual understanding of **CPU scheduling**  
- **Viva demonstrations**

---

## Future Improvements

- Preemptive SJF (**SRTF**) implementation  
- Priority scheduling with **aging** to prevent starvation  
- Export results as **PDF/CSV**  
- **Multi-core CPU** simulation  
- **Step-by-step execution** mode  

---

## Author

**Student Mini Project – Operating Systems**
