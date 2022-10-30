/*
* клас доповнює можливості колекції користувачів відображатись на дисплеї
*/

class UserCollectionWithDOM extends UserCollection {
    // значення для пошуку
    searchString = "";
    //генеруємо рядок таблиці за вказаними даними користувача
    userToTableRowHtml(user) {
        return `
        <tr>
            <td>
                ${user.id}
            </td>
            <td>
                ${user.username}
            </td>
            <td>
                ${user.phoneNum}
            </td>
            <td>
                ${user.address}
            </td>
            <td>
                ${user.owner}
            </td>
            <td>
                ${user.time}
            </td>
            <td>
                ${user.bill}
            </td>
            <td>
                <img
                    src="${user.image}" width="120" height="100"
                    alt="${user.username}"
                    class="avatar"
                />
            </td>
            <td> 
                <button onclick="DeleteUser(${user.id})">
                    Delete
                </button>
            </td>
            <td> 
                <button onclick="StartEditUser(${user.id})">
                    Edit
                </button>
            </td>
        </tr>
        `;
    }
    //допоміжний метод, який визначає яких користувачів требавиводити при рендері

    getUsers() {
        // якщо  задане значення для пошуку шукаємо користувачів ім'я яких починається із вказаного значення
        if (this.searchString)
            return this.getByUsernameStart(this.searchString);

        // якщо не задане значення для пошуку, то виводимо всіх користувачів   
        return this.getAll();
    }

    // генеруємо таблицю користувачів
    get usersToTableHtml() {
        //вибираємо яких користувачів шукати
        let users = this.getUsers();
        //якщо для виводу нема користувачів, то показуэмо відповідне повідомлення
        if (users.length == 0)
            return `
                <h3> No users </h3>
            `;
        // якщо є користувачі то формуємо рядки таблиці
        let rows = "";
        for (let user of users) {
            rows += this.userToTableRowHtml(user);
        }
        return `
            <h2> Users </h2>
            <table>
                <tr>
                    <th>
                        Id
                    </th>
                    <th>
                        Username
                    </th>
                    <th>
                        phone number
                    </th>
                    <th>
                        home address
                    </th>
                    <th>
                        owner
                    </th>
                    <th>
                        time
                    </th>
                    <th>
                        bill
                    </th>
                    <th>
                        Image
                    </th>
                    <th colspan="2">
                        Actions
                    </th>
                </tr>
                ${rows}
            </table>
        `;
    }
    // форма для додавання нового користувача    
    get addFormHtml() {
        return `
            <button type="button" onclick="ShowAddUserForm()">
                Add user
            </button> 
            <div id="add-user">
                <form name="addForm" method="post" action="#">
                    <h3> Add User </h3>
                    <input name="id" type="hidden">
                    <input name="username" placeholder="username"> 
                    <input name="phoneNum" placeholder="phoneNum">
                    <input name="address" placeholder="address">
                    <input name="owner" placeholder="owner">
                    <input name="time" placeholder="time">
                    <input name="bill" placeholder="bill">
                    <input name="image" placeholder="avatar url">
                    <button type="button" onclick="AddNewUser()">
                        Save
                    </button>
                </form>
            </div>
        `;
    }
    //форма для редагування даних користувача
    get editFormHtml() {
        return ` 
            <div id="edit-user">
                <form name="editForm" method="post" action="#">
                    <h3> Edit User </h3>
                    <input name="id" type="hidden">
                    <input name="username" placeholder="username"> 
                    <input name="phoneNum" placeholder="phoneNum">
                    <input name="address" placeholder="address">
                    <input name="owner" placeholder="owner">
                    <input name="time" placeholder="time">
                    <input name="bill" placeholder="bill">
                    <input name="image" placeholder="avatar url">
                    <button type="button" onclick="EditUser()">
                        Save
                    </button>
                </form>
            </div>
        `;
    }

    get searchInputHtml() {
        return `<input type="text" 
            name="searchByName" 
            id="searchByName"
            placeholder="Enter username for search"
            value="${this.searchString}"
            onchange="Search()"
        >`;
    }
    //монтуємо компонент у вказаний батьківський та призначаємо обробку подій
    mount(parrent) {
        this._parrent = parrent;
        this.render();
        this.addEventListners();
        this.createClickHadlers();
        this.addErrorMessage();
    }

