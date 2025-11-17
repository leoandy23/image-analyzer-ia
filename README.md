# 📘 **Image Analyzer IA**

## 🚀 Overview

Image Analyzer IA is a full-stack web application that allows users to upload an image and receive visual tags powered by an AI Vision API.
The project includes:

- A **Node.js + Express** backend that processes image uploads and connects to OpenAI Vision
- A **React + TypeScript + Vite** frontend with preview, drag & drop, progress bar, and tag visualization

---

# 🔧 **Requirements**

Before running the project, install:

- **Node.js v18+** (recommended: Node.js 18 LTS)
- **npm v8+** (bundled with Node)

You can check your versions with:

```bash
node -v
npm -v
```

---

## 🧱 **Tech Stack**

### **Backend**

- Node.js v18
- Express
- TypeScript
- Multer
- OpenAI API
- Jest + Supertest
- Docker

### **Frontend**

- React v18
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

# 🔧 **Backend Setup**

### **1. Install dependencies**

```bash
cd backend
npm install
```

### **2. Configure environment variables**

Inside `/backend`, create a `.env` file:

```
OPENAI_API_KEY=your-openai-api-key
PORT=3000
```

### **3. Run the backend**

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

### **4. API Endpoints**

Health:

```
GET http://localhost:3000/health
```

Image analysis:

- **POST** `/api/analyze`
- Form-data key: `image`
- Accepted formats: **JPG, PNG, WEBP**
- Max size: **5 MB**

---

# 🎨 **Frontend Setup**

### **1. Install dependencies**

```bash
cd frontend
npm install
```

### **2. Run the frontend**

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

### **Features**

- Drag & drop upload
- Image preview
- Progress bar with steps
- AI-generated tags with confidence level
- Responsive design
- Error feedback for invalid files or failures

---

# 🐳 **Docker Setup**

From the project root:

### **1. Build containers**

```bash
docker compose build
```

### **2. Start containers**

```bash
docker compose up
```

### **3. Access**

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000/health](http://localhost:3000/health)

The frontend interacts with the backend without extra configuration.

---

# 🧪 **Backend Testing**

Automated tests are included for core behavior.

### **Run tests:**

```bash
cd backend
npm test
```

### **Covered Scenarios**

- `/health` endpoint
- Missing file
- Invalid file type
- Valid file with mocked OpenAI response

Tests run offline without external API calls.

---

# 📌 **Environment Variables**

| Variable       | Description                  |
| -------------- | ---------------------------- |
| OPENAI_API_KEY | API key for OpenAI Vision    |
| PORT           | Backend port (default: 3000) |

# 🖼️ **Image Analyzer IA - Demo**

https://1drv.ms/v/c/fe0a5dd3f414da9f/EbmAV3qrLFBLsws0VaMyDBgB1Vl1D4FwV0pCPoWfoJdppw?e=e5uJB0
