let canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.hieght = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 40;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

let draw = (e) => {
    if(!isDrawing) return; // stop the function from running when not moused down
    console.log(e);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)` // reference https://mothereffinghsl.com/  100% alpha, 50% lightness
    ctx.beginPath();
    // ctx.lineWidth = hue; //will sdw=raw a line from width 0 to 360
    ctx.moveTo(lastX,lastY);
    ctx.lineTo(e.offsetX, e.offsetY);

    ctx.stroke(); // can see amazing stroke design if not executing code after this
 
    // lastX = e.offsetX;
    // lastY = e.offsetY;
    // another way to write the above code

    [lastX, lastY] = [e.offsetX, e.offsetY];  // it will draw a continuous line
    
    hue++;  // increase hue by 1 point so it will change the color limit is 0 to 360
    if(hue >= 360){
        hue = 0;
    }

    // if you want to increase and decrease line width 
        // can comment this piece of code if you want line of width 40
        if(ctx.lineWidth >= 40 || ctx.lineWidth <= 1){
            direction = !direction; //change direction
        }

        if(direction){
            ctx.lineWidth++;
        }
        else{
            ctx.lineWidth--;
        }
};

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);