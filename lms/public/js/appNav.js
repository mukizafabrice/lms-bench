document.addEventListener("DOMContentLoaded", function () {
	// Remove/hide PUBLIC section nodes if present
	// Remove nodes that have a visible label "PUBLIC" (case-insensitive)
	document
		.querySelectorAll(".sidebar-header, .public-label")
		.forEach(function (el) {
			if ((el.textContent || "").trim().toLowerCase() === "public") {
				var parent = el.closest(".sidebar-section") || el.parentElement;
				if (parent) parent.remove();
				else el.remove();
			}
		});

	// Fallback: if a sidebar section contains the word PUBLIC in text
	document.querySelectorAll(".sidebar-section").forEach(function (sec) {
		if ((sec.textContent || "").toLowerCase().includes("public")) {
			sec.remove();
		}
	});

	// Style the LMS menu item: find link whose visible text is exactly 'LMS'
	var found = false;
	document
		.querySelectorAll(
			".sidebar-link, .desk-sidebar-item, .sidebar-item-label",
		)
		.forEach(function (el) {
			var text = (el.textContent || "").trim();
			if (!text) return;
			if (text === "LMS" || text.toLowerCase() === "lms") {
				// prefer adding class on the clickable link if present
				if (
					el.classList &&
					(el.classList.contains("sidebar-link") ||
						el.classList.contains("desk-sidebar-item"))
				) {
					el.classList.add("lms-custom");
				} else {
					var link =
						el.closest(".sidebar-link") ||
						el.querySelector(".sidebar-link");
					if (link) link.classList.add("lms-custom");
				}
				found = true;
			}
		});

	// If not found, try by href containing '/lms' or 'lms'
	if (!found) {
		var alt = document.querySelector('[href*="/lms"],[href*="lms"]');
		if (alt) alt.classList.add("lms-custom");
	}
});
