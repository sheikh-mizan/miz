document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navButtons = document.querySelectorAll('.nav-button');
    const collections = document.querySelectorAll('.image__gallery-collection');
    const goBackBtn = document.querySelector('.button--go-back');
    const title = document.querySelector('.dynamic-title');
    const dialog = document.querySelector('.dialog');
    const closeBtn = document.querySelector('.close-btn');
    const dialogImg = document.querySelector('.dialog-img');
    const imageItems = document.querySelectorAll('.image-item');

    // Load random images
    imageItems.forEach(item => {
        const img = document.createElement('img');
        img.src = `https://picsum.photos/300/300?random=${Math.random()}`;
        img.loading = 'lazy';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        item.appendChild(img);
    });

    // Navigation click
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            navButtons.forEach(b => b.setAttribute('aria-selected', 'false'));
            btn.setAttribute('aria-selected', 'true');
            
            // Show correct collection
            const target = btn.dataset.target;
            collections.forEach(col => {
                col.dataset.hidden = col.id === target ? 'false' : 'true';
            });
            
            // Update title
            const label = btn.parentElement.querySelector('.label').textContent;
            title.textContent = `${label}'s Collection`;
            
            // Show/hide back button
            goBackBtn.style.visibility = target === 'collection1' ? 'hidden' : 'visible';
        });
    });

    // Image click
    document.querySelector('.image-gallery').addEventListener('click', (e) => {
        const img = e.target.closest('.image-item img');
        if (img) {
            dialogImg.src = img.src;
            dialog.classList.add('open');
        }
    });

    // Close dialog
    closeBtn.addEventListener('click', () => {
        dialog.classList.remove('open');
    });

    // Go back button
    goBackBtn.addEventListener('click', () => {
        document.querySelector('[data-target="collection1"]').click();
    });

    // Initialize first collection
    document.querySelector('[data-target="collection1"]').click();
});
