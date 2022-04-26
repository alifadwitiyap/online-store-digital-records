const userSevice = require('../service/userSevice');
const service = new userSevice

testRegisterUser = async () => {
    const idAkun = await service.registerUser({
        username: 'test-2',
        password: 'test',
        nama: 'alif',
        role: 'admin'
    })
    console.log("🚀 ~ file: userService.test.js ~ line 11 ~ testRegisterUser= ~ idAkun", idAkun)
}

testDeleteUser = async () => {
    id = 'user-VfGHBTqPRVlZT6sf'
    await service.deleteUser({ id })
    console.log('berhasil dihapus');
}




