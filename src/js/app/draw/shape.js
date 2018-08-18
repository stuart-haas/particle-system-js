class Shape {
    static circle(ctx, pos, radius, color){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

export {Shape as default}