const { Schema, model } = require('mongoose');

const schema = new Schema(
	{
		//_id: { type: String, required: true },
		name: { type: String, required: true },
		brand: { type: String, required: true },
		capacity: { type: String, required: true },
		weight: { type: String, required: true },
		image: { type: String, required: true },
		price: { type: Number, required: true },
	},
	{ timestamps: true }
);

module.exports = model('Bag', schema);
