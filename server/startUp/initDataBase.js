const Bag = require('../models/Bag');
const bagMock = require('../mock/bag.json');

module.exports = async () => {
	const bags = await Bag.find();
	//if (bags.length !== bagMock.length) {
	//	await createInitialEntity(Bag, bagMock);
	//}
};

async function createInitialEntity(Model, data) {
	await Model.collection.drop();
	return Promise.all(
		data.map(async (item) => {
			try {
				delete item._id;
				const newItem = new Model(item);
				await newItem.save();
				return newItem;
			} catch (error) {
				return error;
			}
		})
	);
}
