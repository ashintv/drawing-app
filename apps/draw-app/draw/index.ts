import { Shape } from "./shapes";
import { clearCanvas, getExistingShape } from "./utils";

export async function InitDraw(
    canvas: HTMLCanvasElement,
    roomId: string,
    socket: WebSocket
) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    let Startx = 0;
    let Starty = 0;
    if (!ctx) {
        return;
    }
    let existingShapes: Shape[] = await getExistingShape(roomId);

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type == "chat") {
            const parsedShape = JSON.parse(message.message);
            existingShapes.push(parsedShape.shape);
            clearCanvas(existingShapes, canvas, ctx);
        }
    };

    ctx.strokeStyle = "rgb(255,255,255)";

    let clicked = false;
    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        Startx = e.clientX;
        Starty = e.clientY;
    });
    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        const width = e.clientX - Startx;
        const height = e.clientY - Starty;
        const shape: Shape = {
            type: "rect",
            x: Startx,
            y: Starty,
            width,
            height,
        };

        existingShapes.push(shape);
        socket.send(
            JSON.stringify({
                type: "chat",
                message: JSON.stringify({ shape }),
                roomId: Number(roomId),
            })
        );
    });

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - Startx;
            const height = e.clientY - Starty;
            clearCanvas(existingShapes, canvas, ctx);
            ctx.strokeRect(Startx, Starty, width, height);
        }
    });
}
