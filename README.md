# 🚀 WebLane
Create fullstack websites with a simple prompt.

## 📌 Problem Statement
Problem Statement - Weave AI Magic with Groq

## 🎯 Objective
WebLane solves the challenge of web development accessibility by allowing anyone to create beautiful, functional websites using just natural language prompts. It serves both non-technical users who need websites but lack coding skills, and developers looking to quickly prototype ideas.

Our platform transforms text descriptions into fully-functional, production-ready websites using the power of AI, democratizing web development and drastically reducing the time from concept to deployment.

## 🧠 Team & Approach
**Team Name:**
    Solo 

**Team Members:**
- Gaurav Chaudhary 
   X =  https://x.com/GauravC18959107?t=9zYkQqvjjy-QiWOwyO2KMQ&s=09

  LinkedIn = https://www.linkedin.com/in/mrnobody-flex-680baa215?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app

**Our Approach:**
I choose this problem because website creation remains a significant barrier for many individuals and small businesses. Our solution leverages the capabilities of large language models to bridge this gap, making web development accessible to everyone regardless of technical background.

Key challenges we addressed include:
- Translating natural language descriptions into structured code
- Building a WebContainer system for real-time website preview
- Creating an intuitive UI that works for both beginners and developers
- Ensuring the generated websites follow modern design principles and best practices

## 🛠️ Tech Stack
**Core Technologies Used:**
- **Frontend:** React, TypeScript, Tailwind CSS, Monaco Editor
- **Backend:** Node.js, Express
- **AI Integration:** Groq API
- **In-Browser Runtime:** WebContainer API
- **Containerization:** Docker

**Technologies Used:**
- ✅ **Groq:** Used as the primary LLM provider for natural language processing and code generation, specifically utilizing the qwen-qwq-32b model for optimal performance in generating web applications.

## ✨ Key Features
- ✅ **AI-Powered Website Generation** - Create complete websites by describing what you want in natural language
- ✅ **Interactive Builder Interface** - View and edit generated code with a professional code editor
- ✅ **Real-time Preview** - See your website come to life as you make changes
- ✅ **File Explorer** - Navigate through your project's file structure with ease
- ✅ **Conversational Refinement** - Iteratively improve your website by chatting with our AI assistant


## 📽️ Demo & Deliverables
- **Demo Video Link:**   https://youtu.be/iZuCWX8ddR4
- **Pitch Deck / PPT Link:** https://drive.google.com/file/d/15SY2TLlA4T-yskr5C708nwY-ejOu0mCw/view?usp=sharing

## ✅ Tasks & Bonus Checklist
- [✅] All the bonus tracks I have completed each and everything 

## 🧪 How to Run the Project
**Requirements:**
- Node.js v18+
- npm or yarn
- Groq API Key

**Environment Setup:**
1. Create a `.env` file in the `/backend` directory with:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

**Local Setup:**
```bash
# Clone the repo
git clone https://github.com/ANAMASGARD/weblane.git

# Install backend dependencies
cd weblane/backend
npm install

# Start the backend server
npm run dev

# In a new terminal, install and run the frontend
cd ../frontend
npm install
npm run dev
```

**Docker Setup:**
```bash
# Build and run using Docker
docker build -t weblane .
docker run -p 8080:8080 -e GROQ_API_KEY=your_groq_api_key_here weblane
```

## 🧬 Future Scope
- **Enhanced Code Editing** - Allow direct code editing with intelligent suggestions
- **Template Library** - Pre-built templates to use as starting points
- **Export Options** - Download your project or deploy directly to hosting services
- **Multi-page Support** - Create more complex websites with multiple interconnected pages
- **Component Library** - Reusable UI components to enhance website functionality

## 📎 Resources / Credits
- [Groq API](https://console.groq.com/) - AI language model powering the code generation
- [WebContainer API](https://github.com/stackblitz/webcontainer-api) - In-browser runtime for website preview
- [Monaco Editor](https://github.com/microsoft/monaco-editor) - Code editor component
- [Lucide React](https://lucide.dev/) - Icon library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 🏁 Final Words
WebLane represents our vision for a future where website creation is accessible to everyone. Our hackathon journey involved overcoming significant technical challenges, particularly in implementing the WebContainer integration and ensuring smooth communication between the frontend and AI backend.

We're proud of creating a tool that makes the power of AI truly accessible and practical, demonstrating how emerging technologies can solve real-world problems and empower users without technical backgrounds.
