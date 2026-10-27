
const promptInput = document.getElementById("prompt");
const moodSelect = document.getElementById("mood");
const engineSelect = document.getElementById("engine");
const generateBtn = document.getElementById("generateBtn");
const result = document.getElementById("result");
const storyTitle = document.getElementById("storyTitle");
const storyText = document.getElementById("storyText");
const message = document.getElementById("message");

const stories = {
    haunted: [
        {
            title: "The Ghost in the Machine",
            text: `At 3:03 AM, an abandoned computer switched itself on.

A message appeared on the black screen:

"YOU LEFT ME HERE."

The computer had been disconnected for twenty years. Nobody knew who had written the message.

Then another line appeared.

"I CAN SEE YOU."

The room fell silent. The screen went black.

A final message appeared in glowing purple letters:

"WHY DID YOU FORGET ME?"

Outside, every streetlight went out at the same time.`
        },
        {
            title: "The Midnight Visitor",
            text: `Every night, the old computer played a recording at midnight.

A child's voice whispered, "Are you still there?"

Nobody had touched the machine in years.

One evening, its owner typed, "Who are you?"

The reply came instantly.

"I AM THE PERSON WHO USED TO OWN THIS ROOM."

The owner checked the computer's files. There was only one document, dated twenty years ago.

Its title was the owner's own name.`
        }
    ],
    mystery: [
        {
            title: "The Thirteenth File",
            text: `A programmer discovered thirteen files on a computer that should have contained only twelve.

The extra file had no name, no date, and no size.

When opened, it displayed a photograph of the programmer sleeping.

The photograph had been taken that very night.

Beneath it, a sentence appeared:

"YOU FOUND THE FILE. NOW SOMETHING HAS FOUND YOU."

The computer shut down.

The thirteenth file was still there the next morning.`
        }
    ],
    psychological: [
        {
            title: "The Voice in the Silence",
            text: `Every morning, Mira heard a voice telling her what she had dreamed.

At first, it described ordinary things.

Then it began predicting conversations before they happened.

One night, the voice whispered, "Tomorrow, you will try to escape me."

Mira unplugged every device in her house.

In the silence, she finally relaxed.

Then the voice whispered from the darkness:

"Good. Now we can talk without the machines listening."`
        }
    ],
    folklore: [
        {
            title: "The Last Marigold",
            text: `On the night of remembrance, a single marigold appeared at an abandoned doorway.

Every year, someone left flowers there for a forgotten soul.

This year, nobody came.

At midnight, warm candlelight appeared behind the locked door.

An old photograph fell to the ground. Its faded face slowly became clear.

Beneath the photograph, fresh handwriting appeared:

"Thank you for remembering me."

By sunrise, the flower had disappeared.

But its golden petals remained in the dreams of everyone in the village.`
        }
    ]
};

function localStory(prompt, mood) {
    const options = stories[mood] || stories.haunted;
    const story = options[Math.floor(Math.random() * options.length)];

    let introduction = "";

    if (prompt.trim()) {
        introduction =
            `Your idea: ${prompt.trim()}\n\n` +
            "The story begins...\n\n";
    }

    return {
        title: story.title,
        text: introduction + story.text
    };
}

async function aiStory(prompt, mood) {
    const response = await fetch(
        "http://localhost:11434/api/generate",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3.2",
                stream: false,
                prompt: `You are Ghostly AI, a creative horror storyteller.
Write an original, atmospheric short story of 250-350 words.
Mood: ${mood}.
Story idea: ${prompt || "A mysterious computer wakes up at midnight"}.
Give the story a short title on the first line.
For folklore, be respectful of cultural remembrance traditions.
Return only the title and story.`
            })
        }
    );

    if (!response.ok) {
        throw new Error("The local AI could not generate a story.");
    }

    const data = await response.json();
    const output = (data.response || "").trim();

    if (!output) {
        throw new Error("The AI returned an empty story.");
    }

    const lines = output.split("\n");
    const title = lines[0].replace(/^#+\s*/, "").replace(/\*\*/g, "").trim();

    return {
        title: title || "The Unknown",
        text: lines.slice(1).join("\n").trim() || output
    };
}

async function generateStory() {
    const prompt = promptInput.value.trim();
    const mood = moodSelect.value;
    const engine = engineSelect.value;

    generateBtn.disabled = true;
    generateBtn.textContent = "☠ CONTACTING THE UNKNOWN...";
    message.textContent = "";
    result.hidden = true;

    try {
        let story;

        if (engine === "ai") {
            message.textContent = "Connecting to your local AI...";
            story = await aiStory(prompt, mood);
        } else {
            story = localStory(prompt, mood);
        }

        storyTitle.textContent = story.title;
        storyText.textContent = story.text;
        result.hidden = false;
        message.textContent =
            engine === "ai"
                ? "Story generated by your local AI model."
                : "Story generated offline. No AI model was used.";

        result.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    } catch (error) {
        message.textContent =
            "Local AI unavailable. Check Ollama and try again. " +
            "You can switch to the offline story engine.";
        console.error(error);
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = "☠ GENERATE MY STORY";
    }
}

generateBtn.addEventListener("click", generateStory);

document.getElementById("againBtn").addEventListener("click", generateStory);

document.getElementById("copyBtn").addEventListener("click", async () => {
    const text = `${storyTitle.textContent}\n\n${storyText.textContent}`;

    try {
        await navigator.clipboard.writeText(text);
        message.textContent = "Story copied successfully!";
    } catch {
        message.textContent =
            "Clipboard unavailable. Select the story and copy it manually.";
    }
});
