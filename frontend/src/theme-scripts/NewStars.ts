import { getRandomNumberInRange } from './common-func'
import { Particles } from './Particles'

export class Stars {
    public x
    public y
    public ttl
    public lifetime
    public speed
    public size = 5
    public particles: Particles[] = []
    public progress = 0
    public rgb = [
        // 'rgba(255, 255, 255, 1)',
        'rgb(26, 188, 156)',
        'rgb(46, 204, 113)',
        'rgb(52, 152, 219)',
        'rgb(155, 89, 182)',
        'rgb(241, 196, 15)',
        'rgb(230, 126, 34)',
        'rgb(231, 76, 60)'
    ]

    constructor(x: number, y: number, ttl: number, size: number) {
        this.x = x
        this.y = y
        this.ttl = ttl
        this.lifetime = 0
        this.speed = 1
        this.size = size
    }

    update() {
        this.x -= this.speed
        this.y += this.speed
        this.lifetime++
    }

    createParticle() {
        const x = this.x + getRandomNumberInRange(-30, 30)
        const y = this.y + getRandomNumberInRange(-30, 30)
        const randomColor = Math.floor(getRandomNumberInRange(0, this.rgb.length))
        const particle = new Particles(x, y, 30, this.size * this.progress, this.rgb[randomColor])
        this.particles.push(particle)
    }

    destoryParticle(index: number) {
        this.particles.splice(index, 1)
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.update()
        ctx.globalCompositeOperation = 'lighter'
        this.progress = 1 - this.lifetime / this.ttl
        ctx.beginPath()
        const size = this.size * this.progress < 0 ? 0 : this.size * this.progress
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, 1)`
        ctx.closePath()
        ctx.fill()

        this.createParticle()

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].draw(ctx)
        }
    }
}
