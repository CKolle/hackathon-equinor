function populateShopPanel(){
    let buildableStructures = [];
    Object.keys(config["cells"]).forEach(cellType => {
        if(config.cells[cellType].buildCost){
            buildableStructures.push(cellType);
        }
    });
    let shopDiv = document.getElementById("shop");
    
    buildableStructures.forEach(cellType => {
        let img = new Image();
        img.src = "../assets/tileset.png";
        img.onload = function () {
            let canvas = document.createElement("canvas");
            canvas.addEventListener("click",(e)=>{
                clickBuildStructure(cellType);
                e.preventDefault();
            });
            let ctx = canvas.getContext("2d");

            // Set canvas size to only show the first 32 pixels
            canvas.width = 32;
            canvas.height = 32;

            // Draw only the first 32 pixels of the image
            bounds = config.cells[cellType].tiles.default.bounds;
            console.log(bounds[0]*16,bounds[1]*16);
            ctx.drawImage(img, 16*bounds[0], 16*bounds[1], 32, 32, 0, 0, 32, 32);

            shopDiv.appendChild(canvas);
        };
    });
}

let clickBuildStructure = (type)=>{
    console.log(type);
};