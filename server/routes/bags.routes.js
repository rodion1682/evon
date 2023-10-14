const express = require('express');
const upload = require('../middlevear/upload.middleware');
const router = express.Router({ mergeParams: true });
const Bag = require('../models/Bag');

router.get('/', async (req, res) => {
	try {
		const list = await Bag.find();
		res.status(200).send(list);
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred on the server, please try again later',
		});
	}
});

router.post('/add', upload.single('image'), async (req, res) => {
	try {
		const image = req.file?.filename;
		const data = JSON.parse(req.body.data);
		if (image) {
			data.image = image;
		}
		const bag = await Bag.create(data);
		res.status(200).json(bag);
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred on the server, please try again later',
		});
	}
});

router.post('/', async (req, res) => {
	try {
		const { brand, weight, capacity, priceMin, priceMax, name } = req.body;
		const filter = {};
		if (brand.length > 0) {
			filter.brand = { $in: brand };
		}
		if (weight.length > 0) {
			filter.weight = { $in: weight };
		}
		if (capacity.length > 0) {
			filter.capacity = { $in: capacity };
		}
		if (priceMin !== '') {
			filter.price = { ...filter.price, $gte: priceMin };
		}
		if (priceMax !== '') {
			filter.price = { ...filter.price, $lte: priceMax };
		}

		if (name && name.length > 0) {
			filter.name = { $regex: name, $options: 'i' };
		}

		const list = await Bag.find(filter);
		res.status(200).json(list);
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred on the server, please try again later',
		});
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const bag = await Bag.findByIdAndRemove(id);
		res.status(200).json(bag);
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred on the server, please try again later',
		});
	}
});

router.put('/:id', upload.single('image'), async (req, res) => {
	try {
		const image = req.file?.filename;
		const { id } = req.params;
		const data = JSON.parse(req.body.data);
		if (image) {
			data.image = image;
		}
		const bag = await Bag.findByIdAndUpdate(id, data, {
			new: true,
		});
		if (!bag) {
			return res.status(404).json({ message: 'Bag not found' });
		}
		res.status(200).json(bag);
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred on the server, please try again later',
		});
	}
});

module.exports = router;
