'use strict';

const { Palm, Passage } = require('../models');

class V1Controller {
    static async connect(req, res, next) {
        try {
            const { sn } = req.body;
            if (!sn) {
                return res.status(400).json({ code: 10000, msg: 'Parameter Error: sn is required' });
            }
            // Logic to verify device if necessary
            res.status(200).json({ code: 0, msg: 'success' });
        } catch (error) {
            next(error);
        }
    }

    static async add(req, res, next) {
        try {
            const { sn, name, id, image_left, image_right, wiegand_flag, admin_auth } = req.body;
            if (!sn || !name || !id || !image_left || !image_right || wiegand_flag === undefined || admin_auth === undefined) {
                return res.status(400).json({ code: 10000, msg: 'Parameter Error: Missing required fields' });
            }

            const [palm, created] = await Palm.findOrCreate({
                where: { studentId: id },
                defaults: {
                    sn,
                    name,
                    studentId: id,
                    image_left,
                    image_right,
                    wiegand_flag,
                    admin_auth
                }
            });

            if (!created) {
                return res.status(409).json({ code: 30005, msg: 'Database Duplicate Insertion' });
            }

            res.status(201).json({ code: 0, msg: 'success' });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ code: 30005, msg: 'Database Duplicate Insertion' });
            }
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const { sn, id } = req.body;
            if (!sn || !id) {
                return res.status(400).json({ code: 10000, msg: 'Parameter Error: sn and id are required' });
            }

            const result = await Palm.destroy({ where: { studentId: id } });

            if (result === 0) {
                return res.status(404).json({ code: 30006, msg: 'Database ID Not Found' });
            }

            res.status(200).json({ code: 0, msg: 'success' });
        } catch (error) {
            next(error);
        }
    }

    static async query(req, res, next) {
        try {
            const { sn } = req.body;
            if (!sn) {
                return res.status(400).json({ code: 10000, msg: 'Parameter Error: sn is required' });
            }

            const palms = await Palm.findAll({
                attributes: ['studentId', 'wiegand_flag', 'admin_auth']
            });

            const idDataList = palms.map(p => ({
                id: p.studentId,
                wiegand_flag: p.wiegand_flag,
                admin_auth: p.admin_auth
            }));

            res.status(200).json({ code: 0, msg: 'success', data: { idDataList } });
        } catch (error) {
            next(error);
        }
    }

    static async checkRegistration(req, res, next) {
        try {
            const { sn, id } = req.body;
            if (!sn || !id) {
                return res.status(400).json({ code: 10000, msg: 'Parameter Error: sn and id are required' });
            }

            const palm = await Palm.findOne({ where: { studentId: id } });

            res.status(200).json({
                code: 0,
                msg: 'success',
                data: { is_registered: !!palm }
            });
        } catch (error) {
            next(error);
        }
    }

    static async queryImages(req, res, next) {
        try {
            const { sn, id } = req.body;
            if (!sn || !id) {
                return res.status(400).json({ code: 10000, msg: 'Parameter Error: sn and id are required' });
            }

            const palm = await Palm.findOne({ where: { studentId: id } });

            if (!palm) {
                return res.status(404).json({ code: 30006, msg: 'Database ID Not Found' });
            }

            res.status(200).json({
                code: 0,
                msg: 'success',
                data: {
                    name: palm.name,
                    image_left: palm.image_left,
                    image_right: palm.image_right
                }
            });
        } catch (error) {
            next(error);
        }
    }

    static async firmwareUpgrade(req, res, next) {
        try {
            const { sn, version } = req.body;
            if (!sn || !version) {
                return res.status(400).json({ code: 10000, msg: 'Parameter Error: sn and version are required' });
            }
            // This is a mock response as per the document's example.
            // In a real scenario, you would have logic to check the version
            // and determine if an upgrade is needed.
            res.status(200).json({
                code: 0,
                msg: 'success',
                data: {
                    need: true,
                    url: 'https://example.com/firmware-v1.0.2.tgz'
                }
            });
        } catch (error) {
            next(error);
        }
    }

    static async passList(req, res, next) {
        try {
            const { sn, name, id, type, device_date_time } = req.body;
            if (!sn || !name || !id || !type || !device_date_time) {
                return res.status(400).json({ code: 10000, msg: 'Parameter Error: Missing required fields' });
            }

            await Passage.create({
                sn,
                name,
                studentId: id,
                type,
                device_date_time
            });

            res.status(201).json({ code: 0, msg: 'success' });
        } catch (error) {
            next(error);
        }
    }

    static async queryBatchImportPath(req, res, next) {
        try {
            const { sn } = req.body;
            if (!sn) {
                return res.status(400).json({ code: 10000, msg: 'Parameter Error: sn is required' });
            }
            // This is a mock response as per the document's example.
            res.status(200).json({
                code: 0,
                msg: 'success',
                data: {
                    url: 'https://example.com/deptrum.csv'
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = V1Controller;
