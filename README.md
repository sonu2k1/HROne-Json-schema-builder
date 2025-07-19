HROne-Json-schema-builder
<h3 align="center"><a href="https://glistening-frangollo-d07324.netlify.app/"><strong>Want to see live preview »</strong></a></h3>

HROne - JSON Schema Builder
This project is a dynamic JSON Schema Builder created as a submission for the HROne Frontend Intern hiring task. The application allows users to visually construct a JSON schema by adding, editing, and nesting fields, with a real-time preview of the resulting JSON structure.

Live Demo
[Link to your hosted application on Vercel/Netlify]

Features
Dynamic Field Management: Easily add new fields to the schema at any level.

Field Deletion: Remove any field with a single click.

Editable Keys: Modify the key/name of each field in real-time.

Type Selection: Assign a type to each field from a predefined list: String, Number, or Nested.

Recursive Nesting: Create complex, deeply-nested JSON structures by adding fields within a Nested type.

Live JSON Preview: A dedicated tab shows the generated JSON output, which updates instantly as you build the schema. Default values are used for String and Number types.

Tech Stack
ReactJS: Core library for building the user interface.

React Hook Form: For robust and performant state management of the dynamic and complex form structure.

Ant Design (AntD): Used for the UI components, including Tabs, Buttons, Inputs, and Selects, providing a clean and professional look out-of-the-box.

JavaScript: The primary programming language used.

TailwindCSS: (Used for styling in the provided component) For utility-first CSS styling.

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
You need to have Node.js and npm (or yarn) installed on your machine.

Node.js (which includes npm)

Installation
Clone the repository:

git clone https://github.com/your-username/your-repo-name.git

Navigate to the project directory:

cd your-repo-name

Install NPM packages:

npm install

Running the Application
To start the development server, run the following command:

npm run dev

This will start the application, and you can view it in your browser, usually at http://localhost:5173.
