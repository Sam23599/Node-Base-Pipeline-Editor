# Node-Base-Pipeline-Editor

A visual, node-based pipeline editor built with React and FastAPI. Create, design, and validate data processing pipelines through an intuitive drag-and-drop interface.

## 🎯 Overview

Node-Base-Pipeline-Editor is a full-stack application that allows users to build complex data processing pipelines using a visual node-based editor. The application provides a rich set of node types for various operations, from basic data input/output to advanced transformations and LLM integrations.

## ✨ Features

- **Visual Pipeline Editor**: Drag-and-drop interface powered by ReactFlow
- **Multiple Node Types**: 
  - **Input**: Data input nodes
  - **LLM**: Large Language Model integration nodes
  - **Output**: Data output nodes
  - **Text**: Text processing nodes
  - **Conditional**: Conditional logic nodes
  - **Calculator**: Mathematical operation nodes
  - **Transform**: Data transformation nodes
  - **Logger**: Logging and debugging nodes
  - **Merge**: Data merging nodes
- **Pipeline Validation**: Backend validation to ensure pipelines form valid Directed Acyclic Graphs (DAGs)
- **Real-time Feedback**: Get instant feedback on pipeline structure and validity
- **Modern UI**: Clean, responsive interface with minimap and controls

## 📸 Screenshots

## Pipeline Editor Interface - 

<img width="1919" height="923" alt="image" src="https://github.com/user-attachments/assets/28b6a8f5-4657-4284-9114-ba26192243be" />

## Submission for the submit pipeline -
- UI
<img width="1916" height="931" alt="image" src="https://github.com/user-attachments/assets/ad296b58-a1e8-4dd7-a704-8a9216f030c3" />

- Api
<img width="1908" height="878" alt="image" src="https://github.com/user-attachments/assets/7bd4da3a-a0cf-469c-9cb4-024f0585e062" />



## 🛠️ Tech Stack

### Backend
- **Python 3.x**
- **FastAPI**: Modern, fast web framework for building APIs
- **Uvicorn**: ASGI server for running FastAPI
- **Pydantic**: Data validation using Python type annotations

### Frontend
- **React 18**: UI library
- **ReactFlow**: Node-based graph visualization library
- **Zustand**: State management
- **Create React App**: Build tooling

## 📋 Prerequisites

- **Python 3.8+**
- **Node.js 14+** and **npm** (or **yarn**)
- A modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Node-Base-Pipeline-Editor
```

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## 🏃 Running the Application

### Start the Backend Server

From the `backend` directory:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

You can also access the interactive API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Start the Frontend Development Server

From the `frontend` directory:

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## 📖 Usage

1. **Add Nodes**: Drag nodes from the "Node Palette" on the left side onto the canvas
2. **Connect Nodes**: Click and drag from a node's output handle to another node's input handle to create connections
3. **Configure Nodes**: Click on nodes to configure their properties (if applicable)
4. **Validate Pipeline**: Click the "Submit" button to validate your pipeline structure
5. **View Results**: The backend will return information about your pipeline including:
   - Number of nodes
   - Number of edges
   - Whether the pipeline forms a valid DAG (no cycles)

## 📁 Project Structure

```
Node-Base-Pipeline-Editor/
├── backend/
│   ├── main.py              # FastAPI application and endpoints
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── nodes/          # Node component definitions
│   │   │   ├── BaseNode.js
│   │   │   ├── inputNode.js
│   │   │   ├── llmNode.js
│   │   │   ├── outputNode.js
│   │   │   ├── textNode.js
│   │   │   ├── conditionalNode.js
│   │   │   ├── calculatorNode.js
│   │   │   ├── dataTransformNode.js
│   │   │   ├── loggerNode.js
│   │   │   └── mergeNode.js
│   │   ├── App.js          # Main application component
│   │   ├── ui.js           # Pipeline UI component
│   │   ├── toolbar.js      # Node palette toolbar
│   │   ├── submit.js       # Submit button component
│   │   ├── store.js        # Zustand state management
│   │   └── draggableNode.js # Draggable node component
│   ├── package.json        # Node.js dependencies
│   └── README.md           # Frontend-specific README
└── README.md               # This file
```

## 🔌 API Documentation

### Endpoints

#### `GET /`
Health check endpoint.

**Response:**
```json
{
  "Ping": "Pong"
}
```

#### `POST /pipelines/parse`
Parse and validate a pipeline structure.

**Request Body:**
```json
{
  "nodes": [
    {
      "id": "string",
      "type": "string",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "data": {}
    }
  ],
  "edges": [
    {
      "id": "string",
      "source": "string",
      "target": "string",
      "sourceHandle": "string",
      "targetHandle": "string"
    }
  ]
}
```

**Response:**
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

**Response Fields:**
- `num_nodes`: Total number of nodes in the pipeline
- `num_edges`: Total number of connections (edges) in the pipeline
- `is_dag`: Boolean indicating whether the pipeline forms a valid Directed Acyclic Graph (no cycles)

## 🎥 Video Tutorial

For a complete walkthrough of the application, including features, usage, and implementation details, please refer to the [full explanation video](https://drive.google.com/file/d/1xBlsAgPNWMYQv71yXO3kZx4QxSy_Mg2w/view?usp=sharing).

## 🔧 Development

### Backend Development

The backend uses FastAPI with automatic reload enabled. Any changes to `main.py` will automatically restart the server.

### Frontend Development

The frontend uses Create React App with hot module replacement. Changes to source files will automatically refresh in the browser.

## 📝 Notes

- The backend validates that pipelines form Directed Acyclic Graphs (DAGs) using Kahn's algorithm
- CORS is enabled for `localhost:3000` and `localhost:3001` to allow frontend-backend communication
- The frontend uses ReactFlow for the graph visualization, which provides features like zoom, pan, minimap, and controls

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is free to use for personal and commercial purposes.

## 👤 Author

**Satyam Singh Virat**

- **Role**: Software Development Engineer in Fintech
- **Email**: [satyam.virat@outlook.com](mailto:satyam.virat@outlook.com)

---

**Built with ❤️ using FastAPI and React**

