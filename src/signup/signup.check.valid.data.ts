export function CheckValidData (userData) : string {
    const checkEmail = new RegExp('[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}');

    if (userData.name.length < 4) return "Слишком короткое имя"
    if (userData.name.length > 20) return "Слишком длинное имя"
    if (!checkEmail.test(userData.email)) return "Неверная почта"
    if (userData.password.length < 8) return "Слишком короткий пароль"
    if (userData.password.length > 60) return "Слишком длинный пароль"

    return "ok";
}