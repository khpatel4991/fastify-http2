import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Request {
	@PrimaryGeneratedColumn("uuid")
	id: number

	@Column("jsonb")
	headers: any
}