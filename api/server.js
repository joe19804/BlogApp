import app from './app.js'

const port = 5000;

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
});