// search-config.js

const SEARCH_PAGES = [
  // Core pages
  { title: "About Us", file: "about_us.html" },

  // Fashion industry pages
  { title: "Fashion Industry Overview", file: "businesses/fashion/fashion.html" },
  { title: "Australian Stitch", file: "businesses/fashion/Australianstitch.html" },
  { title: "Espire Clothing", file: "businesses/fashion/espireclothing.html" },
  { title: "FAYT The Label", file: "businesses/fashion/faytthelabel.html" },

  // Infrastructure & Industry
  { title: "Infrastructure & Industry Overview", file: "businesses/Infrastructure & Industry/Infrastructure_and_Industry.html" },
  { title: "AGL Energy Limited", file: "businesses/Infrastructure & Industry/AGL.html" },
  { title: "ALS Limited", file: "businesses/Infrastructure & Industry/ALS.html" },
  { title: "Amcor plc", file: "businesses/Infrastructure & Industry/AMC.html" },
  { title: "Ampol Limited", file: "businesses/Infrastructure & Industry/ALD.html" },

  // Finance
  { title: "Finance & Banking", file: "businesses/finance/Finance.html" },

  // Example directory
  { title: "Ethical Threads", file: "businesses/Example/ethical-threads.html" }
];

const SEARCH_SETTINGS = {
  placeholder: "Search businesses, sectors, or topics...",
  minChars: 2
};
