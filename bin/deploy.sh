#!/usr/bin/env bash

set -e

yarn global add serverless@3

# Request cross-account access, if required
if [ "${STAGE}" = "production" ]; then
  CRED=`aws sts assume-role --role-arn arn:aws:iam::${ACCOUNT}:role/${ROLE} --role-session-name deploy-access --duration-seconds 900`
  echo $CRED
  export AWS_ACCESS_KEY_ID=`node -pe 'JSON.parse(process.argv[1]).Credentials.AccessKeyId' "$CRED"`
  export AWS_SECRET_ACCESS_KEY=`node -pe 'JSON.parse(process.argv[1]).Credentials.SecretAccessKey' "$CRED"`
  export AWS_SESSION_TOKEN=`node -pe 'JSON.parse(process.argv[1]).Credentials.SessionToken' "$CRED"`
  export AWS_EXPIRATION=`node -pe 'JSON.parse(process.argv[1]).Credentials.Expiration' "$CRED"`
fi

export SLS_DEBUG=*

if [ $CODEBUILD_BUILD_SUCCEEDING = 1 ]; then
  serverless deploy --stage $STAGE --verbose --conceal
fi
