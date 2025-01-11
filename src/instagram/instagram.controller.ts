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
      throw new BadRequestException(
        `Oh no! 😿 It seems like you forgot to include a query. Please try again!`
      );
    }
    const results = await this.instagramService.searchUsers(query);
    return {
      ...results,
      note: 'Thanks for using our Instagram search! 💖',
    };
  }

  /**
   * Endpoint to fetch the following list for a user.
   * @param identifier The username, user ID, or profile URL of the user.
   * @returns The following list.
   */
  @Get('following')
  async getUserFollowing(@Query('identifier') identifier: string) {
    if (!identifier) {
      throw new BadRequestException(
        `Oops! 🙀 Please provide a username, ID, or profile URL to get the following list.`
      );
    }
    const results = await this.instagramService.getUserFollowing(identifier);
    return {
      ...results,
      note: 'Hope you enjoy exploring! 💕',
    };
  }
}
