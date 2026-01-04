import { SNSClientConfig } from '@aws-sdk/client-sns';
import { createSNSClient } from './client';
import { Logger } from './types';
import { publishMessage } from './operations/publish';
import { publishBatch } from './operations/publish-batch';
import { publishAll } from './operations/publish-all';

export const createAdapter = (config: SNSClientConfig, logger?: Logger) => {
    const client = createSNSClient(config);
    const context = { client, logger };

    return {
        client,
        publishMessage: publishMessage(context),
        publishBatch: publishBatch(context),
        publishAll: publishAll(context),
    };
};
