import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(express.json());
// app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.post('/login', (req, res) => {
	console.log('111' + req)
	res.send('success')
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})