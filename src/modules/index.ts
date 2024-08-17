import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { CryptoModule } from './crypto/crypto.module';

export const getAllModules = () => {
  return [
    AuthModule,
    UsersModule,
    ListsModule,
    CardsModule,
    CommentsModule,
    CryptoModule,
  ];
};
