import { app } from '.';

const envPort: string = process.env.PORT;
const envHost: string = process.env.HOST;
console.log(envPort, envHost);
// Constants
const PORT = (!!envPort && Number.parseInt(envPort, 10)) || 3000;
const HOST = envHost || '0.0.0.0';

app.listen(PORT, HOST, () => console.log(`Server running on  http://${HOST}:${PORT}`));
