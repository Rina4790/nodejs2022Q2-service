import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TrackEntities } from '../../tracks/entities/track.entities';
import { AlbumEntities } from '../../albums/entities/album.entities';
import { ArtistEntities } from '../../artists/entities/artist.entities';


@Entity({ name: 'favorites' })
export class FavoriteEntities {
	
	  @PrimaryGeneratedColumn('uuid')
	  id: string; // uuid v4
	
	  @OneToOne((type) => ArtistEntities, (artist) => artist.id, {
		 onDelete: 'CASCADE',
	  })
	  @JoinColumn({ name: 'artistId' })
	  artist: ArtistEntities;
	
	  @Column({ type: 'uuid', nullable: true, default: null })
	  artistId: string;
	
	  @OneToOne((type) => AlbumEntities, (album) => album.id, {
		 onDelete: 'CASCADE',
	  })
	  @JoinColumn({ name: 'albumId' })
	  album: AlbumEntities;
	
	  @Column({ type: 'uuid', nullable: true, default: null })
	  albumId: string;
	
	  @OneToOne((type) => TrackEntities, (track) => track.id, {
		 onDelete: 'CASCADE',
	  })
	  @JoinColumn({ name: 'trackId' })
	  track: TrackEntities;
	
	  @Column({ type: 'uuid', nullable: true, default: null })
	  trackId: string;
	}

