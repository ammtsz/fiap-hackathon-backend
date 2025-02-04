import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IaService {
  async generate(text: string): Promise<string> {
    const startTime = Date.now();
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3',
      prompt: text,
      stream: false,
    });
    const endTime = Date.now();
    const responseData = response.data.response.toString();
    console.log(`Response time: ${endTime - startTime} ms`);
    return responseData;
  }
}