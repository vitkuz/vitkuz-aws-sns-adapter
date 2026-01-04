import { SNSClient, SNSClientConfig } from '@aws-sdk/client-sns';

export const createSNSClient = (config: SNSClientConfig): SNSClient => {
    return new SNSClient(config);
};
