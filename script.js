const chatOutput = document.getElementById("chat-output");
const chatboxContainer = document.getElementById("chatbox-container");
let conversationStep = 0;
let userInfo = {};  // To store user data (name, email, etc.)

// Function to toggle the chatbot window
function toggleChat() {
    const isChatVisible = chatboxContainer.style.display === "block";
    chatboxContainer.style.display = isChatVisible ? "none" : "block";
}

// Function to send a message
function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    
    if (userInput === "") return; // Avoid empty messages

    addMessage(userInput, "user");
    document.getElementById("user-input").value = ""; // Clear input field
    
    // Simulate bot response with a delay
    setTimeout(() => {
        processChat(userInput.toLowerCase());
    }, 1000); // Delay bot response for 1 second
}

// Function to add message to the chat window
function addMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender);
    
    // Ensure each message appears in a new line
    messageDiv.innerHTML = message.replace(/\n/g, "<br>");
    
    chatOutput.appendChild(messageDiv); 
    messageDiv.scrollIntoView({ behavior: 'smooth' });
}


// Handle conversation flow
function processChat(input) {
    if (conversationStep === 0) {
        if (input.includes("hi")) {
            addMessage("Hello! Welcome to our 'Addition and Remodels' Service Page.\nHow Can I Assist You Today?", "bot");
            conversationStep++;
        } else {
            addMessage("Sorry, I don't understand that question.", "bot");
        }
    } else if (conversationStep === 1) {
        if (input.includes("help")) {
            addMessage("Sure, I'd be happy to help! What type of project is this?\nHere are the options:", "bot");
            displayOptions(["Basement remodeling", "Garage Remodeling", "Addition and Remodeling", "Room addition"]);
            conversationStep++;
        } else {
            addMessage("Sorry, I don't understand that question.", "bot");
        }
    } else if (conversationStep === 2) {
        if (input.includes("garage")) {
            addMessage("Got it! What kind of location is this?\nHere are the options:", "bot");
            displayOptions(["Home", "Business"]);
            conversationStep++;
        } else {
            addMessage("Sorry, I don't understand that question.", "bot");
        }
    } else if (conversationStep === 3) {
        if (input.includes("home")) {
            addMessage("Great! Please provide your zip code.", "bot");
            conversationStep++;
        } else {
            addMessage("Sorry, I don't understand that question.", "bot");
        }
    } else if (conversationStep === 4) {
        if (input.length === 6 && !isNaN(input)) {  // Basic check for a valid zip code (5 digits)
            userInfo.zip = input;
            addMessage(`Thank you for your zip code: ${input}`, "bot");
            addMessage("Next, what is your name?", "bot");
            conversationStep++;
        } else {
            addMessage("Please provide a valid zip code.", "bot");
        }
    } else if (conversationStep === 5) {
        if (input.trim() !== "") {
            userInfo.name = input;
            addMessage(`Thank you: ${input}`, "bot");
            addMessage("Please provide your email and phone number.", "bot");
            conversationStep++;
        } else {
            addMessage("Please provide a valid name.", "bot");
        }
    } else if (conversationStep === 6) {
        const [email, phone] = input.split(" ");
        if (email && phone) {
            userInfo.email = email;
            userInfo.phone = phone;
            addMessage("Thank you for your email and phone number.", "bot");
            addMessage("Lastly, what is your full address?", "bot");
            conversationStep++;
        } else {
            addMessage("Please provide both an email and a phone number.", "bot");
        }
    } else if (conversationStep === 7) {
        if (input.trim() !== "") {
            userInfo.address = input;
            addMessage("Thank you for your address.\nHere's a summary of the information you've provided:", "bot");
            displaySummary();
        } else {
            addMessage("Please provide a valid address.", "bot");
        }
    }
}

// Display options as clickable buttons
function displayOptions(options) {
    options.forEach(option => {
        const optionDiv = document.createElement("div");
        optionDiv.textContent = option;
        optionDiv.classList.add("option");
        optionDiv.onclick = () => {
            document.getElementById("user-input").value = option;
            sendMessage();
        };
        chatOutput.appendChild(optionDiv);
    });
}

// Function to display user information in summary form
function displaySummary() {
    const summaryForm = document.createElement("form");
    summaryForm.innerHTML = `
        <div><strong>Name:</strong> ${userInfo.name}</div>
        <div><strong>Email:</strong> ${userInfo.email}</div>
        <div><strong>Phone:</strong> ${userInfo.phone}</div>
        <div><strong>Address:</strong> ${userInfo.address}</div>
        <div><strong>Zip Code:</strong> ${userInfo.zip}</div>
        <button type="submit">Submit</button>
    `;
    chatOutput.appendChild(summaryForm);
    summaryForm.scrollIntoView({ behavior: 'smooth' });  // Smooth scroll for summary
}

