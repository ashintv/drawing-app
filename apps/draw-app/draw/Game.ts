import { Tool } from "@/components/canvas";
import { Shape } from "./shapes";
import { getExistingShape } from "./utils";

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private socket: WebSocket;
    private clicked: boolean;
    private Startx: number;
    private Starty: number;
    private selectedTool: Tool = "circle";

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.roomId = roomId;
        this.clicked = false;
        this.canvas = canvas;
        this.Startx = 0;
        this.Starty = 0;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.socket = socket;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }
    async init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.existingShapes = await getExistingShape(this.roomId);
        
    }

    setTool(tool: "circle" | "rect" | "pencil") {
        console.log(tool);
        this.selectedTool = tool;
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type == "chat") {
                const parsedShape = JSON.parse(message.message);

                this.existingShapes.push(parsedShape.shape);
                this.clearCanvas();
            }
        };
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = "red";
        this.existingShapes.map((s) => {
            if (s.type == "rect") {
                this.ctx.strokeRect(s.x, s.y, s.width, s.height);
            } else if (s.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(s.centerX, s.centerY, s.radius, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        });
    }

    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", (e) => {
            this.clicked = true;
            this.Startx = e.clientX;
            this.Starty = e.clientY;
        });

        this.canvas.addEventListener("mouseup", (e) => {
            this.clicked = false;
            const width = e.clientX - this.Startx;
            const height = e.clientY - this.Starty;
            const selctedTool = this.selectedTool;
            let shape: Shape | null = null;
            if (selctedTool === "rect") {
                shape = {
                    type: "rect",
                    x: this.Startx,
                    y: this.Starty,
                    width,
                    height,
                };
            } else if (selctedTool === "circle") {
                const radius = Math.abs(Math.max(width, height) / 2);
                shape = {
                    type: "circle",
                    radius: radius,
                    centerX: this.Startx,
                    centerY: this.Starty,
                };
            }
            if (!shape) {
                return;
            }
            this.existingShapes.push(shape);

            this.socket.send(
                JSON.stringify({
                    type: "chat",
                    message: JSON.stringify({ shape }),
                    roomId: Number(this.roomId),
                })
            );
        });

        this.canvas.addEventListener("mousemove", (e) => {
            if (this.clicked) {
                const width = e.clientX - this.Startx;
                const height = e.clientY - this.Starty;
                this.clearCanvas();
                const selected = this.selectedTool;
                if (selected === "rect") {
                    this.ctx.strokeRect(
                        this.Startx,
                        this.Starty,
                        width,
                        height
                    );
                }
                if (selected === "circle") {
                    const centerX = this.Startx + width / 2;
                    const centerY = this.Starty + height / 2;
                    const radius = Math.abs(Math.max(width, height) / 2);
                    this.ctx.beginPath();
                    this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
            }
        });
    }
}
