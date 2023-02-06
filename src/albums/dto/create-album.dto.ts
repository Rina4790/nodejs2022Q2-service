import { IsOptional } from 'class-validator';

export class CreateAlbumDto {
  name: string;
  year: number;
  @IsOptional()
  artistId?: string | null;
}

export class Album {
  id: string; // uuid v4
  name: string;
  year: number;
  @IsOptional()
  artistId?: string | null; // refers to Artist
}
