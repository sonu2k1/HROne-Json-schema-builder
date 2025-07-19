# HROne - JSON Schema Builder

This project is a dynamic **JSON Schema Builder** created as a submission for the **HROne Frontend Intern Hiring Task**. It enables users to visually construct a JSON schema by adding, editing, and nesting fields, with a real-time preview of the generated JSON structure.

## 🚀 Live Demo

<h3 align="center"><a href="https://glistening-frangollo-d07324.netlify.app/"><strong>Want to see live preview »</strong></a></h3>

---

## ✨ Features

- **Dynamic Field Management**: Easily add new fields to the schema at any level.
- **Field Deletion**: Remove any field with a single click.
- **Editable Keys**: Modify the key/name of each field in real-time.
- **Type Selection**: Assign a type to each field from a predefined list: `String`, `Number`, or `Nested`.
- **Recursive Nesting**: Create complex, deeply-nested JSON structures by nesting fields.
- **Live JSON Preview**: Instantly view the resulting JSON structure in a dedicated preview tab. Default values are shown for string and number types.

---

## 🛠 Tech Stack

- **ReactJS** – Core library for building the UI.
- **React Hook Form** – For managing complex dynamic forms with performance and ease.
- **Ant Design (AntD)** – Provides ready-to-use components like Tabs, Inputs, Buttons, and Selects.
- **JavaScript** – Main programming language.
- **TailwindCSS** – *(Used in some components)* for utility-first CSS styling.

---

## ⚙️ Getting Started

Follow these steps to set up the project locally.

### ✅ Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (which includes `npm`)
- Optionally: `yarn`

### 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git

2. Navigate to the project directory:
    ```bash
    cd your-repo-name
3. Install dependencies:
     ```bash
      npm install

▶️ Running the Application
   Start the development server:
 ```bas
     npm run dev

📁 Folder Structure
 ```bash
/src
  ├── components       # Reusable UI components
  ├── hooks            # Custom React Hooks (if any)
  ├── utils            # Utility/helper functions
  ├── App.jsx          # Root component
  └── main.jsx         # Application entry point
