#!/bin/bash

SCRIPT_PATH="$( cd "$(dirname "$0")" ; pwd -P )"
PROTO_PATH="$SCRIPT_PATH/SteamKit/Resources/Protobufs/tf"

git clone https://github.com/SteamRE/SteamKit.git

for FILENAME in base_gcmessages gcsdk_gcmessages tf_gcmessages
do
	protoc --descriptor_set_out=$FILENAME.desc --include_imports --proto_path=$PROTO_PATH $PROTO_PATH/$FILENAME.proto
done

rm -rf SteamKit
