import getDbConnection from "../../database";
import { Request } from "../../database/entity/Request";

export default async (req, reply) => {
	const request = new Request();
	request.headers = req.headers
	const conn = await getDbConnection();
	await conn.manager.save(request);
	await conn.close();
	reply.type("text/html").code(200);
	return "<p>This is a HTTP2 Server.</p>"
};