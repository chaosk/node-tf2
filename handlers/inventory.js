var TF2 = require("../index"),
	fs = require("fs"),
	util = require("util"),
	Schema = require('protobuf').Schema,
	base_gcmessages = new Schema(fs.readFileSync(__dirname + "/../generated/base_gcmessages.desc")),
	gcsdk_gcmessages = new Schema(fs.readFileSync(__dirname + "/../generated/gcsdk_gcmessages.desc")),
	tf_gcmessages = new Schema(fs.readFileSync(__dirname + "/../generated/tf_gcmessages.desc")),
	protoMask = 0x80000000;

// Methods

TF2.TF2Client.prototype.cacheSubscriptionRefresh = function() {
	if (!this._gcReady) {
		if (this.debug) util.log("GC not ready, please listen for the 'ready' event.");
		return null;
	}
	payload = gcsdk_gcmessages.CMsgSOCacheSubscriptionRefresh.serialize({
		"owner": this._client.steamID,
	});
	this._client.toGC(this._appid, TF2.ESOMsg.k_ESOMsg_CacheSubscriptionRefresh | protoMask, payload);
};

TF2.TF2Client.prototype.setItemPosition = function(item, position) {
	if (!this._gcReady) {
		if (this.debug) util.log("GC not ready, please listen for the 'ready' event.");
		return null;
	}

	if (this.debug) util.log("Setting item position.");
	var buffer = new Buffer(16);
	buffer.writeUInt64LE(item);
	buffer.writeUInt64LE(position, 8);
	this._client.toGC(this._appid, TF2.EGCItemMsg.k_EMsgGCSetItemPosition, buffer);
};

TF2.TF2Client.prototype.craftItems = function(items, recipe) {
	if (!this._gcReady) {
		if (this.debug) util.log("GC not ready, please listen for the 'ready' event.");
		return null;
	}
	var buffer = new Buffer(2 + 2 + 8 * items.length);
	buffer.writeInt16LE(recipe || -2, 0); // -2 is "Wildcard"
	buffer.writeInt16LE(items.length, 2);
	for (var i = 0; i < items.length; i++) {
		buffer.writeUInt64LE(items[i], 4 + i * 8);
	}
	this._client.toGC(this._appid, TF2.EGCItemMsg.k_EMsgGCCraft, buffer);
};

TF2.TF2Client.prototype.deleteItem = function(item) {
	if (!this._gcReady) {
		if (this.debug) util.log("GC not ready, please listen for the 'ready' event.");
		return null;
	}
	var buffer = new Buffer(8);
	buffer.writeUInt64LE(item);
	this._client.toGC(this._appid, TF2.EGCItemMsg.k_EMsgGCDelete, buffer);
};

TF2.TF2Client.prototype.nameItem = function(tool, target, name) {
	if (!this._gcReady) {
		if (this.debug) util.log("GC not ready, please listen for the 'ready' event.");
		return null;
	}
	var buffer = new Buffer(16 + name.length + 1);
	buffer.writeUInt64LE(tool);
	buffer.writeUInt64LE(target, 8);
	buffer.write(name, 16);
	this._client.toGC(this._appid, TF2.EGCItemMsg.k_EMsgGCNameItem, buffer);
};

TF2.TF2Client.prototype.nameBaseItem = function(item, defindex, name) {
	// item is the id of the tag tha will be consumed
	if (!this._gcReady) {
		if (this.debug) util.log("GC not ready, please listen for the 'ready' event.");
		return null;
	}
	var buffer = new Buffer(12 + name.length + 1);
	buffer.writeUInt64LE(item);
	buffer.writeUInt32LE(defindex, 8);
	buffer.write(name, 12);
	this._client.toGC(this._appid, TF2.EGCItemMsg.k_EMsgGCNameBaseItem, buffer);
};

TF2.TF2Client.prototype.useItem = function(item) {
	if (!this._gcReady) {
		if (this.debug) util.log("GC not ready, please listen for the 'ready' event.");
		return null;
	}
	payload = base_gcmessages.CMsgUseItem.serialize({
		"itemId": item,
	});
	this._client.toGC(this._appid, TF2.EGCItemMsg.k_EMsgGCUseItemRequest | protoMask, payload);
};

TF2.TF2Client.prototype.removeItemName = function(item) {
	if (!this._gcReady) {
		if (this.debug) util.log("GC not ready, please listen for the 'ready' event.");
		return null;
	}
	var buffer = new Buffer(8);
	buffer.writeUInt64LE(item);
	this._client.toGC(this._appid, TF2.EGCItemMsg.k_EMsgGCRemoveItemName, buffer);
};

TF2.TF2Client.prototype.giftWrapItem = function(wrap, target) {
	if (!this._gcReady) {
		if (this.debug) util.log("GC not ready, please listen for the 'ready' event.");
		return null;
	}
	var buffer = new Buffer(16);
	buffer.writeUInt64LE(wrap);
	buffer.writeUInt64LE(target, 8);
	this._client.toGC(this._appid, TF2.EGCItemMsg.k_EMsgGCGiftWrapItem, buffer);
};

TF2.TF2Client.prototype.deliverGift = function(item, target) {
	if (!this._gcReady) {
		if (this.debug) util.log("GC not ready, please listen for the 'ready' event.");
		return null;
	}
	var buffer = new Buffer(16);
	buffer.writeUInt64LE(item);
	buffer.writeUInt64LE(target, 8);
	this._client.toGC(this._appid, TF2.EGCItemMsg.k_EMsgGCDeliverGift, buffer);
};

