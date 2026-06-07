const galleryItems = document.querySelectorAll(".gallery-item");
        const modal = document.getElementById("galleryModal");
        const closeModal = document.getElementById("closeModal");
        const modalImage = document.getElementById("modalImage");
        const modalTitle = document.getElementById("modalTitle");
        const modalDescription = document.getElementById("modalDescription");
        const modalBody = document.getElementById("modalBody");
        const themeSelect = document.getElementById("themeSelect");
        const fontSelect = document.getElementById("fontSelect");

        galleryItems.forEach(function(item) {
            item.addEventListener("mouseenter", function() {
                item.classList.add("is-hovered");
            });

            item.addEventListener("mouseleave", function() {
                item.classList.remove("is-hovered");
            });

            item.addEventListener("click", function() {
                const title = item.getAttribute("data-title");
                const image = item.getAttribute("data-image");
                const alt = item.getAttribute("data-alt");
                const description = item.getAttribute("data-description");

                modalTitle.textContent = title;
                modalImage.src = image;
                modalImage.alt = alt;
                modalDescription.textContent = description;

                modal.style.display = "flex";
                modal.setAttribute("aria-hidden", "false");
            });
        });

        closeModal.addEventListener("click", function() {
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
        });

        modal.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
                modal.setAttribute("aria-hidden", "true");
            }
        });

        themeSelect.addEventListener("change", function() {
            modalBody.classList.remove("theme-light", "theme-dark");

            if (themeSelect.value === "dark") {
                modalBody.classList.add("theme-dark");
            } else {
                modalBody.classList.add("theme-light");
            }
        });

        fontSelect.addEventListener("change", function() {
            modalBody.classList.remove("font-sans", "font-serif");

            if (fontSelect.value === "serif") {
                modalBody.classList.add("font-serif");
            } else {
                modalBody.classList.add("font-sans");
            }
        });