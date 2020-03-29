const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "ongs teste 2",
        email: "ong@teste.com",
        whatsapp: "3216548770",
        city: "Belo Horizonte",
        uf: "MG"
      });

    // espera receber como retorno um id
    expect(response.body).toHaveProperty('id');

    // espera que esse id tenha tamanho de 8 
    expect(response.body.id).toHaveLength(8);
  });
});