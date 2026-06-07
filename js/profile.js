/**
 * profile.js
 * JavaScript for the User Profile Page (Student 4 - Mavinu)
 * SDG 7: Affordable and Clean Energy
 * Handles step-by-step prompt collection, DOM updates, and progress tracking.
 *
 * IMPACT LEVELS (used in step progression):
 * - Step 1 completes → 33%
 * - Step 2 completes → 66%
 * - Step 3 completes → 100%
 * Skipped prompts reduce the count of answered questions proportionally.
 */

/* ── Profile data store ──────────────────────────────────────────────────── */
// Object to hold all user responses; null = not yet answered / skipped
var profileData = {
  // Step 1 – Basic Details
  name:       null,
  university: null,
  role:       null,

  // Step 2 – Energy Interests
  favEnergy:  null,
  dailyUsage: null,
  awareness:  null,

  // Step 3 – Actions & Commitments
  action1:    null,
  action2:    null,
  pledge:     null
};

// Track which steps have been started/completed
var stepStatus = { 1: "pending", 2: "pending", 3: "pending" };

/* ── Utility helpers ─────────────────────────────────────────────────────── */

/**
 * Counts how many profile fields are filled (non-null, non-empty).
 * Used to compute progress percentage.
 * @returns {number} count of answered prompts
 */
function countAnswered() {
  var total = 0;
  for (var key in profileData) {
    if (profileData[key] !== null && profileData[key] !== "") {
      total++;
    }
  }
  return total;
}

/**
 * Calculates completion percentage.
 * Total possible = 9 prompts across 3 steps.
 * @returns {number} percentage 0–100
 */
function calcProgress() {
  return Math.round((countAnswered() / 9) * 100);
}

/**
 * Updates the progress bar and text on the page.
 */
function updateProgress() {
  var pct = calcProgress();
  var bar = document.getElementById("progress-fill");
  var label = document.getElementById("progress-label");
  if (bar)   bar.style.width = pct + "%";
  if (label) label.textContent = pct + "% Complete";
}

/**
 * Renders a single profile field row into a given section element.
 * @param {HTMLElement} container - the section div to append into
 * @param {string} label - display label
 * @param {string} value - the stored value
 */
function renderField(container, label, value) {
  if (value === null || value === "") return; // skip unanswered
  var row = document.createElement("div");
  row.className = "profile-row";
  row.innerHTML = "<span class='profile-label'>" + label + ":</span> "
                + "<span class='profile-value'>" + value + "</span>";
  container.appendChild(row);
}

/**
 * Re-renders the profile display area from current profileData.
 * Each step section is shown only when it has at least one answer.
 */
function renderProfile() {
  // Step 1 section
  var s1 = document.getElementById("profile-step1");
  if (s1) {
    s1.innerHTML = "<h3>&#128100; Basic Details</h3>";
    renderField(s1, "Name",       profileData.name);
    renderField(s1, "University", profileData.university);
    renderField(s1, "Your Role",  profileData.role);
    // Show section only if at least one field filled
    s1.style.display = (profileData.name || profileData.university || profileData.role) ? "block" : "none";
  }

  // Step 2 section
  var s2 = document.getElementById("profile-step2");
  if (s2) {
    s2.innerHTML = "<h3>&#9889; Energy Interests</h3>";
    renderField(s2, "Favourite Energy Type", profileData.favEnergy);
    renderField(s2, "Daily Energy Awareness", profileData.dailyUsage);
    renderField(s2, "How You Stay Informed",  profileData.awareness);
    s2.style.display = (profileData.favEnergy || profileData.dailyUsage || profileData.awareness) ? "block" : "none";
  }

  // Step 3 section
  var s3 = document.getElementById("profile-step3");
  if (s3) {
    s3.innerHTML = "<h3>&#127775; Actions & Commitments</h3>";
    renderField(s3, "Clean Energy Action 1", profileData.action1);
    renderField(s3, "Clean Energy Action 2", profileData.action2);
    renderField(s3, "My Pledge",             profileData.pledge);
    s3.style.display = (profileData.action1 || profileData.action2 || profileData.pledge) ? "block" : "none";
  }

  updateProgress();
  updateStepButtons();
}

/**
 * Updates the visual state of the "Revisit Step" buttons.
 * A step button shows "Completed ✓" or "Revisit" depending on stepStatus.
 */
function updateStepButtons() {
  for (var i = 1; i <= 3; i++) {
    var btn = document.getElementById("revisit-btn-" + i);
    if (!btn) continue;
    if (stepStatus[i] === "done") {
      btn.textContent = "Revisit Step " + i + " ✓";
      btn.classList.add("done");
    } else if (stepStatus[i] === "partial") {
      btn.textContent = "Revisit Step " + i + " (partial)";
      btn.classList.remove("done");
    } else {
      btn.textContent = "Start Step " + i;
      btn.classList.remove("done");
    }
  }
}

/* ── Step runners ────────────────────────────────────────────────────────── */

/**
 * Runs Step 1 prompts: Basic Details.
 * User can skip any prompt by pressing Cancel or leaving blank.
 */
