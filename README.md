
# 👻 Ghostly AI — The Haunted Story Generator

This is a submission for the [Hacktoberfest Open-Source AI Challenge](https://hacktoberfest.com/).

## 🧠 What I Built

Ghostly AI is a spooky interactive website that generates horror stories inspired by mysterious computers, haunted machines, forgotten memories, and supernatural events.

Users can enter their own story ideas, choose a horror mood, and generate a story through a simple interface.

The project includes an offline, rule-based story generator and an optional integration with Ollama to use a locally running open-weight AI model.

## 🎃 Theme: Ghost in the Machine

This project explores the idea of a mysterious intelligence hiding inside a machine.

A forgotten computer, an unexplained message, or a voice coming from an empty room can become the beginning of a creepy story.

## 🌐 Demo

Add your deployed website link here after publishing it with GitHub Pages.

`https://YOUR-USERNAME.github.io/Ghostly-AI/`

## 💻 Code

Add your GitHub repository link here:

`https://github.com/YOUR-USERNAME/Ghostly-AI`

## 🛠️ How I Built It

The project uses three separate files:

- **HTML:** Creates the structure of the website, including the story input, mood selector, and results section.
- **CSS:** Adds the dark theme, purple neon effects, floating ghost animation, and responsive layout.
- **JavaScript:** Handles user input, story generation, mood selection, and copying generated stories.
- **Ollama (optional):** Connects the website to a locally running open-weight language model for AI-generated horror stories.

### Features

- 👻 Spooky, interactive user interface
- ✍️ Custom story prompts
- 🌑 Multiple horror moods
- 📖 Offline, rule-based story generation
- 🤖 Optional local AI integration
- 🔒 Local inference without sending prompts to a hosted AI provider
- 📋 Copy generated stories

## 🌱 Why Open Innovation Matters

Open innovation gives developers the freedom to experiment, learn, and build without depending entirely on closed AI services.

By using a locally running open-weight model, Ghostly AI can generate stories on a personal computer without sending prompts to an external AI provider. It also gives developers the flexibility to experiment with different models and customize the way stories are generated.

The offline story engine provides a basic experience even without an internet connection or an installed AI model.

This project helped me explore how open technologies can make creative AI applications more accessible, customizable, and privacy-friendly.

## 🚀 How to Run It

1. Clone or download this repository.
2. Open the project folder in VS Code.
3. Run `index.html` using Live Server.
4. Select the offline story engine to generate stories without a model.
5. For AI-powered generation, install [Ollama](https://ollama.com/), download a compatible model, and configure local browser access as needed.

```bash
ollama pull llama3.2
```

Keep Ollama running when using the local AI mode.

## 📂 Project Structure

```text
Ghostly-AI/
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🤝 Built With

- HTML5
- CSS3
- JavaScript
- Ollama and an open-weight language model (optional)

## 👩‍💻 What I Learned

- Building an interactive website with HTML, CSS, and JavaScript
- Handling user input and dynamically displaying content
- Creating animations and responsive layouts
- Exploring local AI models and the value of open innovation

---

**Made with curiosity, code, and a little bit of darkness. 👻**
