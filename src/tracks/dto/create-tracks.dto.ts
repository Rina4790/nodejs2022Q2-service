import { IsOptional } from 'class-validator';

export class CreateTrackDto {
  name: string;
  duration: number;
  @IsOptional()
  artistId?: string | null; // refers to Artist
  albumId?: string | null; // refers to Album
}

export class Track {
  id: string; // uuid v4
  name: string;
  duration: number; // integer number
  @IsOptional()
  artistId?: string | null; // refers to Artist
  albumId?: string | null; // refers to Album
}
