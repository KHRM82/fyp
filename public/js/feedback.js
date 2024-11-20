document.addEventListener("DOMContentLoaded", () => {
  const feedbackForm = document.getElementById("feedbackForm");
  const feedbackAlert = document.getElementById("feedbackAlert");
  const feedbackList = document.getElementById("feedbackList");

  feedbackForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const feedback = document.getElementById("feedback").value;

    try {
      const response = await fetch("/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback }),
      });

      const result = await response.json();
      feedbackAlert.classList.remove("d-none");
      feedbackAlert.innerText = result.message;

      const feedbackItem = document.createElement("div");
      feedbackItem.className = "card my-3";
      feedbackItem.innerHTML = `
        <div class="card-body">
          <p class="card-text">${result.feedback.feedback}</p>
        </div>
      `;
      feedbackList.appendChild(feedbackItem);

      setTimeout(() => {
        feedbackAlert.classList.add("d-none");
      }, 3000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }

    feedbackForm.reset();
  });
});
