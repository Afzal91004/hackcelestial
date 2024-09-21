// Establish connection with the server
const socket = io();

// Get DOM elements
const clientsTotal = document.getElementById('clients-total');
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-from');
const messageInput = document.getElementById('message-input');
const messageTone = new Audio('/message-tone.mp3')

// Handle form submission
messageForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission
    sendMessage(); // Call the sendMessage function
});

// Listen for the 'clients-total' event from the server
socket.on('clients-total', data => {
    console.log('Total clients received:', data);
    clientsTotal.innerText = `Total clients: ${data}`; // Update the client count
});

// Check for connection errors
socket.on('connect_error', (error) => {
    console.error('Connection Error:', error); // Log any connection errors
});

// Function to send a message
function sendMessage() {
    const messageText = messageInput.value.trim(); // Get and trim the input value

    if (messageText === '') return; // Prevent sending empty messages

    const data = {
        name: nameInput.value,
        message: messageText,
        dateTime: new Date()
    };

    socket.emit('message', data); // Send message to server
    addMessageToUI(true, data); // Add message to UI as own message
    messageInput.value = ''; // Clear the input field
}

// Listen for incoming chat messages
socket.on('chat-message', (data) => {
    messageTone.play()
    addMessageToUI(false, data); // Add incoming message to UI
});

// Function to add a message to the UI
function addMessageToUI(isOwnMessage, data) {
    // clearFeedback()
    const element = `
        <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
            <p class="message">
                ${data.message} <span>${data.name} &#x2022; ${moment(data.dateTime).fromNow()}</span>
            </p>
        </li>`;

    // Append the new message to the message container
    messageContainer.insertAdjacentHTML('beforeend', element);
    scrollToBottom()
}

//Define to get the container automatically scrolled
function scrollToBottom() {
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}

//to get who is tying in the container
messageInput.addEventListener('focus', (e) => {
    socket.emit('feedback', {
        feedback: `✍️${nameInput.value} is typing a message`,
    })
})

messageInput.addEventListener('keypress', (e) => {
    socket.emit('feedback', {
        feedback: `✍️${nameInput.value} is typing a message`,
    })
})
messageInput.addEventListener('blur', (e) => {
        socket.emit('feedback', {
            feedback: ``,
        })
    })
    //message is going out from here
socket.on('feedback', (data) => {
    // clearFeedback()
    const element = `
        <li class="message-feedback">
            <p class="feedback" id="feedback">
                ${data.feedback}
            </p>
        </li>`;

    //append this to the message container
    messageContainer.innerHTML += element;
});

//to clear the previous feedback
// function clearFeedback() {
//     document.querySelectorAll('li.message-feedback').forEach(element => {
//         element.parentNode.removeChild(element)
//     })
// }