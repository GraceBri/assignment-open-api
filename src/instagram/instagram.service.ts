import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class InstagramService {
  private readonly baseUrl = 'https://instagram-scraper-api2.p.rapidapi.com';
  private readonly rapidApiKey = '97bfee352bmsh529350ac99792e5p171b11jsnee6aeb5b17f3'; // Hardcoded API Key
  private readonly rapidApiHost = 'instagram-scraper-api2.p.rapidapi.com'; // Hardcoded Host

  /**
   * Search for Instagram users based on a query string.
   * @param searchQuery The query string to search users.
   * @returns The search results from the API.
   */
  async searchUsers(searchQuery: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/v1/search_users`, {
        headers: {
          'X-Rapidapi-Key': this.rapidApiKey,
          'X-Rapidapi-Host': this.rapidApiHost,
        },
        params: { search_query: searchQuery },
      });
      return {
        status: 'success',
        message: `Yay! 🎉 We found some results for "${searchQuery}"!`,
        data: response.data,
      };
    } catch (error) {
      throw new HttpException(
        `Oopsie! 💔 Something went wrong while searching for "${searchQuery}". ${
          error.response?.data?.message || error.message
        }`,
        error.response?.status || 500,
      );
    }
  }
}
