import { PublishBatchCommandOutput, PublishBatchRequestEntry } from '@aws-sdk/client-sns';
import { SNSContext } from '../types';
import { publishBatch } from './publish-batch';
import { chunk } from '../utils';

export interface PublishAllInput {
    TopicArn: string;
    PublishBatchRequestEntries: PublishBatchRequestEntry[];
}

export const publishAll =
    (context: SNSContext) =>
    async (input: PublishAllInput): Promise<PublishBatchCommandOutput[]> => {
        const { logger } = context;
        const { TopicArn, PublishBatchRequestEntries } = input;
        logger?.debug('publishAll:start', {
            data: { TopicArn, count: PublishBatchRequestEntries.length },
        });

        const chunks = chunk(PublishBatchRequestEntries, 10);
        const results: PublishBatchCommandOutput[] = [];

        const publishBatchOp = publishBatch(context);

        try {
            for (const batchEntries of chunks) {
                const result = await publishBatchOp({
                    TopicArn,
                    PublishBatchRequestEntries: batchEntries,
                });
                results.push(result);
            }
            logger?.debug('publishAll:success', { data: { chunksProcessed: results.length } });
            return results;
        } catch (error) {
            logger?.debug('publishAll:error', { error });
            throw error;
        }
    };