function runStep1() {
  var n = prompt("Step 1 of 3 – Basic Details\n\nWhat is your full name?\n(Press Cancel to skip)");
  profileData.name = (n !== null && n.trim() !== "") ? n.trim() : null;

  var u = prompt("Step 1 of 3 – Basic Details\n\nWhat university do you attend?\n(Press Cancel to skip)");
  profileData.university = (u !== null && u.trim() !== "") ? u.trim() : null;

  var r = prompt("Step 1 of 3 – Basic Details\n\nWhat is your role in the group project?\n(e.g. User Profile & Sitemap)\n(Press Cancel to skip)");
  profileData.role = (r !== null && r.trim() !== "") ? r.trim() : null;

  // Determine step completion status
  var answered = [profileData.name, profileData.university, profileData.role].filter(function(v){ return v !== null; }).length;
  if (answered === 3)      stepStatus[1] = "done";
  else if (answered > 0)   stepStatus[1] = "partial";
  // else stays "pending" if all skipped

  renderProfile();
  showStatus("Step 1 saved! " + answered + "/3 questions answered.");
}

/**
 * Runs Step 2 prompts: Energy Interests.
 */
function runStep2() {
  var fe = prompt("Step 2 of 3 – Energy Interests\n\nWhat is your favourite type of clean energy?\n(e.g. Solar, Wind, Hydro)\n(Press Cancel to skip)");
  profileData.favEnergy = (fe !== null && fe.trim() !== "") ? fe.trim() : null;

  var du = prompt("Step 2 of 3 – Energy Interests\n\nHow aware are you of your daily energy usage?\n(e.g. Very aware, Somewhat aware, Not sure)\n(Press Cancel to skip)");
  profileData.dailyUsage = (du !== null && du.trim() !== "") ? du.trim() : null;

  var aw = prompt("Step 2 of 3 – Energy Interests\n\nHow do you stay informed about clean energy news?\n(e.g. Social media, lectures, documentaries)\n(Press Cancel to skip)");
  profileData.awareness = (aw !== null && aw.trim() !== "") ? aw.trim() : null;

  var answered = [profileData.favEnergy, profileData.dailyUsage, profileData.awareness].filter(function(v){ return v !== null; }).length;
  if (answered === 3)      stepStatus[2] = "done";
  else if (answered > 0)   stepStatus[2] = "partial";

  renderProfile();
  showStatus("Step 2 saved! " + answered + "/3 questions answered.");
}

/**
 * Runs Step 3 prompts: Actions & Commitments.
 */
function runStep3() {
  var a1 = prompt("Step 3 of 3 – Actions & Commitments\n\nName one clean energy action you already take:\n(e.g. Turn off lights when leaving, use LED bulbs)\n(Press Cancel to skip)");
  profileData.action1 = (a1 !== null && a1.trim() !== "") ? a1.trim() : null;

  var a2 = prompt("Step 3 of 3 – Actions & Commitments\n\nName one new clean energy action you will commit to:\n(e.g. Use public transport, install solar charger)\n(Press Cancel to skip)");
  profileData.action2 = (a2 !== null && a2.trim() !== "") ? a2.trim() : null;

  var pl = prompt("Step 3 of 3 – Actions & Commitments\n\nWrite your personal clean energy pledge in one sentence:\n(e.g. I pledge to reduce my energy use by 20% this year)\n(Press Cancel to skip)");
  profileData.pledge = (pl !== null && pl.trim() !== "") ? pl.trim() : null;

  var answered = [profileData.action1, profileData.action2, profileData.pledge].filter(function(v){ return v !== null; }).length;
  if (answered === 3)      stepStatus[3] = "done";
  else if (answered > 0)   stepStatus[3] = "partial";

  renderProfile();
  showStatus("Step 3 saved! " + answered + "/3 questions answered.");

  // Show congratulation message if profile is 100% complete
  if (calcProgress() === 100) {
    var conf = document.getElementById("confirmation-msg");
    if (conf) {
      conf.style.display = "block";
      conf.textContent = "🎉 Profile complete! Well done, " + (profileData.name || "Solar Champion") + "! Your clean energy commitment has been recorded.";
    }
  }
}

/* ── Reset ───────────────────────────────────────────────────────────────── */

/**
 * Resets all profile data back to null and clears the UI.
 */
function resetProfile() {
  for (var key in profileData) {
    profileData[key] = null;
  }
  stepStatus = { 1: "pending", 2: "pending", 3: "pending" };

  var conf = document.getElementById("confirmation-msg");
  if (conf) conf.style.display = "none";

  renderProfile();
  showStatus("Profile has been reset. Start again!");
}

/* ── Status message helper ───────────────────────────────────────────────── */

/**
 * Shows a brief status message in the status bar on the page.
 * @param {string} msg - message text to display
 */
function showStatus(msg) {
  var el = document.getElementById("status-msg");
  if (el) {
    el.textContent = msg;
    el.style.display = "block";
    // Auto-hide after 4 seconds
    setTimeout(function() {
      el.style.display = "none";
    }, 4000);
  }
}

/* ── Init ────────────────────────────────────────────────────────────────── */

/**
 * Runs when the DOM is fully loaded.
 * Wires up all button click handlers.
 */
document.addEventListener("DOMContentLoaded", function() {
  // Step buttons
  document.getElementById("btn-step1").addEventListener("click", runStep1);
  document.getElementById("btn-step2").addEventListener("click", runStep2);
  document.getElementById("btn-step3").addEventListener("click", runStep3);

  // Revisit buttons (same functions – they overwrite existing data for that step)
  document.getElementById("revisit-btn-1").addEventListener("click", runStep1);
  document.getElementById("revisit-btn-2").addEventListener("click", runStep2);
  document.getElementById("revisit-btn-3").addEventListener("click", runStep3);

  // Reset button
  document.getElementById("btn-reset").addEventListener("click", resetProfile);

  // Initial render (all sections hidden until data exists)
  renderProfile();
});
