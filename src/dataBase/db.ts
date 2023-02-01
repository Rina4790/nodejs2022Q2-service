import { Album } from "src/albums/dto/create-album.dto";
import { Artist } from "src/artists/dto/create-artist.dto";
import { User } from "src/users/dto/create-users.dto";

class DB {
	users: User[] = [];
	artists: Artist[] = [];
	albums: Album[] = [];
 }
 
 export const db = new DB();