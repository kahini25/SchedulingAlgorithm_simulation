# CPU Scheduling Simulator

The CPU Scheduling Simulator is an interactive web-based application designed to visualize and analyze classical operating system scheduling algorithms in real time. Built using modern frontend technologies such as React, TypeScript, and Vite, the simulator enables users to define processes, configure scheduling parameters, and observe execution behavior through dynamic Gantt chart representations and computed performance metrics.

This project serves as an educational and demonstrative tool that bridges theoretical concepts of CPU scheduling with practical, visual understanding. It is particularly useful for students studying operating systems, educators illustrating scheduling strategies, and developers exploring algorithm visualization within a scalable, component-driven frontend architecture.


## Key Features

- Implementation and simulation of fundamental CPU scheduling algorithms:
  - First Come First Serve (FCFS)
  - Shortest Job First (SJF)
  - Priority Scheduling
  - Shortest Remaining Time First (SRTF)
  - Round Robin (RR)
- Interactive interface for process definition and parameter configuration  
- Dynamic Gantt chart–based execution visualization  
- Automatic computation of essential scheduling metrics:
  - Waiting Time
  - Turnaround Time
  - Response Time
  - CPU Utilization
- Fully responsive layout with dark mode support  
- Maintainable and modular architecture built using React and TypeScript  

---

## Project Objective

The primary objective of this project is to provide a clear and interactive platform for understanding Operating System CPU scheduling strategies.

It is particularly useful for:

- Students, to strengthen conceptual clarity through visualization  
- Educators, to demonstrate scheduling behavior in an intuitive format  
- Developers, to explore modern frontend architecture combined with algorithmic simulation  

Overall, the simulator bridges the gap between theoretical knowledge and practical visualization.

---

## Technology Stack

### Frontend Framework
- React 18  
- TypeScript  
- Vite  

### UI and Styling
- Tailwind CSS  
- Shadcn UI (built on Radix UI primitives)  
- Lucide React icon library  
- Inter and JetBrains Mono fonts  

### State Management, Forms, and Routing
- React Router DOM  
- TanStack Query  
- React Hook Form with Zod validation  

### Data Visualization and User Experience
- Recharts for Gantt chart rendering  
- Sonner for toast notifications  
- Next Themes for dark mode support  

### Development and Testing Tools
- ESLint with TypeScript ESLint rules  
- Vitest and React Testing Library with JSDOM  
- SWC compiler integrated through Vite  

---

## Project Structure
The project follows a modular and maintainable directory organization to clearly separate user interface components, core scheduling logic, routing structure, and static assets.

```
cpu_scheduler/
├── src/
│   ├── components/   # Reusable UI components such as ProcessTable and GanttChart
│   ├── lib/          # Implementation of CPU scheduling algorithms and utilities
│   ├── pages/        # Route-level views and application screens
│   └── index.css     # Global styles and Tailwind CSS configuration
├── public/           # Static assets including icons and images
└── index.html        # Application entry HTML file
```

This structure improves readability, scalability, and ease of maintenance by ensuring a clear separation between presentation, logic, and configuration layers within the application.

