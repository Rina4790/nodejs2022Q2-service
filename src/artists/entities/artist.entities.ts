import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { 
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	Timestamp
} from 'typeorm'
import { TrackEntities } from '../../tracks/entities/track.entities'


@Entity({ name: 'artists' })
export class ArtistEntities {
	@IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  grammy: boolean;

  @OneToMany(() => TrackEntities, (track: TrackEntities) => track.artistId, {
    onDelete: 'SET NULL',
  })
  tracks: TrackEntities[];
}



