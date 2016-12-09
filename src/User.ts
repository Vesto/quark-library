import { Image } from "./types/Image";
import { UUID } from "./types/UUID";

export class User {
    public readonly profileImage: Image;
    public readonly username: string;
    public readonly userID: UUID;

}
