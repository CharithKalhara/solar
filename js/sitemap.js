/**
 * sitemap.js
 * JavaScript for the Sitemap Page (Student 4 - Mavinu)
 * SDG 7: Affordable and Clean Energy
 *
 * Handles hover highlight effects on SVG nodes using JavaScript event listeners.
 * CSS :hover is also applied, but JS adds dynamic aria-label feedback.
 */

document.addEventListener("DOMContentLoaded", function () {

  /* ── Get all SVG node groups ──────────────────────────────────────────── */
  // Each clickable node has class "site-node"
  var nodes = document.querySelectorAll(".site-node");

  nodes.forEach(function (node) {

    /* Mouse enter – highlight node */
    node.addEventListener("mouseenter", function () {
      var rect = node.querySelector("rect, circle");
      if (rect) {
        // Store original fill so we can restore it
        node.dataset.origFill = rect.getAttribute("fill");
        rect.setAttribute("fill", "#f4c400"); // highlight with site yellow
      }
      var txt = node.querySelector("text");
      if (txt) txt.setAttribute("font-weight", "bold");
    });

    /* Mouse leave – restore original fill */
    node.addEventListener("mouseleave", function () {
      var rect = node.querySelector("rect, circle");
      if (rect && node.dataset.origFill) {
        rect.setAttribute("fill", node.dataset.origFill);
      }
      var txt = node.querySelector("text");
      if (txt) txt.setAttribute("font-weight", "normal");
    });

    /* Focus (keyboard navigation) – same as hover */
    node.addEventListener("focus", function () {
      var rect = node.querySelector("rect, circle");
      if (rect) {
        node.dataset.origFill = rect.getAttribute("fill");
        rect.setAttribute("fill", "#f4c400");
        rect.setAttribute("stroke", "#003b75");
        rect.setAttribute("stroke-width", "3");
      }
    });

    /* Blur (keyboard navigation) – restore */
    node.addEventListener("blur", function () {
      var rect = node.querySelector("rect, circle");
      if (rect && node.dataset.origFill) {
        rect.setAttribute("fill", node.dataset.origFill);
        rect.setAttribute("stroke", "#003b75");
        rect.setAttribute("stroke-width", "1.5");
      }
    });
  });
});
