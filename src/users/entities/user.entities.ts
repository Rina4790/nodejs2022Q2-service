import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { 
	Column,
	Entity,
	PrimaryGeneratedColumn,
	Timestamp
} from 'typeorm'

@Entity( { name: 'users' } )
export class UserEntities {
	@IsUUID()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ nullable: true })
	login: string

	@Column()
	@Exclude()
	password: string;
 
	@Column({ default: 1 })
	version: number;
 
	@Column({ default: Math.floor(Date.now() / 1000) })
	createdAt: number;
 
	@Column({ default: Math.floor(Date.now() / 1000) })
	updatedAt: number;

	toResponse() {
		const { id, login, version, createdAt, updatedAt } = this;
		return { id, login, version, createdAt: +createdAt, updatedAt: +updatedAt };
	 }
 
}