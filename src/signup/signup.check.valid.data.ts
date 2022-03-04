export function CheckValidData (userData) : string {
    const checkEmail = new RegExp('[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}');
    const checkName = new RegExp('^[a-zA-Zа-яА-Я]+$');

    if (!checkName.test(userData.name)) return "Wrong name"
    if (userData.name.length < 4) return "Too short name"
    if (userData.name.length > 20) return "Too long name"
    if (!checkEmail.test(userData.email)) return "Wrong email"
    if (userData.password.length < 8) return "Too short password"
    if (userData.password.length > 60) return "Too long password"

    return "ok";
}