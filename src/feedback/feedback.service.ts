import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackEntity } from 'src/database/entities/feedback.entity';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { CreateFeedbackDTO } from './dtos/create-feedback.dto';
import { Feedback } from './interfaces/feedback.interface';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedbackEntity)
    private readonly feedbackRepository: Repository<FeedbackEntity>,
  ) {}

  async postFeedback(createFeedbackDTO: CreateFeedbackDTO) {
    const { name, email, message } = createFeedbackDTO;

    const userAlreadyPosted = await this.findByEmail(email);

    if (userAlreadyPosted) {
      throw new HttpException(
        'You have already posted a feedback',
        HttpStatus.FORBIDDEN,
      );
    }

    const feedback: Feedback = {
      id: uuidV4(),
      name,
      email,
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.feedbackRepository.save(feedback);
  }

  async getFeedbacks() {
    return this.feedbackRepository.find();
  }

  private async findByEmail(email: string) {
    return await this.feedbackRepository.findOne({
      where: {
        email,
      },
    });
  }
}
