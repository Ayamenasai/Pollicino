export function buildFramesArray(animationName, framesCount) {
    let frames = [];

    for (let i = 1; i <= framesCount; i++) {
        let frameName = animationName + ' (' + i + ')';
        frames.push(frameName);
    }
    return frames;
}

export function calculateVectorDistance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) - (y1 - y2) * (y1 - y2));
}

export function calculateDistance(x1, x2){
    return Math.abs(x1 - x2);
}