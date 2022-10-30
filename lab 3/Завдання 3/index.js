function a() {
    var x = prompt("Input count of steps:")
    var y = prompt("Input count of replays:")
    for (k = 0; k < y; k++) {
        for (i = 1; i < x; i++) {
            let j = 0;
            do { document.write("o"); j++; } while (j < i)
            document.write("<br/>")
        }
    }
}