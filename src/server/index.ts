require('dotenv').config();

import * as fastify from "fastify";
import * as fastifyHelmet from 'fastify-helmet';
import * as fastifyCompress from 'fastify-compress';
import * as fastifyUrlData from "fastify-url-data";
import * as fastifyResponseTime from "fastify-response-time";
import * as next from "next";
import { staticServe } from "fastify-auto-push";
import { readFile } from "fs";
import { promisify } from "util";
import { resolve } from "path";
import * as hyperid from "hyperid";

const fsReadFile = promisify(readFile);
const uuid = hyperid();

// Start the app
const instanceId = uuid();

const { PORT, PRIVKEY_PATH, CERT_PATH } = process.env;
// console.log(__dirname);
const NODE_PORT =  PORT || "8080";
const STATIC_DIR = resolve(__dirname, '../../out');
const CERTS_DIR = resolve(__dirname, '../../certs');

const GET = "GET";
const POST = "POST";

const readCertFile = filename => fsReadFile(resolve(CERTS_DIR, filename));
const createServerOptions = async () => {
	const [ key, cert ] = await Promise.all([
		readCertFile("key.pem"),
		readCertFile("cert.pem"),
	]);
	return {
		key,
		cert,
	};
};

const nextApp = next({ dev: true, });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
	// https = httpsCetificate
	const { key, cert } = await createServerOptions();
	const app = fastify({
		https: { key, cert },
		http2: true,
		logger: true,
	});
	// Middleware to push all static files using HTTP2
	app.register(
		staticServe, 
		{ root: STATIC_DIR, },
	);

	// app.register(fastifyGracefulShutdown).after((err) => {
	// 	app.log.error(err)

	// 	// Register custom clean up handler
	// 	app.gracefulShutdown((code, cb) => {
	// 		console.log('\nGracefully shutting down...\n');
	// 		cb();
	// 	})
	// });

	// Add important security headers via helmet.
	app.register(fastifyHelmet);

	// Add Useful info to headers
	app.register(fastifyUrlData);

	// Attach Response Time Header
	app.register(fastifyResponseTime);

	// Add compression utils (gzip, etc).
	app.register(fastifyCompress, {
		threshold: 20, // bytes; below this size will not be compressed
	});

	// Server-Side Rendered HTML file
	app.get("/", (async (req: any, reply) => {
		// reply.send()
		console.log(req.urlData().host);
		const html = await readCertFile("../out/index/index.html");
		reply
			.type("text/html")
			.send(html.toString());
	}));

	// Server-Side Rendered HTML file
	app.get("/about", (async (req, reply) => {
		// reply.send()
		const html = await readCertFile("../out/about/index.html");
		reply
			.type("text/html")
			.send(html.toString());
	}));

	// app.get("/", (req, res) => {
	// 	return nextApp.render(req.req, res.res, "/", req.query);
	// });
	console.log(`⚡ HTTP2 Server Listening on https://localhost:${PORT} ⚡`)
	await app.listen(NODE_PORT);
}).catch(err => console.log(err));
