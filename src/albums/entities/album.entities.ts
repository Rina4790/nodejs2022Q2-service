
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsUUID } from 'class-validator';
import { TrackEntities } from '../../tracks/entities/track.entities'

@Entity({ name: 'albums' })
export class AlbumEntities {
 
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  
  @Column({ nullable: true })
  name: string;

 
  @Column({ nullable: true })
  year: number;

  
  @Column({ nullable: true })
  artistId?: string;
  @OneToMany(() => TrackEntities, (track: TrackEntities) => track.albumId, {
    onDelete: 'SET NULL',
  })
  tracks: TrackEntities[];
}