import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateFeedbackDTO } from './dtos/create-feedback.dto';
import { FeedbackService } from './feedback.service';

@Controller('api/v1/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async postFeedback(@Body() { name, email, message }: CreateFeedbackDTO) {
    return this.feedbackService.postFeedback({ name, email, message });
  }

  @Get()
  async getFeedbacks() {
    return this.feedbackService.getFeedbacks();
  }
}
