var TF2 = require("../index");

TF2.EGCItemMsg = {
	k_EMsgGCSetItemPosition: 1001,
	k_EMsgGCCraft: 1002,
	k_EMsgGCCraftResponse: 1003,
	k_EMsgGCDelete: 1004,
	k_EMsgGCVerifyCacheSubscription: 1005,
	k_EMsgGCNameItem: 1006,
	k_EMsgGCGoldenWrenchBroadcast: 1011,
	k_EMsgGCNameBaseItem: 1019,
	k_EMsgGCNameBaseItemResponse: 1020,
	k_EMsgGCUseItemRequest: 1025,
	k_EMsgGCUseItemResponse: 1026,
	k_EMsgGCRemoveItemName: 1030,
	k_EMsgGCRemoveItemPaint: 1031,
	k_EMsgGCGiftWrapItem: 1032,
	k_EMsgGCGiftWrapItemResponse: 1033,
	k_EMsgGCDeliverGift: 1034,
	k_EMsgGCUnwrapGiftRequest: 1037,
	k_EMsgGCUnwrapGiftResponse: 1038,
	k_EMsgGCSetItemStyle: 1039,
	k_EMsgGCSortItems: 1041,
	k_EMsgGCUpdateItemSchema: 1049,
	k_EMsgGCRequestInventoryRefresh: 1050,
	k_EMsgGCBackpackSortFinished: 1058,
	k_EMsgGCTFSpecificItemBroadcast: 1096,
	k_EMsgGCSetItemPositions: 1100,
};

TF2.ESOMsg = {
	k_ESOMsg_Create: 21,
	k_ESOMsg_Update: 22,
	k_ESOMsg_Destroy: 23,
	k_ESOMsg_CacheSubscribed: 24,
	k_ESOMsg_CacheUnsubscribed: 25,
	k_ESOMsg_UpdateMultiple: 26,
	k_ESOMsg_CacheSubscriptionCheck: 27,
	k_ESOMsg_CacheSubscriptionRefresh: 28,
	k_ESOMsg_CacheSubscribedUpToDate: 29,
};

TF2.EGCBaseClientMsg = {
	k_EMsgGCClientWelcome: 4004,
	k_EMsgGCServerWelcome: 4005,
	k_EMsgGCClientHello: 4006,
	k_EMsgGCServerHello: 4007,
	k_EMsgGCClientGoodbye: 4008,
	k_EMsgGCServerGoodbye: 4009
};

TF2.ItemEventEnum = {
	Create: 1,
	Destroy: 2,
	Update: 3,
}