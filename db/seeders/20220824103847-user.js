'use strict'

export default {
  async up(queryInterface) {
    const superAdmin = await queryInterface.rawSelect('Users', {}, ['id'])

    if (!superAdmin) {
      await queryInterface.bulkInsert(
        'Users',
        [
          {
            id: "0803620e-d9c5-4133-8574-6c5463c922fd",
            username: 'chatSuperAdmin',
            password: "$2a$12$V0FgHsVMp6RBLTA4NuNm6Oq6YM1jT5DC8xfmpjF8Gtf1C3J6zYSMu",  //aliA123@A
            role: 'superAdmin',
            profile: '{}',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ],
        {}
      )
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {
      where: { username: ['chatSuperAdmin'] },
    })
  },
}