    // генеруємо HTML код таблиці користувачі та форм редагування та додавання нового користувача
    render() {
        this._parrent.innerHTML = this.searchInputHtml + this.usersToTableHtml + this.addFormHtml + this.editFormHtml;
    }
    // навішуємо слухачів події
    addEventListners() {
        //вилучаємо користувача
        document.addEventListener("deleteUser", event => {
            super.delete(event.detail.id);
            this.render();
        });
        // додаємо нового користувача
        document.addEventListener("addUser", event => {
            super.create(event.detail);
            this.render();
        });
        //редагуэмо користувача
        document.addEventListener("editUser", event => {
            super.update(event.detail.id, event.detail);
            this.render();
        });

        document.addEventListener("searchUser", event => {
            this.searchString = event.detail.searchString;
            this.render();
        });
    }

    createClickHadlers() {
        // функція вилучення користувача при кліці на відповідну кнопку. генерує подію deleteUser
        window.DeleteUser = (id) => {
            let deleteUserEvent = new CustomEvent("deleteUser", { detail: { id } });
            document.dispatchEvent(deleteUserEvent);
        }

        //функція показу форми редагування користувача
        window.ShowAddUserForm = () => {
            document.getElementById("add-user").style.display = "block";
        }
        // функція додавання нового користувача. генерує подію аddUser
        window.AddNewUser = () => {
            const username = document.getElementsByName("username")[0].value;
            const phoneNum = document.getElementsByName("phoneNum")[0].value;
            const address = document.getElementsByName("address")[0].value;
            const owner = document.getElementsByName("owner")[0].value;
            const time = document.getElementsByName("time")[0].value;
            const bill = document.getElementsByName("bill")[0].value;
            const image = document.getElementsByName("image")[0].value;
            let addUserEvent = new CustomEvent("addUser", {
                detail: {
                    username, //username: username
                    phoneNum,
                    address,
                    owner,
                    time,
                    bill,
                    image,
                }
            });
            document.dispatchEvent(addUserEvent);
        }
        // показуємо форму редагування та заповнюємо її значеннями користувача із вказаним id
        // оскіль в функції використовується super то тут можна використовуватит  ВИКЛЮЧНО ЛЯМБДА ФУНКЦІЮ!
        // Анонімна функція видасть помилку. Решта функцій не використовує super чи this, тому їх можна робити як лямбда так і анонімними
        window.StartEditUser = (id) => {
            document.getElementById("edit-user").style.display = "block";

            let user = super.getById(id); // знаходимо користувача із вказаним id 
            document.getElementsByName("id")[1].value = user.id;
            document.getElementsByName("username")[1].value = user.username;
            document.getElementsByName("phoneNum")[1].value = user.phoneNum;
            document.getElementsByName("address")[1].value = user.address;
            document.getElementsByName("owner")[1].value = user.owner;
            document.getElementsByName("time")[1].value = user.time;
            document.getElementsByName("bill")[1].value = user.bill;
            document.getElementsByName("image")[1].value = user.image;
        }

        //отримуємо відредаговані значення користувача із форми та генеруємо подію editUser
        window.EditUser = () => {
            const id = parseInt(document.getElementsByName("id")[1].value);
            const username = document.getElementsByName("username")[1].value;
            const phoneNum = document.getElementsByName("phoneNum")[1].value;
            const address = document.getElementsByName("address")[1].value;
            const owner = document.getElementsByName("owner")[1].value;
            const time = document.getElementsByName("time")[1].value;
            const bill = document.getElementsByName("bill")[1].value;
            const image = document.getElementsByName("image")[1].value;
            let editUserEvent = new CustomEvent("editUser", {
                detail: {
                    id,
                    username, //username: username
                    phoneNum,
                    address,
                    owner,
                    time,
                    bill,
                    image,
                }
            });
            document.dispatchEvent(editUserEvent);
        }
        // пошук
        window.Search = () => {
            const searchString = document.getElementById("searchByName").value;
            let searchEvent = new CustomEvent("searchUser", { detail: { searchString } });
            document.dispatchEvent(searchEvent);
        }
    }
    // функція виводу повідомлень про помилку
    addErrorMessage() {
        window.onerror = (error) => {
            alert(error);
        }
    }
}