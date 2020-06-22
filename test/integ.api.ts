import { GitlabContainerRunner } from '../lib/index';
import { App, Stack, CfnOutput } from '@aws-cdk/core';
import { InstanceType, InstanceClass, InstanceSize, Port, Peer } from '@aws-cdk/aws-ec2';
import { ManagedPolicy } from '@aws-cdk/aws-iam';

const mockApp = new App();
const stack = new Stack(mockApp, 'testing-stack');

const runner = new GitlabContainerRunner(stack, 'testing', { gitlabtoken: 'vKb9m8UiyxXUsss83KPo', ec2type: InstanceType.of(InstanceClass.T3, InstanceSize.SMALL) });
runner.runnerRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess'));
runner.runnerEc2.connections.allowFrom(Peer.ipv4('0.0.0.0/0'), Port.tcp(80));
new CfnOutput(stack, 'role', { value: runner.runnerRole.roleArn })
new CfnOutput(stack, 'InstanceID', { value: runner.runnerEc2.instanceId })