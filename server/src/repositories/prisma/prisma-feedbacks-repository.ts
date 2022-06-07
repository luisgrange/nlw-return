import { prisma } from '../../prisma';
import { FeedbackCreateData, FeedbacksRepository } from '../feedbacks-repository';

export class PrismaFeedbackRepository  implements FeedbacksRepository{
    async create(data: FeedbackCreateData){
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot,
            }
        })
    }
}