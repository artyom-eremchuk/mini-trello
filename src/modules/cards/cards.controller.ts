import { Controller } from '@nestjs/common';
import { CardsService } from './cards.service';

@Controller()
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}
}
