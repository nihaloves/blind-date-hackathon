# 🌕 MOONLOOP: STRANDED

### Interactive Lunar Survival Simulation & Mission Control Dashboard

**Four astronauts. One damaged habitat. Fourteen days until rescue.**

MOONLOOP: STRANDED is an interactive sci-fi survival strategy game in which you take command of a stranded lunar habitat crew. Manage life-critical resources, repair damaged subsystems, respond to unpredictable emergencies, and make strategic decisions to keep all four astronauts alive until rescue arrives.

Built around a futuristic mission-control interface, the simulation combines resource management, cascading system failures, emergency response, and tactical decision-making in a lunar survival scenario.

---

## 🚀 Quick Start

### Option 1: Standalone HTML

Start playing without installing Node.js or configuring a development environment.

1. Download or clone this repository.
2. Locate `moonloop.html`.
3. Open the file in a modern web browser such as Chrome, Edge, Firefox, or Safari.
4. Select **BEGIN SURVIVAL** to start your mission.

The standalone version runs entirely in the browser and loads React, ReactDOM, and Babel from external CDNs. An internet connection is therefore required to load these dependencies when they are not cached.

### Option 2: Run with Vite

If you have the Vite project version, follow these steps:

```bash
git clone <your-repository-url>
cd <your-project-folder>
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

`http://localhost:5173`

**Prerequisites**

* Node.js and npm
* A modern web browser

> Note: The Vite workflow requires the corresponding project files and `package.json`. The standalone HTML file alone does not provide the Vite development environment.

---

## 🎮 Gameplay

You are the mission commander responsible for keeping a crew of four astronauts alive on the lunar surface while awaiting emergency extraction.

The lunar transfer vehicle has suffered a critical failure, forcing the crew to take shelter in a damaged habitat at Mare Tranquillitatis. Oxygen is leaking, water recycling is degraded, and the solar array is only partially functional.

Your mission is to manage the habitat, make difficult resource-allocation decisions, and survive until rescue arrives.

### Core Objectives

* Keep oxygen, water, food, power, and habitat pressure above critical levels.
* Monitor the health of all four crew members.
* Repair damaged life-support and power systems.
* Respond to scheduled emergency events.
* Prioritize limited spare parts and energy.
* Reach the rescue deadline with the crew's survival conditions intact.

---

## ✨ Key Features

### 1. Real-Time Mission Telemetry

Monitor six critical survival indicators through interactive resource bars:

* **Oxygen:** Maintain a breathable habitat atmosphere.
* **Water:** Manage consumption and recycling.
* **Food:** Control ration stores and daily consumption.
* **Power:** Balance solar generation against system demand.
* **Habitat Pressure:** Prevent dangerous pressure loss.
* **Crew Health:** Monitor the overall condition of the crew.

Resource levels dynamically affect mission status, with normal, warning, and critical indicators.

### 2. Crew Monitoring

Track four individual astronauts, each with a designated role and health level.

* Mission Commander: Alex Vance
* Systems Engineer: Dr. Elena Rostova
* Medical Officer: Marcus Chen
* Communications Specialist: Suki Tanaka

Crew condition indicators change as survival resources deteriorate and health is affected by environmental stress.

### 3. Tactical Mission Actions

Every decision influences the resources available for future operations.

| Action                       | Strategic Benefit                        |
| ---------------------------- | ---------------------------------------- |
| Emergency Power Conservation | Reduces daily power consumption          |
| Repair Solar Array           | Improves power generation                |
| Repair Water Recycling       | Restores water recovery                  |
| Seal Oxygen / Pressure Leak  | Stops active habitat leaks               |
| Enforce Strict Rationing     | Reduces daily food and water consumption |
| Conduct Crew Medical Triage  | Restores crew health at a power cost     |
| Deep System Diagnostics      | Provides a chance to recover spare parts |

Repairs consume limited spare parts, while medical treatment consumes power. Choosing the right action at the right time is essential to survival.

### 4. Dynamic Emergency Events

Survival becomes more difficult as the mission progresses.

The simulation includes scheduled events such as:

* **Solar Radiation Storm:** Reduces available power and damages habitat infrastructure.
* **Water Recycling Failure:** Disables water recovery until repaired.
* **Pressure Seal Rupture:** Causes habitat pressure to decrease.
* **Rescue Delay:** Extends the time the crew must survive.

Each emergency introduces additional pressure on resource management and mission planning.

### 5. Mission Intelligence Advisor

