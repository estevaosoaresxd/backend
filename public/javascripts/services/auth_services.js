let authServices = {
  auth: async function (name, password) {
    const data = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username: name, password: password })
    }
    const response = await fetch('/user/auth', data)
    return await response.json()
  },
  isAuth: function () {
    const haveKey = localStorage.getItem('user');

    console.log(haveKey);

    return haveKey != undefined;
  },
  setUser: function (userInfo) {
    console.log(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo));
  },
  getUser: function () {
    let user = localStorage.getItem('user')
    return JSON.parse(user);
  },
  deleteUser: function () {
    localStorage.removeItem('user');
  },
  logoff: function () {
    localStorage.removeItem('user');
    window.location.href = '/';
    // alert("Usuário não autenticado. Por favor faça login novamente.");
  },
}

export default authServices