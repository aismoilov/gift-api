const express = require('express');
const router = express.Router();
const giftService = require('../services/giftService');
const auth = require('../middleware/auth');


router.get('/', auth, function (req, res, next) {
    try {
        res.json(giftService.getGiftsList());
    } catch (err) {
        console.error(`Error while getting gifts`, err.message);
        next(err);
    }
});

router.get(`/:hash`, (req, res, next) => {
    try {
        const { hash } = req.params;
        res.json(giftService.getGiftByHash(hash));
    } catch (err) {
        console.error(`Error while getting gift`, err.message);
        next(err);
    }
});

router.post(`/`, auth, (req, res) => {
    const { name, congratulation, author } = req.body
    res.json(giftService.createGift({ name, congratulation, author }));
});

router.put(`/:hash`, auth, (req, res) => {
    const { hash } = req.params;
    const { name, congratulation, author } = req.body;
    res.json(giftService.updateGift({ hash, name, congratulation, author }));
});

router.delete('/:hash', auth, (req, res) => {
    const { hash } = req.params;
    res.json(giftService.deleteGift(hash));
})

module.exports = router;