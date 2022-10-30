function century() {
    let a = Number(prompt("a= "));

    if (a % 100 >= 1) {
        // console.log(Math.floor(a / 100 + 1))
        document.write(`<h1> ${Math.floor(a / 100 + 1)} century <h1/>`)
    }
    else {
        // (console.log(Math.floor(a / 100)));
        document.write(`<h1>${Math.floor(a / 100)} century <h1/>`)
    };
}