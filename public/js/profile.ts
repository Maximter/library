function deleteTokenAndExit() : void {
    document.cookie = 'token=0';
    window.location.href = '/'
}