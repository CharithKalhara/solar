     const backgroundImages = {
        low: "images/bg-low.jpg",
        medium: "images/bg-medium.jpg",
        high: "images/bg-high.jpg"
      };

      function toggleCard(card) {
        card.classList.toggle("selected");
        updateScore();
      }

      function updateScore() {
        const selectedCards = document.querySelectorAll(".action-card.selected");
        let totalScore = 0;

        selectedCards.forEach(function(card) {
          totalScore += parseInt(card.dataset.points);
        });

        const selectedCount = document.getElementById("selected-count");
        selectedCount.textContent = selectedCards.length + " action" + (selectedCards.length !== 1 ? "s" : "") + " selected";

        updateFeedback(totalScore, selectedCards.length);
      }

      function updateFeedback(score, count) {
        const feedbackBox = document.getElementById("feedback-box");

        if (count === 0) {
          feedbackBox.innerHTML = "<p>Select at least one action above to see your impact score.</p>";
          document.body.style.backgroundImage = "none";
          return;
        }

        let levelText = "";
        let levelClass = "";
        let message = "";
        let bgKey = "";

        if (score >= 15) {
          levelText = "High Impact";
          levelClass = "level-high";
          message = "Excellent! You are making strong clean energy choices and building responsible habits.";
          bgKey = "high";
        } else if (score >= 8) {
          levelText = "Medium Impact";
          levelClass = "level-medium";
          message = "Good progress. You are supporting clean and affordable energy in practical ways.";
          bgKey = "medium";
        } else {
          levelText = "Low Impact";
          levelClass = "level-low";
          message = "A small start is still important. Try selecting more energy-saving actions.";
          bgKey = "low";
        }

        feedbackBox.innerHTML =
          "<div class='score-number'>" + score + " pts</div>" +
          "<p class='level-message " + levelClass + "'>" + levelText + "</p>" +
          "<p>" + message + "</p>" +
          "<p>" + count + " action" + (count !== 1 ? "s" : "") + " selected</p>";

        document.body.style.backgroundImage = "url('" + backgroundImages[bgKey] + "')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";
      }

      function resetAll() {
        const selectedCards = document.querySelectorAll(".action-card.selected");

        selectedCards.forEach(function(card) {
          card.classList.remove("selected");
        });

        updateScore();
      }