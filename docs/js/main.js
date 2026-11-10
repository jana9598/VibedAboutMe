/**
 * Library page JavaScript - handles tab switching with hash routing
 * Follows CONVENTIONS.md guidelines: no inline JS, proper naming, accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  const tabList = document.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  // Initialize tab state based on hash (only on pages with tabs)
  const init = () => {
    if (!tabList.length) return;
    const hash = location.hash.slice(1) || 'books';
    const activeTab = document.getElementById(`tab-${hash}`);
    
    if (activeTab) {
      activateTab(hash);
    } else {
      activateTab('books');
    }
  };

  // Activate specific tab by ID
  const activateTab = (tabId) => {
    const fullTabId = `tab-${tabId}`;
    const fullPanelId = `panel-${tabId}`;

    tabList.forEach(tab => {
      tab.classList.toggle('is-active', tab.id === fullTabId);
      tab.setAttribute('aria-selected', tab.id === fullTabId);
    });

    panels.forEach(panel => {
      panel.classList.toggle('hidden', panel.id !== fullPanelId);
      panel.setAttribute('aria-hidden', panel.id !== fullPanelId);
    });

    history.replaceState(null, '', `#${tabId}`);
  };

  // Handle keyboard navigation
  const handleKeydown = (e) => {
    if (!tabList.length) return;
    
    const activeTab = tabList.querySelector('[aria-selected="true"]');
    if (!activeTab) return;
    
    const currentIndex = Array.from(tabList).indexOf(activeTab);
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = (currentIndex - 1 + tabList.length) % tabList.length;
        break;
      case 'ArrowRight':
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabList.length;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabList.length - 1;
        break;
    }

    activateTab(tabList[newIndex].id.replace('tab-', ''));
  };

  // Event listeners
  tabList.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab.id.replace('tab-', '')));
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateTab(tab.id.replace('tab-', ''));
      }
    });
  });

  // Initialize on load
  init();

  // Scroll-aware navbar: collapse to a thin pill when scrolled down
  const navContent = document.querySelector('.nav-content');
  if (navContent) {
    const collapseThreshold = 100;
    let ticking = false;

    const updateNav = () => {
      const collapsed = window.scrollY > collapseThreshold;
      navContent.classList.toggle('is-collapsed', collapsed);
      const topNavbar = document.querySelector('.top-navbar');
      if (topNavbar) topNavbar.classList.toggle('is-collapsed', collapsed);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });

    updateNav();
  }
});