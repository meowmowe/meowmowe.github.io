document.addEventListener('DOMContentLoaded', () => {
    const portfolioContainer = document.querySelector('.portfolio-container');

    // Array of objects representing your projects
    const projects = [
        {
            title: 'AR Project',
            images: ['images/AR/1.png', 'images/AR/2.jpeg', 'images/AR/3.png'],
            description: 'This is a brief description of the AR project...'
        },
        {
            title: 'Deneme',
            images: ['images/AR/1.png', 'images/AR/2.jpeg', 'images/AR/3.png'],
            description: 'This is a brief description of the AR project...'
        },
        {
            title: 'Zenocycle Project',
            images: ['images/zenocycle/1.png', 'images/zenocycle/2.png', 'images/zenocycle/3.png', 'images/zenocycle/4.png', 'images/zenocycle/5.png'],
            description: 'This is a brief description of the Zenocycle project...'
        },
        {
            title: 'Flower Shop',
            images: ['images/flowerShop/1.png', 'images/flowerShop/2.png', 'images/flowerShop/3.png'],
            description: 'This is a brief description of the Flower Shop project...'
        },
        {
            title: 'Misc',
            images: ['images/Misc/3310.png', 'images/Misc/ksu.png'],
            description: 'This is a brief description of the Misc...'
        }
    ];
    

    // Function to add a portfolio item
    function addPortfolioItem(project) {
        const item = document.createElement('div');
        item.classList.add('portfolio-item');

        const header = document.createElement('h2');
        header.textContent = project.title;
        item.appendChild(header);

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('portfolio-images');
        project.images.forEach(src => {
            const frame = document.createElement('div');
            frame.classList.add('image-frame');
            const img = document.createElement('img');
            img.src = src;
            img.alt = project.title;
            img.addEventListener('click', () => openModal(src, project.images));
            frame.appendChild(img);
            imageContainer.appendChild(frame);
        });
        item.appendChild(imageContainer);

        const desc = document.createElement('p');
        desc.classList.add('portfolio-description');
        desc.textContent = project.description;
        item.appendChild(desc);

        portfolioContainer.appendChild(item);
    }

    // Modal handling
    const modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.appendChild(modal);

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modal.appendChild(modalContent);

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = closeModal;
    modalContent.appendChild(closeBtn);

    const modalImg = document.createElement('img');
    modalContent.appendChild(modalImg);

    const prevBtn = document.createElement('span');
    prevBtn.classList.add('prev');
    prevBtn.innerHTML = '&#10094;';
    prevBtn.onclick = () => changeImage(-1);
    modalContent.appendChild(prevBtn);

    const nextBtn = document.createElement('span');
    nextBtn.classList.add('next');
    nextBtn.innerHTML = '&#10095;';
    nextBtn.onclick = () => changeImage(1);
    modalContent.appendChild(nextBtn);

    let currentImages = [];
    let currentIndex = 0;

    function openModal(src, images) {
        modal.style.display = 'flex';
        modalImg.src = src;
        currentImages = images;
        currentIndex = images.indexOf(src);
        updateButtons();
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function changeImage(direction) {
        currentIndex += direction;
        if (currentIndex < 0) currentIndex = currentImages.length - 1;
        if (currentIndex >= currentImages.length) currentIndex = 0;
        modalImg.src = currentImages[currentIndex];
        updateButtons();
    }

    function updateButtons() {
        prevBtn.style.display = currentImages.length > 1 ? 'block' : 'none';
        nextBtn.style.display = currentImages.length > 1 ? 'block' : 'none';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Loop through the projects array and add each project as a portfolio item
    projects.forEach(project => addPortfolioItem(project));

    // Keyboard navigation for modal
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') changeImage(-1);
            if (e.key === 'ArrowRight') changeImage(1);
            if (e.key === 'Escape') closeModal();
        }
    });
});