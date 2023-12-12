import { getRandomNumberInRange } from './common-func'

export class Particles {
    public x: number
    public y: number
    public ttl: number
    public size: number
    public time = 0
    public color: string

    constructor(x: number, y: number, ttl: number, size: number, color: string) {
        this.x = x
        this.y = y
        this.ttl = ttl
        this.size = size >= 0 ? size : 0
        this.color = color
    }

    update() {
        this.x = this.x + getRandomNumberInRange(-1, 2)
        this.y = this.y + getRandomNumberInRange(-1, -1)
        if (this.ttl === this.time) {
            this.size = 0
        }
        this.time++
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.update()
        ctx.globalCompositeOperation = 'lighter'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.closePath()
        ctx.fill()
    }
}
