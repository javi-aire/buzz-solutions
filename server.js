import express from 'express';
import cors from 'cors';
import axios from 'axios';

const port = 3005;

const corsOptions = {
	origin: 'http://localhost:5173',
	optionsSuccessfulStatus: 200,
};

const app = express();
app.use(cors(corsOptions));

app.get('/', async (req, res) => {
	// TODO move flickr url to constants file
	await axios.get('https://www.flickr.com/services/feeds/photos_public.gne?nojsoncallback=1&tags=&format=json')
		.then(({ data }) => {
			const { items } = data;
			res.json([...items]);
		})
	  .catch((err) => console.error(err));
});

app.get('/api/search=:searchParams', async (req, res) => {
	console.log('req:', req.params);
	await axios.get(`https://www.flickr.com/services/feeds/photos_public.gne?nojsoncallback=1&format=json&tags=muscle,gay,pecs`)
		.then(({ data }) => {
			const { items } = data;
			res.json([...items]);
		})
	  .catch((err) => console.error(err));	
})

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});