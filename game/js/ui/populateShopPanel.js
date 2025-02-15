function populateShopPanel() {
    let buildableStructures = [];
    Object.keys(config["cells"]).forEach(cellType => {
        if (config.cells[cellType].buildCost) {
            buildableStructures.push(cellType);
        }
    });
    let shopDiv = document.getElementById("shop");

    shopDiv.style.display = 'grid';
    shopDiv.style.gridTemplateColumns = 'repeat(3, 1fr)';
    shopDiv.style.gap = '4px';
    shopDiv.style.padding = '4px';

    const shopWidth = shopDiv.clientWidth;
    // 8px padding on each side
    const displaySize = Math.floor((shopWidth - (8 + 8)) / 3);

    buildableStructures.forEach(cellType => {
        let img = new Image();
        img.src = "../assets/tileset.png";
        img.onload = function () {
            let canvas = document.createElement("canvas");
            canvas.addEventListener("click", (e) => {
                clickBuildStructure(cellType);
                e.preventDefault();
            });

            const pixelRatio = window.devicePixelRatio || 1;
            canvas.width = displaySize * pixelRatio;
            canvas.height = displaySize * pixelRatio;

            canvas.style.width = `${displaySize}px`;
            canvas.style.height = `${displaySize}px`;
            canvas.style.display = 'block';
            canvas.style.margin = '0';

            let ctx = canvas.getContext("2d", {
                alpha: true,
                antialias: false
            });

            ctx.scale(pixelRatio, pixelRatio);
            ctx.imageSmoothingEnabled = false;

            const bounds = config.cells[cellType].tiles.default.bounds;
            ctx.drawImage(
                img,
                bounds[0] * 16,
                bounds[1] * 16,
                32,
                32,
                0,
                0,
                displaySize,
                displaySize
            );

            shopDiv.appendChild(canvas);
        };
    });
}

let clickBuildStructure = (type) => {
    console.log(type);
};