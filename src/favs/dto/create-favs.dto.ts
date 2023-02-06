import { Album } from 'src/albums/dto/create-album.dto';
import { Artist } from 'src/artists/dto/create-artist.dto';
import { Track } from 'src/tracks/dto/create-tracks.dto';

export class FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
