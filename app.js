document.getElementById("qnaForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const text = document.getElementById("text").value;

    const response = await fetch("http://scag-back-gxeqcvase7gqhucd.eastus-01.azurewebsites.net/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: text })
    });

    if (response.ok) {
        const data = await response.json();
        const outputDiv = document.getElementById("output");
        const questionsContainer = document.getElementById("questionsContainer");
    
        questionsContainer.innerHTML = "";
    
        if (data.questions && data.questions.length > 0) {
            data.questions.forEach((q, index) => {
                const questionDiv = document.createElement("div");
                questionDiv.className = "question-item";
                questionDiv.style.marginBottom = "20px";
    
                questionDiv.innerHTML = `
                    <p><strong>Question ${index + 1}:</strong> ${q.question || "Question not generated"}</p>
                    <ul>
                        ${q.options
                            .map(
                                (option, i) =>
                                    `<li>${String.fromCharCode(65 + i)}. ${option}</li>`
                            )
                            .join("")}
                    </ul>
                    <p><strong>Correct answer:</strong> ${
                        q.correct_answer || "Answer not generated"
                    }</p>
                `;
    
                questionsContainer.appendChild(questionDiv);
            });
    
            outputDiv.style.display = "block";
        } else {
            questionsContainer.innerHTML = "<p>No questions were generated.</p>";
            outputDiv.style.display = "block";
        }
    } else {
        alert("Error generating questions and answers.");
    }
    
});
