import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { InstagramService } from './instagram.service';

@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  /**
   * Endpoint to search for Instagram users based on a query string.
   * @param query The query string to search users.
   * @returns The search results.
   */
  @Get('search-users')
  async searchUsers(@Query('query') query: string) {
    if (!query) {
      throw new BadRequestException('Query parameter is required');
    }
    return await this.instagramService.searchUsers(query);
  }

}

