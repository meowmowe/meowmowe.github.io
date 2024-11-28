document.addEventListener('DOMContentLoaded', () => {
    const portfolioContainer = document.querySelector('.portfolio-container');

    // Array of objects representing your projects
    const projects = [
   
        {
            title: 'Zenocycle Project',
            images: ['images/zenocycle/1.png','<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1034121921?h=13f7282a14&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Robotic prosthetic arm"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>'
                ,'images/zenocycle/2.png', 'images/zenocycle/3.png', 'images/zenocycle/4.png', 'images/zenocycle/5.png'],
            description: 'In this immersive game, you take on the role of a truck driver navigating a complex, post-apocalyptic world. Your mission is to keep the remnants of civilization alive through skillful logistics and daring expeditions..'
        },
        {
            title: 'Flowers Shop',
            images: ['images/flowerShop/1.png', 'images/flowerShop/2.png', 'images/flowerShop/3.png'],
            description: "Immerse yourself in the colorful and competitive world of floristry with Flower Shop Tycoon! In this engaging simulation game,you'll cultivate, arrange, and sell a variety of beautiful blooms while navigating a dynamic market economy."
        },
        {
            title: 'Pomodoro Project',
            images: ['images/pomodoro/1.jpg', 'images/pomodoro/2.jpg', 'images/pomodoro/3.jpg','images/pomodoro/4.jpg'], // Add your actual image paths
            description: 'A productivity-focused Pomodoro timer application that helps users maintain focus through structured work and break intervals. Features customizable timers, progress tracking, and a clean, user-friendly interface. Enhances user engagement by providing interesting trivia about alternative activities that could be completed in their accumulated work time, making productivity tracking more entertaining and relatable.'
        },
        {
            title: 'AR Furniture Project',
            images: ['images/AR/1.png', 'images/AR/2.jpeg'],
            description: 'During my internship, I developed an innovative augmented reality (AR) project focused on furniture visualization. This project demonstrates the practical application of AR technology in interior design and furniture retail.'
        },
          ,
            {
            title: 'Misc',
            images: ['images/Misc/3310.png', 'images/Misc/ksu.png','images/Misc/col.png'],
            description: "I've dipped my toes into various game jams and started a handful of experimental projects. While these aren't polished products, they've been great learning experiences"
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