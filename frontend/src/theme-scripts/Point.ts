export class Point {
    public x: number
    public y: number
    public fixedY: number
    public speed: number
    public cur: number
    public max = 0
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.fixedY = y
        this.speed = 0.1
        this.cur = 0
        this.max = Math.random() * 100 + 150
    }

    update() {
        this.cur += this.speed
        this.y = this.fixedY + Math.sin(this.cur) * this.max
    }
}
