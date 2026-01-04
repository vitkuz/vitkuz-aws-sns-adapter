import {
    PublishBatchCommand,
    PublishBatchCommandInput,
    PublishBatchCommandOutput,
} from '@aws-sdk/client-sns';
import { SNSContext } from '../types';

export const publishBatch =
    (context: SNSContext) =>
    async (input: PublishBatchCommandInput): Promise<PublishBatchCommandOutput> => {
        const { client, logger } = context;
        logger?.debug('publishBatch:start', { data: input });
        try {
            const command = new PublishBatchCommand(input);
            const result = await client.send(command);
            logger?.debug('publishBatch:success', { data: result });
            return result;
        } catch (error) {
            logger?.debug('publishBatch:error', { error });
            throw error;
        }
    };
