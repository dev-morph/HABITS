export class Star {
    public x
    public y
    public ttl
    public lifetime
    public speed
    public tailSize
    public size = 0

    constructor(x: number, y: number, ttl: number, tailSize: number, size: number) {
        this.x = x
        this.y = y
        this.ttl = ttl
        this.lifetime = 0
        this.speed = 5
        this.tailSize = tailSize
        this.size = size
    }

    update() {
        this.x -= this.speed
        this.y += this.speed
        this.lifetime++
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.update()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgb(255, 255, 255)'
        ctx.closePath()
        ctx.fill()
        // //before
        // ctx.save();
        // ctx.translate(this.x, this.y);
        // ctx.rotate((135 * Math.PI) / 180); // 45 degrees in radians
        // ctx.beginPath();
        // ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        // ctx.shadowBlur = 8;
        // ctx.shadowColor = 'black';
        // ctx.rect(-25, -0.5, this.tailSize, 1); // Rect centered at (0, 0)
        // ctx.fill();

        // ctx.restore();
    }
}
