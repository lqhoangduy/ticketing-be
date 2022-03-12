import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AxiosService {
  axiosTatum = async (endpoint: string, method: any) => {
    const options = {
      url: `${process.env.TATUM_API_URL}/v3/${endpoint}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.TATUM_API_KEY}`,
      },
    };

    const response = await axios(options);
    return response.data;
  };
}
