const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');
const initDataBase = require('./startUp/initDataBase');
const routes = require('./routes');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'static', 'media')));
app.use('/api', routes);

const PORT = config.get('port') ?? 8080;

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client')));
	const indexPath = path.join(__dirname, 'client', 'index.html');
	app.get('*', (req, res) => {
		res.sendFile(indexPath);
	});
}

async function start() {
	try {
		mongoose.connection.once('open', () => {
			initDataBase();
		});
		await mongoose.connect(config.get('mongoUri'), {});
		app.listen(PORT, () =>
			console.log(chalk.green(`Server started on port ${PORT}`))
		);
	} catch (error) {
		console.log(chalk.red(error.message));
		process.exit(1);
	}
}

start();
