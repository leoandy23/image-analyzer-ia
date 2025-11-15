# 📘 **Image Analyzer IA**

## 🚀 Overview

Image Analyzer IA is a full-stack web application that allows users to upload an image and receive visual tags powered by an AI Vision API.
The project includes:

- A **Node.js + Express** backend that processes image uploads and connects to OpenAI Vision.
- A **React + TypeScript + Vite** frontend that provides a modern UI with preview, drag & drop, progress bar, and a clean visualization of detected tags.
- Optional extras that increase technical quality: **Docker support** and **automated tests**.

---

## 🧱 **Tech Stack**

### **Backend**

- Node.js
- Express
- TypeScript
- Multer
- OpenAI API
- Jest + Supertest
- Docker

### **Frontend**

- React
- TypeScript
- Vite
- Axios
- CSS (custom design)

---

## 📁 **Project Structure**

```
image-analyzer-ia/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── tests/
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   └── App.tsx
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml
└── README.md
```

---

## 🔧 **Backend Setup**

### **1. Install dependencies**

```bash
cd backend
npm install
```

### **2. Configure environment variables**

Create a `.env` file inside `/backend`:

```
OPENAI_API_KEY=your-openai-api-key
PORT=3000
```

### **3. Run the backend**

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

### **4. Test the API**

Health:

```
GET http://localhost:3000/health
```

Image analysis (POST):

- Endpoint: `/api/analyze`
- Form-data key: `image`
- Accepts: JPG, PNG, WEBP
- Max size: 5MB

---

## 🎨 **Frontend Setup**

### **1. Install dependencies**

```bash
cd frontend
npm install
```

### **2. Run the frontend**

```bash
npm run dev
```

Then open:

```
http://localhost:5173
```

### **3. Features**

- Drag & drop upload
- File selection UI
- Live preview
- Animated progress bar
- AI-generated tags visualization
- Error messages
- Responsive design

---

## 🐳 **Run With Docker**

From the project root:

### **1. Build the images**

```bash
docker compose build
```

### **2. Start the services**

```bash
docker compose up
```

### **3. Access the app**

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000/health](http://localhost:3000/health)

The frontend communicates with the backend automatically.

---

## 🧪 **Testing (Backend)**

The backend includes automated tests for core behavior.

### **Run tests:**

```bash
cd backend
npm test
```

### **Coverage**

- `/health` endpoint
- File validation
- Upload errors
- Successful analysis using mocked OpenAI service

No external calls are made during tests.

---

## 📌 **Environment Variables**

| Variable       | Description                  |
| -------------- | ---------------------------- |
| OPENAI_API_KEY | API key for OpenAI Vision    |
| PORT           | Backend port (default: 3000) |
