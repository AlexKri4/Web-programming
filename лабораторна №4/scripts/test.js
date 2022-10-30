/**
 * тестовий приклад створення 2 користувачів та монтування таблиці
 */

let users = new UserCollectionWithDOM();

users.add(
    new User(
        "User",
        "+309857382634",
        "вул Канальна 34",
        "User.userov",
        "23:00",
        "34.09 uah",
        "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png"
    )
);

users.add(
    new User(
        "Admin",
        "+302839016323!",
        "вул Босоркані 58А",
        "Admin.adminov",
        "13:26",
        "96.34 uah",
        "https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_960_720.png"
    )
);

users.add(
    new User(
        "Good person",
        "+38099......",
        "вул Онуфрія гордоського 2",
        "persona good",
        "17:05",
        "120 uah",
        "https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_960_720.png"
    )
);
users.add(
    new User(
        "Cool man",
        "+384599......",
        "вул запорізька 7",
        "Really cool man",
        "13:26",
        "408.32 uah",
        "https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_960_720.png"
    )
);
users.mount(document.getElementById("root"));