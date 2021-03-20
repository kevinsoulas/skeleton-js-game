function capPercentage(p) {

    return Math.min(1, Math.max(0, p));

}

function capPercentageRelative(p) {

    return Math.min(1, Math.max(-1, p));

}

function percentage(f, dec = 1) {

    var factor = Math.pow(10, dec);
    return `${Math.floor(100 * f * factor) / factor}%`;

}