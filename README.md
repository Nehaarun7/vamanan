# 🪷 Vamanan GPT — The Clever Little Guide

> *"Moonnu adi mathi!"* 😌

An immersive AI chatbot experience inspired by Lord Vamana and the Onam/Mahabali story of Kerala. Built for the **TinkerHub Toc H Kochi** competition at **Toc H Institute of Science & Technology**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **Vamanan Chatbot** | AI persona with custom personality — playful, witty, culturally-aware |
| 🌼 **Onam Knowledge Hub** | 9 interactive cultural cards (Pookalam, Sadya, Mahabali, and more) |
| 📖 **Story Mode** | 8-chapter immersive narrative of the Mahabali–Vamana legend |
| 🎮 **Mini Games** | Onam quiz, Vamanan's riddles, and Onam wish generator |
| 🎉 **Wish Generator** | Personalized Onam greetings in English, Malayalam & Manglish |
| 🎤 **Voice Interaction** | Speech-to-text input + text-to-speech responses (browser-native) |
| 👣 **Three Steps Feature** | Guided journey through Kerala culture with rewards |
| ✨ **Daily Vamanan** | Daily thought, joke, wisdom and mini story |
| 🟡 **Fallback Mode** | Works fully without an API key using smart predefined responses |

---

## 🛠 Tech Stack

- **Frontend:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + Inline styles
- **Routing:** React Router v7
- **Icons:** Lucide React
- **AI:** OpenAI GPT-3.5 Turbo (configurable)
- **Build:** Vite 8
- **Storage:** LocalStorage (chat history + user name)
- **Fonts:** Playfair Display + Poppins (Google Fonts)

---

## 🧠 How Vamanan's Personality Works

1. **Personality Engine** — A detailed system prompt defines Vamanan's character: playful, clever, never robotic
2. **Mode System** — 6 modes (Onam Friend, Storyteller, Wise, Mischief, Game, Wishes) adapt responses
3. **Language Detection** — Responds in English, Malayalam, Manglish, or mixed — matching the user
4. **Memory** — Remembers user name and conversation context within the session
5. **Fallback Mode** — 15+ topic-matched predefined responses when no API key is configured

---

## 🚀 Local Development

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/vamanan.git
cd vamanan

# 2. Install dependencies
npm install

# 3. Set up environment (optional — app works in fallback mode without it)
cp .env.example .env
# Add your OpenAI API key to .env

# 4. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
# Option 1 — Direct OpenAI key (development only)
VITE_OPENAI_API_KEY=sk-...

# Option 2 — Your own backend API URL (production)
VITE_API_URL=https://your-api.vercel.app
```

> ⚠️ **Never commit `.env` to git.** The app works in fallback mode without any API key.

---

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Deploy to Vercel

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Set environment variable `VITE_OPENAI_API_KEY` in Vercel dashboard
4. Deploy — done!

**Build settings (auto-detected):**
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── VamananAvatar.tsx     # Animated SVG avatar
│   ├── Navbar.tsx            # Responsive navigation
│   ├── ChatMessage.tsx       # Message bubbles
│   ├── ChatInput.tsx         # Input with voice support
│   ├── ModeSelector.tsx      # 6 personality modes
│   ├── FloatingPetals.tsx    # Animated background petals
│   ├── ThreeSteps.tsx        # Signature interactive feature
│   └── DailyVamanan.tsx      # Daily content card
├── pages/
│   ├── Home.tsx              # Landing page
│   ├── Chat.tsx              # Main chat interface
│   ├── Onam.tsx              # Cultural knowledge hub
│   ├── Story.tsx             # 8-chapter story mode
│   ├── Games.tsx             # Quiz, riddles, wish generator
│   └── About.tsx             # About page
├── services/
│   └── aiService.ts          # AI API integration
├── data/
│   ├── vamananPersonality.ts # System prompt + mode prompts
│   ├── fallbackResponses.ts  # Offline response engine
│   └── onamData.ts           # Onam cards, story, quiz data
├── hooks/
│   ├── useChat.ts            # Chat state + localStorage
│   └── useSpeech.ts          # Voice input/output
└── index.css                 # Global styles + animations
```

---

## 🌸 About

**Vamanan GPT** brings Kerala's Onam spirit into an interactive AI experience — combining storytelling, culture, humor and modern conversational AI.

Built for **TinkerHub Toc H Kochi** · **Toc H Institute of Science & Technology**

> *This project is an independent creative work for a student competition, inspired by Kerala's Onam festival.*

---

*Moonnu adi kond universe cover cheyyaam! 😌🌼*
