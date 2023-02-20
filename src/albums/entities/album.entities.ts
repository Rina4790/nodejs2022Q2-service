
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsUUID } from 'class-validator';
// import { Track } from '../../tracks/Entities/track.entitie';

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
//   @OneToMany(() => Track, (track: Track) => track.albumId, {
//     onDelete: 'SET NULL',
//   })
//   tracks: Track[];
}