TF2.TF2Client.prototype.unwrapGift = function(item) {
	if (!this._gcReady) {
		if (this.debug) util.log("GC not ready, please listen for the 'ready' event.");
		return null;
	}
	var buffer = new Buffer(8);
	buffer.writeUInt64LE(item);
	this._client.toGC(this._appid, TF2.EGCItemMsg.k_EMsgGCUnwrapGiftRequest, buffer);
};

TF2.TF2Client.prototype.setItemStyle = function(item, style) {
	if (!this._gcReady) {
		if (this.debug) util.log("GC not ready, please listen for the 'ready' event.");
		return null;
	}
	var buffer = new Buffer(9);
	buffer.writeUInt64LE(item);
	buffer.writeUInt8(style, 8);
	this._client.toGC(this._appid, TF2.EGCItemMsg.k_EMsgGCSetItemStyle, buffer);
};

TF2.TF2Client.prototype.sortItems = function(sortType) {
	if (!this._gcReady) {
		if (this.debug) util.log("GC not ready, please listen for the 'ready' event.");
		return null;
	}
	payload = base_gcmessages.CMsgSortItems.serialize({
		"sortType": sortType,
	});
	this._client.toGC(this._appid, TF2.EGCItemMsg.k_EMsgGCSortItems | protoMask, payload);
};

TF2.TF2Client.prototype.setItemPositions = function(itemPositions) {
	if (!this._gcReady) {
		if (this.debug) util.log("GC not ready, please listen for the 'ready' event.");
		return null;
	}

	if (this.debug) util.log("Setting item positions.");
	var payloadItemPositions = itemPositions.map(function(item){ return {"itemId": item[0], "position": item[1]}; }),
		payload = base_gcmessages.CMsgSetItemPositions.serialize({"itemPositions": payloadItemPositions});

	this._client.toGC(this._appid, TF2.EGCItemMsg.k_EMsgGCSetItemPositions | protoMask, payload);
};

// Handlers

var handlers = TF2.TF2Client.prototype._handlers;

handlers[TF2.ESOMsg.k_ESOMsg_Create] = function onItemCreate(message, callback) {
	callback = callback || null;
	var item = base_gcmessages.CSOEconItem.parse(gcsdk_gcmessages.CMsgSOSingleObject.parse(message));
	if (this.debug) util.log("Received a new item");
	if (callback) callback(item);
	emit('item', TF2.ItemEventEnum.Create, item);
};

handlers[TF2.ESOMsg.k_ESOMsg_Update] = function onItemUpdate(message, callback) {
	callback = callback || null;
	var item = base_gcmessages.CSOEconItem.parse(gcsdk_gcmessages.CMsgSOSingleObject.parse(message));
	if (this.debug) util.log("An item has been updated");
	if (callback) callback(item);
	emit('item', TF2.ItemEventEnum.Update, item);
};

handlers[TF2.ESOMsg.k_ESOMsg_Destroy] = function onItemDestroy(message, callback) {
	callback = callback || null;
	var item = base_gcmessages.CSOEconItem.parse(gcsdk_gcmessages.CMsgSOSingleObject.parse(message));
	if (this.debug) util.log("An item has been removed");
	if (callback) callback(item);
	emit('item', TF2.ItemEventEnum.Destroy, item);
};

handlers[TF2.ESOMsg.k_ESOMsg_UpdateMultiple] = function onItemUpdateMultiple(message, callback) {
	callback = callback || null;
	var items = gcsdk_gcmessages.CMsgSOMultipleObjects.parse(message);
	items = items.map(function(item){ return base_gcmessages.CSOEconItem.parse(item) });
	if (this.debug) util.log("Multiple items have been updated");
	if (callback) callback(items);
	emit('itemsUpdate', items);
};

handlers[TF2.ESOMsg.k_ESOMsg_CacheSubscriptionCheck] = function onCacheSubscriptionCheck(message, callback) {
	if (this.debug) util.log("Received cache subscription check");
	this.cacheSubscriptionRefresh();
	if (callback) callback();
};

handlers[TF2.ESOMsg.k_ESOMsg_CacheSubscribed] = function onCacheSubscribed(message, callback) {
	cacheInfo = gcsdk_gcmessages.CMsgSOCacheSubscribed.parse(message);
	cacheInfo.objects.forEach(function(cache) {
		if (cache.typeId != 1) return; // not inventory cache
		items = cache.objectData.map(function(object){ return base_gcmessages.CSOEconItem.parse(object) });
	});
	if (this.debug) util.log("Received inventory cache");
	if (callback) callback(items);
	this.emit('itemsCache', items);
};

handlers[TF2.EGCItemMsg.k_EMsgGCUpdateItemSchema] = function onUpdateItemSchema(message, callback) {
	schemaData = base_gcmessages.CMsgUpdateItemSchema.parse(message);
	if (this.debug) util.log("Received new item schema");
	if (callback) callback(schemaData);
	this.emit('schema', schemaData);
};

handlers[TF2.EGCItemMsg.k_EMsgGCCraftResponse] = function onCraftResponse(message, callback) {
	// ???
	if (this.debug) util.log("Received craft response");
	if (callback) callback();
};

handlers[TF2.EGCItemMsg.k_EMsgGCNameBaseItemResponse] = function onNameBaseItemResponse(message, callback) {
	// ???
	if (this.debug) util.log("Received name base item response");
	if (callback) callback();
};

handlers[TF2.EGCItemMsg.k_EMsgGCBackpackSortFinished] = function onBackpackSortFinished(message, callback) {
	// ???
	if (this.debug) util.log("Backpack has been sorted");
	if (callback) callback();
	this.emit('backpackSorted');
};
