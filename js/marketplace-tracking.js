// Track outbound marketplace clicks consistently across all pages.
(function () {
  function trackMarketplaceClick(link) {
    if (!window.gtag) return;

    var marketplace = link.getAttribute("data-marketplace") || "unknown";
    var location = link.getAttribute("data-marketplace-location") || "unspecified";
    var destination = link.getAttribute("href") || "";

    window.gtag("event", "marketplace_click", {
      marketplace: marketplace,
      marketplace_location: location,
      destination_url: destination,
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title,
      transport_type: "beacon"
    });
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("[data-marketplace]");
    if (!link) return;
    trackMarketplaceClick(link);
  });
})();
