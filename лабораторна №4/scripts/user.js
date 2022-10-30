/*
 *Клас користувача
 * username - логін
 * _password - пароль не менше 3 символів
 * image - URL аватара
 * _idCounter - статична властивість, використовується для генрування унікального ідентифікатора.
 * setablePropertisList - список полів, які можна змінювати
 */

class User {

    constructor(username, phoneNum, address, owner, time, bill, image) {
        this.username = username;
        this.phoneNum = phoneNum;
        this.address = address;
        this.owner = owner;
        this.time = time;
        this.bill = bill;
        this.image = image;
        this._id = User._idCounter++; // генеруємо унікальний ідентифікатор 0, 1, 2, ...
    }

    get id() {
        return this._id;
    }

    //список властивостей класу які можна змінювати
    get settablePropertiesList() {
        return ["username", "phoneNum", "address", "owner", "time", "bill", "image"];
    }

    get gettablePropertiesList() {
        return ["id", ...this.setablePropertisList];
    }
}

User._idCounter = 0;