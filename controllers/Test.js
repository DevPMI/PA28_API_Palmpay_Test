/** @format */

const { Test } = require('../models');

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    const { limit, page, search } = req.query;

    let pagination = {
      where: {
        deletedAt: null,
      },
      limit: limit ? limit : 50,
      order: [['nama', 'asc']],
    };

    if (limit) {
      pagination.limit = limit;
    }

    if (page && limit) {
      pagination.offset = (page - 1) * limit;
    }

    if (search) {
      pagination.where = {
        [Op.or]: [{ nama: { [Op.iLike]: `%${search}%` } }],
        deletedAt: null,
      };
    }

    let dataTest = await Test.findAndCountAll(pagination);

    let totalPage = Math.ceil(dataTest.count / (limit ? limit : 50));

    // SUKSES
    res.status(200).json({
      statusCode: 200,
      message: 'Berhasil Mendapatkan Semua Data Test',
      data: dataTest.rows,
      totaldataTest: dataTest.count,
      totalPage: totalPage,
    });
  }

  // GET ONE
  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Test.findOne({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!data) {
        throw { name: 'Test Tidak Ditemukan' };
      }

      res.status(200).json({
        statusCode: 200,
        message: 'Berhasil Menampilkan Data Test',
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      const { nama, keterangan } = req.body;

      await Test.create({ nama, keterangan });

      res.status(200).json({
        statusCode: 200,
        message: 'Berhasil Membuat Data Test',
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { nama, keterangan } = req.body;

      const data = await Test.findOne({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!data) {
        throw { name: 'Test Tidak Ditemukan' };
      }

      await Test.update({ nama, keterangan }, { where: { id } });

      res.status(200).json({
        statusCode: 200,
        message: 'Berhasil Memperbaharui Data Test',
      });
    } catch (error) {
      next(error);
    }
  }

  // SOFT DELETE
  static async softDeleted(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Test.findOne({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!data) {
        throw { name: 'Test Tidak Ditemukan' };
      }
      const body = {
        deletedAt: new Date(),
        deletedBy: req.user.id,
      };

      await Test.update(body, { where: { id } });

      res.status(200).json({
        statusCode: 200,
        message: 'Berhasil Soft Deleted Data Test',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
