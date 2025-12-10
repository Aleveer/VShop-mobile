interface SkinShopItem extends ValorantSkin {
  price: number;
}

interface AccessoryShopItem {
  uuid: string;
  displayName: string;
  displayIcon?: string;
  price: number;
}

interface GalleryItem extends ValorantSkin {
  onWishlist: boolean;
  owned?: boolean;
}

interface NightMarketItem extends SkinShopItem {
  discountedPrice: number;
  discountPercent: number;
}

interface BundleShopItem extends ValorantBundle {
  price: number;
  items: SkinShopItem[];
}

interface Balance {
  vp: number;
  rad: number;
  fag: number;
}

interface Progress {
  level: number;
  xp: number;
}

interface UserOwnedData {
  loadout: PlayerLoadout | null;
  ownedItems: OwnedItems | null;
}

interface PlayerLoadout {
  subject: string;
  version: number;
  guns: GunLoadout[];
  sprays: SprayLoadout[];
  identity: IdentityLoadout;
  incognito: boolean;
}

interface GunLoadout {
  id: string;
  charmInstanceID: string;
  charmID: string;
  charmLevelID: string;
  skinID: string;
  skinLevelID: string;
  chromaID: string;
  attachments: unknown[];
}

interface SprayLoadout {
  equipSlotID: string;
  sprayID: string;
  sprayLevelID: string;
}

interface IdentityLoadout {
  playerCardID: string;
  playerTitleID: string;
  accountLevel: number;
  preferredLevelBorderID: string;
  hideAccountLevel: boolean;
}

interface OwnedItems {
  entitlementsByTypes: OwnedItemsByType[];
}

interface OwnedItemsByType {
  itemTypeID: string;
  entitlements: OwnedItem[];
}

interface OwnedItem {
  typeID: string;
  itemID: string;
  instanceID?: string | undefined;
}