An onboard tactical advisor evaluates the current mission state and highlights a recommended action.

Its recommendations prioritize conditions such as:

* Active oxygen leaks
* Declining water reserves
* Power shortages
* Emergency conservation
* Resource rationing

The advisor uses predefined decision rules based on the current simulation state. It is a rule-based system rather than an external generative AI integration.

### 6. Interactive Mission Control Dashboard

The interface includes:

* Futuristic lunar habitat visualization
* Live resource telemetry
* Individual crew health cards
* Mission status indicators
* Emergency situation reports
* Recommended tactical actions
* Mission event log
* Rescue countdown
* Victory and defeat debrief screens

The responsive layout is designed for both desktop and smaller screens.

### 7. Mission Persistence

During an active mission, the standalone application saves the current game state in browser `localStorage`.

This allows the simulation to restore a saved mission when the page is reopened in the same browser profile.

Starting a new mission resets the saved game state.

---

## 🧠 Simulation Mechanics

MOONLOOP: STRANDED models survival through interconnected resource systems.

For example:

1. Reduced power can limit water recycling efficiency.
2. An oxygen leak accelerates oxygen depletion.
3. Failed water recycling increases pressure on water reserves.
4. Low oxygen, water, food, or habitat pressure can reduce crew health.
5. Critical resource depletion can trigger mission failure before rescue.

Players must balance immediate repairs against long-term conservation.

### Mission Outcomes

**Victory:** Reach the rescue deadline while satisfying the simulation's survival conditions.

**Defeat:** Life-support conditions deteriorate beyond the survival thresholds, or rescue arrives too late to save the crew.

After the mission ends, the debrief reports survival duration, completed repairs, resolved emergencies, and surviving crew members.

---

## 🛠️ Tech Stack

* **React 18** — Component-based user interface and state management
* **JavaScript (JSX)** — Game logic and interactive behavior
* **HTML5** — Application structure
* **CSS3** — Responsive layout, animations, telemetry bars, and sci-fi styling
* **SVG** — Custom icons and lunar habitat visualization
* **Babel Standalone** — In-browser JSX transformation for the standalone version
* **Vite** — Development server and build tooling for the Vite project version
* **Browser localStorage** — Client-side mission persistence

The standalone implementation loads React, ReactDOM, and Babel through CDN scripts and does not require a backend server.

---

## 📂 Project Structure

The standalone version can be organized as follows:

```text
MOONLOOP-STRANDED/
├── moonloop.html
├── README.md
└── LICENSE
```

If you use the separate Vite version, its structure may instead include:

```text
MOONLOOP-STRANDED/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── public/
└── README.md
```

The second structure is illustrative. Keep only files that actually exist in your repository.

---

## 🎯 Design Philosophy

MOONLOOP: STRANDED explores the intersection of systems thinking, resource optimization, crisis management, and interactive simulation.

The central design principle is simple: **every decision has consequences, and every subsystem matters.**

Players must evaluate trade-offs, anticipate cascading failures, and prioritize actions under limited resources and time.

The interface draws inspiration from futuristic spacecraft telemetry and mission-control systems, combining a dark HUD aesthetic with cyan instrumentation, warning indicators, and operational status displays.

---

## 🔮 Future Improvements

Potential extensions include:

* Procedurally generated emergencies and mission variations
* More detailed subsystem dependencies
* Crew-specific skills and psychological stress
* Difficulty settings and customizable mission parameters
* Mission history and performance analytics
* Expanded lunar exploration scenarios
* Improved simulation balancing and automated testing
* More realistic physics and engineering models

These are potential future enhancements, not claims about currently implemented functionality.

---

## ⚠️ Disclaimer

MOONLOOP: STRANDED is a fictional survival simulation created for interactive entertainment and educational exploration of resource management and systems thinking.

Although inspired by lunar habitat operations, its resource values, emergency schedules, and survival mechanics are simplified game models. They are not validated aerospace engineering calculations and should not be used for real mission planning.

The interface's NASA-inspired mission-control aesthetic does not imply official affiliation with or endorsement by NASA.

---

## 👩‍🚀 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement and test your changes.
4. Submit a pull request describing the improvement.

For significant changes, consider opening an issue first to discuss the proposed feature.

---

## 📜 License

Choose a license appropriate for your project before distributing or accepting contributions. If you select the MIT License, include a `LICENSE` file containing its full terms.

---

**MOONLOOP: STRANDED**

*The Moon is unforgiving. Your decisions determine who makes it home.*
