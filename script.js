document.addEventListener("DOMContentLoaded", function () {
    const questionInput = document.getElementById("questionInput");
    const submitButton = document.getElementById("submitQuestion");
    const questionsContainer = document.getElementById("questions-container");
    const owner = localStorage.getItem("owner"); // Get owner from localStorage
    localStorage.setItem("owner", "true");
  
    // Function to save question
    function saveQuestion() {
        const question = questionInput.value.trim();
        if (question) {
            let questions = JSON.parse(localStorage.getItem("questions")) || [];
            questions.push(question);
            localStorage.setItem("questions", JSON.stringify(questions));
            alert("ጥያቄዎ ተልኳል!");
            questionInput.value = ""; // Clear input field
            displayQuestions(); // Refresh display
        }
    }
  
    // Function to delete a question (only for owner)
    function deleteQuestion(index) {
        if (owner) { // Only allow deletion if owner exists
            let questions = JSON.parse(localStorage.getItem("questions")) || [];
            questions.splice(index, 1);
            localStorage.setItem("questions", JSON.stringify(questions));
            displayQuestions(); // Refresh display
        }
    }
  
    // Function to display questions
    function displayQuestions() {
        const questions = JSON.parse(localStorage.getItem("questions")) || [];
        if (questionsContainer) {
            questionsContainer.innerHTML = ""; // Clear previous content
            if (questions.length === 0) {
                questionsContainer.innerHTML = "<p>No questions submitted yet.</p>";
            } else {
                questions.forEach((question, index) => {
                    const questionBox = document.createElement("div");
                    questionBox.classList.add("question-box");
                    questionBox.textContent = `${index + 1}. ${question}`;
                    
                    // If user is the owner, add delete button
                    if (owner) {
                        const deleteButton = document.createElement("button");
                        deleteButton.textContent = "Delete";
                        deleteButton.classList.add("delete-button");
                        deleteButton.onclick = () => deleteQuestion(index);
                        questionBox.appendChild(deleteButton);
                    }
                    
                    questionsContainer.appendChild(questionBox);
                });
            }
        }
    }
  
    // Attach event listener only if elements exist
    if (submitButton) {
        submitButton.addEventListener("click", saveQuestion);
    }
  
    if (questionsContainer) {
        displayQuestions();
    }
  });
 