const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  },

  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = generateUniqueId();

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;

    const incidents = await connection('incidents')
    .where('ong_id', id)
    .select('*');

    if(incidents.length > 0){
      return response.status(401)
      .json({ error: 'Exclua primeiro os casos para depois excluir a ong.'});  
    }

    await connection('ongs').where('id', id).delete();

    return response.status(204).json({});
  }
}