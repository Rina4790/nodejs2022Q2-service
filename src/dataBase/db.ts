import { Album } from 'src/albums/dto/create-album.dto';
import { Artist } from 'src/artists/dto/create-artist.dto';
import { FavoritesRepsonse } from 'src/favs/dto/create-favs.dto';
import { Track } from 'src/tracks/dto/create-tracks.dto';
import { User } from 'src/users/dto/create-users.dto';

class DB {
  users: User[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];

  favs: FavoritesRepsonse = {
    tracks: [],
    artists: [],
    albums: [],
  };
}

export const db = new DB();
