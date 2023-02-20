import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { 
	Column,
	Entity,
	PrimaryGeneratedColumn,
	Timestamp
} from 'typeorm'
// import { Track } from '../../tracks/Entities/track.entitie';

@Entity({ name: 'artists' })
export class ArtistEntities {
	@IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  grammy: boolean;

//   @OneToMany(() => Track, (track: Track) => track.artistId, {
//     onDelete: 'SET NULL',
//   })
//   tracks: Track[];
}



