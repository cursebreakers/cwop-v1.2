

// Function to fetch OG data from a URL
async function fetchOGData(url) {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
  
    const ogTitle = doc.querySelector('meta[property="og:title"]');
    const ogImage = doc.querySelector('meta[property="og:image"]');
    const favicon = doc.querySelector('link[rel="icon"]');
  
    return {
      title: ogTitle ? ogTitle.getAttribute('content') : '',
      image: ogImage ? ogImage.getAttribute('content') : '',
      favicon: favicon ? favicon.getAttribute('href') : '',
    };
  }
  
  // Populate the grid with share banners and logos
  function populateGridWithBanners() {
    const links = document.querySelectorAll('.toolLnk'); // Updated class name
    links.forEach(async link => {
      const url = link.getAttribute('href');
      const ogData = await fetchOGData(url);
  
      const listItem = link.parentElement;
      
      // Create a container for the share banner and logo
      const bannerContainer = document.createElement('div');
      bannerContainer.classList.add('bannerContainer'); // You can define this class in your CSS
      
      // Create and add the share banner image
      const bannerImage = document.createElement('img');
      bannerImage.src = ogData.image;
      bannerImage.alt = ogData.title;
      bannerContainer.appendChild(bannerImage);
      
      // Create and add the favicon image
      const favicon = document.createElement('img');
      favicon.src = ogData.favicon;
      bannerContainer.appendChild(favicon);
      
      // Add the container to the list item
      listItem.appendChild(bannerContainer);
    });
  }
  
  // Call the function when the page loads
  window.addEventListener('load', populateGridWithBanners);