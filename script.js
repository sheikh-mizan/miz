const ImageGalleryApp = {
    menu: null,
    buttons: [],
    imageGalleryContainer: null,
    imageItems: [],
    galleryCollections: [],
    goBackButton: null,
    dynamicTitle: null,
    dialogOverlay: null,
    closeButton: null,
    dialogImage: null,

    createRandomImage(width = 800, height = 400) {
        const img = new Image();
        img.src = `https://picsum.photos/${width}/${height}?random=${Math.floor(
            Math.random() * 1000
        )}`;
        img.loading = "lazy";
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        return img;
    },

    appendRandomImages() {
        this.imageItems.forEach((item) => {
            if (!item.querySelector('img')) {
                item.appendChild(this.createRandomImage());
            }
        });
    },

    displayCollection(collectionID) {
        this.galleryCollections.forEach((collection) => {
            collection.dataset.hidden =
                collection.id === collectionID ? "false" : "true";
        });
        
        // Update go back button visibility
        if (collectionID === "collection1") {
            this.goBackButton.style.visibility = 'hidden';
        } else {
            this.goBackButton.style.visibility = 'visible';
        }
    },

    showDialog(image) {
        const dialogImg = this.dialogOverlay.querySelector('.dialog-image');
        dialogImg.src = image.src;
        this.dialogOverlay.classList.add("open");
        document.body.style.overflow = 'hidden';
    },

    closeDialog() {
        this.dialogOverlay.classList.remove("open");
        document.body.style.overflow = '';
    },

    setInitialAppState() {
        const firstNavButton = this.buttons[0];
        if (firstNavButton) {
            const initialCollectionID = firstNavButton.dataset.target;
            this.activateNavigationButton(firstNavButton);
            this.displayCollection(initialCollectionID);
            this.updateDynamicTitle(firstNavButton);
            this.goBackButton.style.visibility = 'hidden';
        }
    },

    updateDynamicTitle(button) {
        const label = button.parentElement.querySelector('.label')?.textContent || "";
        this.dynamicTitle.textContent = label ? `${label}'s collection` : "Gallery";
    },

    attachEventListeners() {
        this.menu.addEventListener(
            "click",
            this.handleNavigationClick.bind(this)
        );
        
        this.imageGalleryContainer.addEventListener(
            "click",
            this.handleImageItemClick.bind(this)
        );
        
        this.dialogOverlay.querySelector('.close-btn').addEventListener(
            "click",
            this.closeDialog.bind(this)
        );
        
        this.goBackButton.addEventListener(
            "click",
            () => {
                this.buttons[0].click();
                this.setInitialAppState();
            }
        );
    },

    handleNavigationClick(event) {
        const clickedNavButton = event.target.closest(".nav-button");
        if (!clickedNavButton) return;

        const targetCollectionID = clickedNavButton.dataset.target;
        this.activateNavigationButton(clickedNavButton);
        this.displayCollection(targetCollectionID);
        this.updateDynamicTitle(clickedNavButton);
    },

    handleImageItemClick(event) {
        const clickedImageItem = event.target.closest(".image-item");
        if (!clickedImageItem) return;

        const image = clickedImageItem.querySelector("img");
        if (image) {
            this.showDialog(image);
        }
    },

    activateNavigationButton(button) {
        this.buttons.forEach((btn) =>
            btn.setAttribute("aria-selected", "false")
        );
        button.setAttribute("aria-selected", "true");
    },

    initialize() {
        this.menu = document.querySelector("nav");
        this.buttons = Array.from(document.querySelectorAll(".nav-button"));
        this.imageGalleryContainer = document.querySelector(".image-gallery");
        this.imageItems = Array.from(document.querySelectorAll(".image-item"));
        this.galleryCollections = Array.from(
            document.querySelectorAll(".image__gallery-collection")
        );
        this.goBackButton = document.querySelector(".button--go-back");
        this.dynamicTitle = document.querySelector(".dynamic-title");
        this.dialogOverlay = document.querySelector(".dialog");

        this.attachEventListeners();
        this.appendRandomImages();
        this.setInitialAppState();
    }
};

document.addEventListener("DOMContentLoaded", () => {
    ImageGalleryApp.initialize();
});
