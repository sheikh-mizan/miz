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

    createRandomImage(width = 800, height = 400) {
        const img = new Image(width, height);
        img.src = `https://picsum.photos/${width}/${height}?random=${Math.floor(
            Math.random() * 1000
        )}`;
        img.loading = "lazy";
        return img;
    },

    appendRandomImages() {
        this.imageItems.forEach((item) =>
            item.appendChild(this.createRandomImage())
        );
    },

    displayCollection(collectionID) {
        this.galleryCollections.forEach((collection) => {
            collection.dataset.hidden =
                collection.id === collectionID ? "false" : "true";
        });
    },

    showDialog(image) {
        this.dialogOverlay.replaceChildren(image, this.closeButton);
        this.dialogOverlay.classList.add("open");
    },

    closeDialog() {
        this.dialogOverlay.classList.remove("open");
    },

    setInitialAppState() {
        const firstNavButton = this.buttons[0];
        if (firstNavButton) {
            const initialCollectionID = firstNavButton.dataset.target;
            this.activateNavigationButton(firstNavButton);
            this.displayCollection(initialCollectionID);
            this.updateDynamicTitle(firstNavButton);
        }
    },

    updateDynamicTitle(button) {
        const label = button.nextElementSibling?.textContent || "";
        this.dynamicTitle.textContent = label ? `${label}'s collection` : "";
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
        this.closeButton.addEventListener("click", this.closeDialog.bind(this));
        this.goBackButton.addEventListener(
            "click",
            this.setInitialAppState.bind(this)
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

        const clonedImage = clickedImageItem
            .querySelector("img")
            .cloneNode(true);
        this.showDialog(clonedImage);
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
        this.closeButton = document.querySelector(".close-btn");

        this.attachEventListeners();
        this.appendRandomImages();
        this.setInitialAppState();
    }
};

document.addEventListener("DOMContentLoaded", () =>
    ImageGalleryApp.initialize()
);
