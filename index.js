var EventEmitter = require('events').EventEmitter,
	fs = require("fs"),
	util = require("util"),
	Schema = require('protobuf').Schema,
	base_gcmessages = new Schema(fs.readFileSync(__dirname + "/generated/base_gcmessages.desc")),
	gcsdk_gcmessages = new Schema(fs.readFileSync(__dirname + "/generated/gcsdk_gcmessages.desc")),
	tf_gcmessages = new Schema(fs.readFileSync(__dirname + "/generated/tf_gcmessages.desc")),
	protoMask = 0x80000000,
	TF2 = exports;

var TF2Client = function TF2Client(steamClient, debug) {
	EventEmitter.call(this);

	this.debug = debug || false;
	this._client = steamClient;
	this._appid = 440;
	this._gcReady = false;
	this._gcClientHelloIntervalId = null;

	var self = this;
	this._client.on("fromGC", function fromGC(app, type, message, callback) {
		/* Routes messages from Game Coordinator to their handlers. */
		callback = callback || null;

		var kMsg = type & ~protoMask;
		if (self.debug) util.log("TF2 fromGC: " + [app, kMsg].join(", "));

		if (kMsg in self._handlers) {
			if (callback) {
				self._handlers[kMsg].call(self, message, callback);
			}
			else {
				self._handlers[kMsg].call(self, message);
			}
		}
		else {
			self.emit("unhandled", kMsg);
		}
	});

	this._sendClientHello = function() {
		if (self.debug) util.log("Sending ClientHello");
		if (!self._client) {
			util.log("Where the fuck is _client?");
		} else {
			self._client.toGC(self._appid, (TF2.EGCBaseClientMsg.k_EMsgGCClientHello | protoMask), base_gcmessages.CMsgClientHello.serialize({}));
		}
	};
};
util.inherits(TF2Client, EventEmitter);

require("./generated/messages");

// Methods

TF2Client.prototype.launch = function() {
	if (this.debug) util.log("Launching TF2");
	this._client.gamesPlayed([this._appid]);
	this._gcClientHelloIntervalId = setInterval(this._sendClientHello, 2500);
};

TF2Client.prototype.exit = function() {
	if (this.debug) util.log("Exiting TF2");
	if (this._gcClientHelloIntervalId) {
		clearInterval(this._gcClientHelloIntervalId);
		this._gcClientHelloIntervalId = null;
	}
	this._gcReady = false;
	this._client.gamesPlayed([]);
};


// Handlers

var handlers = TF2Client.prototype._handlers = {};

handlers[TF2.EGCBaseClientMsg.k_EMsgGCClientWelcome] = function clientWelcomeHandler(message) {
	console.log(base_gcmessages.CMsgClientWelcome.parse(message));
	clearInterval(this._gcClientHelloIntervalId);
	this._gcClientHelloIntervalId = null;
	if (this.debug) util.log("Received client welcome.");
	this._gcReady = true;
	this.emit("ready");
};

TF2.TF2Client = TF2Client;

require("./handlers/inventory");