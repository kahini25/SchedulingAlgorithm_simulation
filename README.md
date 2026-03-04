# CPU Scheduling Simulator

A modern, interactive web application for visualizing and comparing various CPU scheduling algorithms.

## Features

- **Interactive Gantt Chart**: Real-time visualization of process execution.
- **Animated Simulation**: Watch the CPU and Ready Queue in action.
- **Support for 7 Algorithms**:
  - First Come First Serve (FCFS)
  - Shortest Job First (Non-Preemptive)
  - Shortest Remaining Time First (SRTF - Preemptive)
  - Priority Scheduling (Preemptive)
  - Round Robin (RR)
  - Multilevel Queue (MLQ)
  - Multilevel Feedback Queue (MLFQ)
- **Detailed Metrics**: Instant calculation of Arrival Time (AT), Burst Time (BT), Completion Time (CT), Turnaround Time (TAT), Waiting Time (WT), and Response Time (RT).
- **Premium UI**: Custom vertical number steppers, modern tooltips, and a sleek glassmorphism aesthetic.

## Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

1. **Install Dependencies**:
   ```sh
   npm install
   ```

2. **Run Development Server**:
   ```sh
   npm run dev
   ```

3. **Open Browser**:
   Navigate to [http://localhost:8080/](http://localhost:8080/)
