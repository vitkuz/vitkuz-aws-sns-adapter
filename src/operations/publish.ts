import { PublishCommand, PublishCommandInput, PublishCommandOutput } from '@aws-sdk/client-sns';
import { SNSContext } from '../types';

export const publishMessage =
    (context: SNSContext) =>
    async (input: PublishCommandInput): Promise<PublishCommandOutput> => {
        const { client, logger } = context;
        logger?.debug('publishMessage:start', { data: input });
        try {
            const command = new PublishCommand(input);
            const result = await client.send(command);
            logger?.debug('publishMessage:success', { data: result });
            return result;
        } catch (error) {
            logger?.debug('publishMessage:error', { error });
            throw error;
        }
    };
